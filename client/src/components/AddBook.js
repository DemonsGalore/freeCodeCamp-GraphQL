import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';

import { GET_AUTHORS_QUERY, ADD_BOOK_MUTATION } from '../queries/queries';

const AddBook = props => {
  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  let authorsContent = <Query query={GET_AUTHORS_QUERY}>
    {
      ({ loading, error, data }) => {
        if (loading) return <option disabled>Loading authors...</option>;
        if (error) console.log(error);
        return data.authors.map(author => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ));
      }
    }
  </Query>;

  return (
    <Mutation mutation={ADD_BOOK_MUTATION}>
      {
        addBook => (
          <form
            id="add_book"
            noValidate
            onSubmit={e => {
              e.preventDefault();
              addBook({
                variables: { authorId, name: bookName, genre },
                refetchQueries:['BooksQuery']
              });
            }}
          >
            <div className="input-group">
              <label htmlFor="book_name">Book name:</label>
              <input
                type="text"
                id="book_name"
                value={bookName}
                onChange={e => setBookName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="genre">Genre:</label>
              <input
                type="text"
                id="genre"
                value={genre}
                onChange={e => setGenre(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="author">Author:</label>
              <select id="author" onChange={e => setAuthorId(e.target.value)}>
                <option>Select author</option>
                {authorsContent}
              </select>
            </div>
            <button type="submit"><i className="fas fa-plus fa-2x"></i></button>
          </form>
        )
      }
    </Mutation>
  );
};

export default AddBook;
