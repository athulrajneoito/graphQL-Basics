import { gql } from "apollo-server";


export const typeDefs = gql`

    type Book{
        id:ID!
        name:String!
        genre:String
        authorId:String!
        author:Author
    }

    type Author{
        id:ID!
        name:String!
        age:String
        books:[Book]
    }
    type Query{
        books:[Book]
        authors:[Author]
    }
    type Mutation {
        addBook(
            name:String,
            genre:String,
            authorId:ID
        ):Book
    }
`;
