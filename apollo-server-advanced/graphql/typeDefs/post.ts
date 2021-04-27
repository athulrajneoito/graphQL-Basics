import { gql } from "apollo-server";


export const post = gql`

    type Post{
        title:String!,
        content:String!,
        featuredImage:String
    }
    input  NewPost{
        title:String!,
        content:String!,
        featuredImage:String
    },
    extend type Query{
        getAllPosts:[Post] 
    },
    extend type Mutation {
        createNewPost(newPost:NewPost):Post
    }

`;
