import { gql } from "apollo-server";


export const post = gql`
    directive @isAuth on FIELD_DEFINITION
    type Post{
        id:ID
        title:String!,
        content:String!,
        featuredImage:String
    }
    type DeleteResponse{
        id:ID!,
        message:String
    }
    input  NewPost{
        title:String!,
        content:String!,
        featuredImage:String
    }
    input  EditPost{
        title:String,
        content:String,
        featuredImage:String
    }
    extend type Query{
        getAllPosts:[Post] 
        getPostId(id:ID!):Post!
    }
    extend type Mutation {
        createNewPost(newPost:NewPost):Post @isAuth,
        editPost(editPost:EditPost,id:ID!):Post @isAuth,
        deletePost(id:ID!):DeleteResponse! @isAuth,
    }

`;
