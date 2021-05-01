import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    featuredImage: String,
    author:{
        ref:'User',
        type:Schema.Types.ObjectId
    }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);


