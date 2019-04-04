import { gql } from 'apollo-boost';

export const GET_AUTHORS_QUERY = gql`
  query AuthorsQuery {
    authors {
      id
      name
    }
  }
`;

export const GET_BOOK_QUERY = gql`
  query BookQuery($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`;

export const GET_BOOKS_QUERY = gql`
  query BooksQuery {
    books {
      id
      name
      genre
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation AddBook($authorId: ID!, $genre: String!, $name: String!) {
    addBook(authorId: $authorId, genre: $genre, name: $name) {
      id
      name
    }
  }
`;
