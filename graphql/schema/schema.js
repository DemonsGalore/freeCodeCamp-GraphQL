const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const Book = require('../../models/Book');
const Author = require('../../models/Author');

// dummy data
// const books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'The Martian', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '4', authorId: '3' },
//   { name: 'The Final Empire', genre: 'Fantasy', id: '5', authorId: '2' },
//   { name: 'The Martian', genre: 'Sci-Fi', id: '6', authorId: '3' },
// ];
//
// const authors = [
//   { name: 'Stephen King', age: 68, id: '1' },
//   { name: 'George Orwell', age: 79, id: '2' },
//   { name: 'Andy Weir', age: 43, id: '3' },
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return authors.find(author => author.id === parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books.filter(book => book.authorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // return books.find(book => book.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // return authors.find(author => author.id === args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      }
    },
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parents, args) {
        const { name, age } = args;
        let newAuthor = new Author({
          name,
          age,
        });
        console.log(newAuthor);

        return newAuthor.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parents, args) {
        console.log("args", args);
        const { name, genre, authorId } = args;
        let newBook = new Book({
          name,
          genre,
          authorId,
        });
        console.log("newBook", newBook);

        return newBook.save();
      }
    }

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
