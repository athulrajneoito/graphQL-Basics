import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectTypeConfig } from 'graphql';
import { author, book } from '../interfaces/interface';
import Book from "../models/book";
import Author from '../models/author'
import mongoose from 'mongoose';

const BookType: GraphQLObjectType  = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
        author: {
            type: AuthorType,
            resolve(parent) {
              return Author.findById(parent.authorId);
            }
        }
    })
});


const AuthorType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent) {
                return Book.find({authorId: mongoose.Types.ObjectId(parent.id)})
            }
        }
    })
});

const RootQuery:GraphQLObjectType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                return Book.find({});
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return Book.findById(args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                // return authors;
                return Author.find({});
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return Author.findById(args.id)
            }
        }
    }
});

const Mutation:GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            async resolve(_parent, args) {
                const { name, age } = args;
                let author = new Author({
                    name, age
                });
                const newAuthor = await author.save();
                return newAuthor;

            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },

            },
            async resolve(_parent, args) {
                const { name, genre, authorId } = args;
                let book = new Book({
                    name, genre, authorId
                });
                const newBook = await book.save();
                return newBook;

            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});