import { ApolloError } from "apollo-server-errors";
import { hash, compare } from 'bcrypt';
import { createToken } from "../../helpers/jwt";
import { loginValidation, signupValidation } from "../../validators";


export const user = {
    Query: {
        /**
         * Get user by ID posts
         * @param _parent 
         * @param param1 Id of the user 
         * @param param2 Context containing Mongoose models and middleware result
         * @returns requested user
         * @author athulraj2002
         */
        getUserById: async (_parent: any, { id }: any, { User }: any): Promise<any> => await User.findById(id),

        /**
         * 
         * @param _parent 
         * @param param1 login User data containing username and password
         * @param param2 Context containing Mongoose models and middleware result
         * @returns user and token
         * @author athulraj2002
         */
        loginUser: async (_parent: any, { loginUser }: any, { User }: any) => {
            const { username, password } = loginUser;
            await loginValidation.validate({ username, password }, { abortEarly: false });
            try {
                let user;
                user = await User.findOne({ username });
                if (!user) throw new ApolloError('Username didnt exist');
                const isValid = await compare(password, user.password);
                if (isValid) {
                    user.password = undefined;
                    const token = await createToken(user.toObject())
                    return { user, token };
                }
                throw new ApolloError('Incorrect Password')
            } catch (error) {
                throw new Error(error)
            }

        }
    },
    Mutation: {
        /**
         * 
         * @param _parent 
         * @param param1 new user data
         * @param param2 Context containing Mongoose models and middleware result
         * @returns newly ceated user
         * @author athulraj2002
         */
        registerUser: async (_parent: any, { newUser }: any, { User }: any): Promise<any> => {
            const { username, email } = newUser;
            await signupValidation.validate(newUser, { abortEarly: false });
            try {
                let user
                user = await User.findOne({ username });
                if (user) throw new ApolloError('Username already Exist');
                user = await User.findOne({ email });
                if (user) throw new ApolloError('Email already Exist');
                user = new User(newUser);
                user.password = await hash(newUser.password, 10);
                const result = await user.save();
                return {
                    user: result,
                    message: 'User Created Successfully'
                }
            } catch (error) {
                throw new Error(error)
            }
        },

    }
}