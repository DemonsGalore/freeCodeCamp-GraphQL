import React, { useState, Fragment } from 'react';
import { Query } from 'react-apollo';

import BookDetails from './BookDetails';

import { GET_BOOKS_QUERY } from '../queries/queries';

const BookList = props => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <Fragment>
      <h1>BookList</h1>
      <Query query={GET_BOOKS_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            return <ul id="book_list">
              {
                data.books.map(book => (
                  <li key={book.id} onClick={e => setSelectedBook(book.id)}>{book.name}</li>
                ))
              }
            </ul>;
          }
        }
      </Query>
      <BookDetails bookId={selectedBook}/>
    </Fragment>
  );
};

export default BookList;
