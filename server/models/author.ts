import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: {
        type: Number,
        default: 0
    }
},{ timestamps: true });

export default mongoose.model('Author', authorSchema);


