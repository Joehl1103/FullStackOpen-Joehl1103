import { gql } from '@apollo/client'

export const GET_ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author
      genres
    }
  }
`

export const GET_ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!,
    $published: Int!,
    $author: String!,
    $genres: [String!]
    ){
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
      ){
        title
        published
        author
        genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor(
    $name: String!
    $setBornTo: Int!
    ){
      editAuthor(
        name: $name
        setBornTo: $setBornTo
      ){
        name
        born
      }
    }
      
`
