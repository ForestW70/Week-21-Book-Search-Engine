const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [bookSchema]
    }

    type Book {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(
            username: String!
            email: String!
            password: String!
        ): Auth
        login(
            email: String!
            password: String!
        ): Auth
        saveBook(
            book: BookId!
        ): User
        removeBook(
            book: BookId!
        ): User
    }
  
`;

module.exports = typeDefs;
