import mongoose, { SchemaType } from 'mongoose';


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: {
        type:String,
        required:true,
        unique:true,
        truncate:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profileImage: {
        type:String,
        default:'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);


