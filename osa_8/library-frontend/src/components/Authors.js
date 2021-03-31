import React from 'react'
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR } from "../queries";

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS);
  const [ updateAuthorBirthyear ] = useMutation(SET_AUTHOR_BIRTHYEAR, { refetchQueries: [ { query: ALL_AUTHORS } ] });

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <p>Loading ...</p>
  }

  const authors = result.data.authors;

  const handleBirthyearSubmit = e => {
    e.preventDefault();
    updateAuthorBirthyear({ 
      variables: {
        name: e.target.name.value,
        birthyear: +e.target.birthyear.value
      }
    })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleBirthyearSubmit}>
        <div>
          Name:
          <select name="name">
            {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          Born: <input name="birthyear" type="number" />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default Authors