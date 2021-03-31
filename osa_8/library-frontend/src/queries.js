import { gql } from "@apollo/client";

export const NEW_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) { title, author }
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
  query {
    books: allBooks {
      title,
      published,
      author
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