import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';

import './App.css';


// apollo client initialization
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <main>
            <h1>HELLO</h1>
            <BookList />
          </main>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
