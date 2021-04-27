
import Book from "../../models/book";
import Author from '../../models/author';
import mongoose from 'mongoose';


export const resolvers = {
    Query: {
        books: () => {
            return Book.find({});
        },
        authors: () => {
            return Author.find({});
        }
    },
    Book: {
        author(parent: any) {
            return Author.findById(parent.authorId);
        }
    },
    Author:{
        books(parent:any){
            return Book.find({authorId: mongoose.Types.ObjectId(parent.id)})
        }
    },
    Mutation:{
        addBook:async(_parent:any,args:any)=>{
            const { name, genre, authorId } = args;
            let book = new Book({
                name, genre, authorId
            });
            const newBook = await book.save();
            return newBook;
        },
        changeName:async (_parent:any ,args:any)=>{


            console.log(args);
            const {id,name} = args;
            await Book.findByIdAndUpdate({_id:mongoose.Types.ObjectId(id)} , name);

        }       
    }
}