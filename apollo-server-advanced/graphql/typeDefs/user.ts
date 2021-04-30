import { gql } from "apollo-server";

export const user = gql`


  type User {
    id:ID!
    name: String
    username: String!
    email: String!
    profileImage: String
  }

  input UserInput {
    name: String
    username: String!
    password: String!
    email: String!
    profileImage: String
  }

  type AuthResponse {
    user:User
    message: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  type LoginResponse{
    user:User!,
    token:String! 
  }

  extend type Query {
    getUserById(id: ID!): User!
    loginUser(loginUser:LoginInput):LoginResponse!
  }
  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResponse!
  }
`;
