import React, { Fragment } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';

const GET_BOOKS_QUERY = gql`
  query BooksQuery {
    books {
      id
      name
      genre
    }
  }
`;

const BookList = props => {
  return (
    <Fragment>
      <h1>BookList</h1>
      <Query query={GET_BOOKS_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            return <Fragment>
              <ul>
                {
                  data.books.map(book => (
                    <li key={book.id}>{book.name}</li>
                  ))
                }
              </ul>
            </Fragment>;
          }
        }
      </Query>
    </Fragment>
  );
};

export default BookList;
// export default graphql(GET_BOOKS_QUERY)(BookList);
