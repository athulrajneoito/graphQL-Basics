import { ApolloError } from "apollo-server-errors";
import { hash,compare } from 'bcrypt';
import { createToken } from "../../helpers/jwt";

export const user = {
    Query: {
        getUserById: async (_parent: any, { id }: any, { User }: any): Promise<any> => await User.findById(id),
        loginUser:async (_parent:any , {loginUser}:any , {User}:any)=>{
            try {
                const { username, password } = loginUser;
                let user
                user = await User.findOne({username});
                if (!user) throw new Error('Username didnt exist');
                const isValid = await compare(password,user.password);
                if(isValid) {
                    user.password=undefined;
                    const token = await createToken(user.toObject())
                    return {user,token};
                }
                throw new ApolloError('Incorrect Password')
            } catch (error) {
                throw new ApolloError(error.message)
            }

        }
    },
    Mutation: {
        registerUser: async (_parent: any, { newUser }: any, { User }: any): Promise<any> => {
            try {
                const { username, email } = newUser;
                let user
                user = await User.findOne({username});
                if (user) throw new Error('Username already Exist');
                user = await User.findOne({email});
                if (user) throw new Error('Email already Exist');
                user = new User(newUser);
                user.password = await hash(newUser.password, 10);
                const result = await user.save();
                return {
                    user:result,
                    message:'User Created Successfully'
                }
                
     
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },

    }
}