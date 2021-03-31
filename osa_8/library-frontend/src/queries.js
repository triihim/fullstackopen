import { gql } from "@apollo/client";

export const NEW_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) { title, author {name} }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    authors: allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query getAllBooks($genre: String, $author: String) {
    books: allBooks(genre: $genre, author: $author) {
      title
      published
      id
      author { 
        name 
      }
    }
  }
`;

export const SET_AUTHOR_BIRTHYEAR = gql`
  mutation setAuthorBirthyear($name: String!, $birthyear: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $birthyear
    ) { name, born }
  }
`;

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) { token: value }
  }
`;

export const ALL_GENRES = gql`
  query {
    genres: allGenres
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;