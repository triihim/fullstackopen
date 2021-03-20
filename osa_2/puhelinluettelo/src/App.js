import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({value, handleChange}) => {
  return (
    <div>
      filter: <input value={value} onChange={handleChange} />
    </div>
  );
}

const PersonForm = (props) => {
  const name = props.name;
  const number = props.number;
  const handleNameChange = props.handleNameChange;
  const handleNumberChange = props.handleNumberChange;
  const handleSubmit = props.handleSubmit;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(p => <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  );
}

const App = () => {
  const [ persons, setPersons] = useState([]) ;

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(res => setPersons(persons.concat(res.data)))
      .catch(console.error);
  }, []);

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const filteredPersons = persons && persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  const addContact = (event) => {
    event.preventDefault();
    const nameAlreadyExists = () => !!persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
    const nameIsProvided = () => !!newName && newName.length > 0;
    const numberIsProvided = () => !!newNumber && newNumber.length > 6; // Mock constraint.

    if(nameAlreadyExists()) {
      alert(`${newName} is already added to the phonebook`);
    } else if(nameIsProvided() && numberIsProvided()) {
      setPersons(persons.concat({name: newName, number: newNumber}));
    } else {
      alert("Please provide both the name and the number");
    }
  }

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={filter} handleChange={handleFilterChange} />
      <h2>Add new contact</h2>
        <PersonForm 
          name={newName} 
          number={newNumber} 
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          handleSubmit={addContact} />
      <h2>Numbers</h2>
        <Persons persons={filteredPersons} />
    </div>
  )

}

export default App