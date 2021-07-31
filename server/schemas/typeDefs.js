const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooksAmount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(
            username: String
            email: String
            password: String
        ): Auth
        login(
            email: String
            password: String
        ): Auth
        saveBook(
            book: BookInput
        ): User
        removeBook(
            bookId: String
        ): User
    }
  
    input BookInput {
        bookId: ID
        authors: [String]
        title: String
        description: String
        image: String
        link: String
      }
    
`;



module.exports = typeDefs;
