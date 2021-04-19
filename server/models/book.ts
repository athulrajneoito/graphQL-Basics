import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name:String,
    genre:String,
    authorId:String
},{ timestamps: true });

export default mongoose.model('Book',bookSchema);


