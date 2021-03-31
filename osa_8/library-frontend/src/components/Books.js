import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = (props) => {
  const [filterGenre, setFilterGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS, {
    variables: {genre: filterGenre.length ? filterGenre : null},
    fetchPolicy: "no-cache"
  });

  const genresResult = useQuery(ALL_GENRES, {
    onCompleted: (data) => {
      setGenres(genres.concat(data.genres));
    }
  });

  useEffect(() => {
    getBooks();
  }, [filterGenre, props.show])

  if (!props.show) {
    return null
  }

  const books = (booksResult.data && booksResult.data.books) || [];

  return (
    <div>
      <h2>books</h2>
      <div style={{ display: booksResult.loading ? "none" : "block" }}>
        <p>in genre <strong>{filterGenre.length ? filterGenre : "all genres"}</strong></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ display: genresResult.loading ? "none" : "block"}}>
          {genres.map(g => <button onClick={() => setFilterGenre(g)} key={g}>{g}</button>)}
          <button onClick={() => setFilterGenre("")}>all genres</button>
        </div>
      </div>
    </div>
  )
}

export default Books