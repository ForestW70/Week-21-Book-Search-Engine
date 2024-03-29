import { gql } from '@apollo/client'

export const QUERY_ME = gql`
    query me {
        me {
            username
            savedBooksAmount
            savedBooks {
                bookId
                image
                authors
                title
                description
            }
        }
    }
`;