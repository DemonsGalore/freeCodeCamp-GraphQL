import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import { GET_BOOKS_QUERY } from '../queries/queries';

const BookList = props => {

  return (
    <Fragment>
      <h1>BookList</h1>
      <Query query={GET_BOOKS_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            return <ul>
              {
                data.books.map(book => (
                  <li key={book.id}>{book.name}</li>
                ))
              }
            </ul>;
          }
        }
      </Query>
    </Fragment>
  );
};

export default BookList;
