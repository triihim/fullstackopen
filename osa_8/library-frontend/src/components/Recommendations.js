import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommendations = (props) => {
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);
  
  const [getBooks] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.books)
    },
    fetchPolicy: "no-cache"
  });

  const [getUser] = useLazyQuery(ME, {
    onCompleted: (data) => {
      const favoriteGenre = data.me.favoriteGenre;
      setGenre(favoriteGenre);
      getBooks({ variables: { genre: favoriteGenre }});
    }
  });

  useEffect(() => {
    if(props.show) {
      getUser();
    }
  }, [getUser, props.show]);

  useEffect(() => {
    if(props.show) {
      getBooks({ variables: { genre: genre }});
    }
  }, [getBooks, props.show, genre])

  if(!props.show) return null;

  return (
    <div>
      <h2>recommendations</h2>
      <p>for your favorite genre of <strong>{genre || "..."}</strong></p>
      {books.map(b => <p key={b.id}>{b.title}</p>)}
    </div>
  );
};

export default Recommendations