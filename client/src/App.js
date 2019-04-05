import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

import './App.css';

// apollo client initialization
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const App = props => {
  return (
    <ApolloProvider client={client}>
      <main>
        <BookList />
        <AddBook />
      </main>
    </ApolloProvider>
  );
}

export default App;
