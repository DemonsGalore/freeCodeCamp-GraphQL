import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import { GET_BOOK_QUERY } from '../queries/queries';

const BookDetails = props => {
  const { bookId } = props;
  return(
    <Fragment>
      { bookId !== null ? (
        <div id="book-details">
          <Query query={GET_BOOK_QUERY} variables={{ id: bookId }}>
            {
              ({ loading, error, data }) => {
                if (loading) return <h4>Loading...</h4>;
                if (error) console.log(error);
                const { name, genre, author } = data.book;

                return (
                  <div>
                    <p>{name}</p>
                    <p>{genre}</p>
                    <p>{author.name}</p>
                    <p>All books by this Autor:</p>
                    <ul>
                      { author.books.map(book => {
                        return <li key={book.id}>{book.name}</li>;
                      })}
                    </ul>
                  </div>
                );
              }
            }
          </Query>
        </div>
      ) : (
        <div id="book-details">
          <p>No book selected...</p>
        </div>
      )}
    </Fragment>
  );
};

export default BookDetails;
