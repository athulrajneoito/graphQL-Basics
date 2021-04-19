import { gql, useMutation } from "@apollo/client";

const GET_AUTHOR = gql`
  {
    authors {
      id
      name
    }
  }
`;


const GET_BOOKS = gql`
  {
    books {
      id
      name
    }
  }
`;
const CREATE_BOOK = gql`
  mutation addBook($name: String!, $genre: String! , $authorId:ID!) {
    addBook(name: $name, genre: $genre,  authorId:$authorId) {
      name , genre , authorId
    }
  }
`;

export {GET_AUTHOR , GET_BOOKS,CREATE_BOOK};