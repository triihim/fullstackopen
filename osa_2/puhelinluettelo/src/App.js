import React, { useState, useEffect } from 'react';
import contactService from "./services/contactService";

const Filter = ({value, handleChange}) => {
  return (
    <div>
      filter: <input value={value} onChange={handleChange} />
    </div>
  );
}

const ContactForm = (props) => {
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

const ContactList = ({contacts, onDelete}) => {
  return (
    <div>
      {contacts.map(c => {
        return (
          <div key={c.id}>
            <span>{c.name} {c.number}</span>
            <button onClick={() => onDelete(c.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

const App = () => {
  const [ contacts, setContacts] = useState([]);
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const nameAlreadyExists = () => !!contacts.find(p => p.name.toLowerCase() === newName.toLowerCase());
  const nameIsProvided = () => !!newName && newName.length > 0;
  const numberIsValid = () => !!newNumber && newNumber.length > 6; // Mock constraint.
  const sortContactsByName = (c1, c2) => c2.name.toLowerCase() < c1.name.toLowerCase() ? 1 : -1;

  useEffect(() => {
    contactService.getContacts()
      .then(fetchedContacts => setContacts(c => c.concat(fetchedContacts)))
      .catch(console.error);
  }, []);

  const filteredContacts = contacts && contacts.filter(c => c.name.toLowerCase().includes(filter.toLowerCase())).sort(sortContactsByName);

  const createContract = () => {
    contactService.createContact({name: newName, number: newNumber})
      .then(createdContact => {
        setContacts(contacts.concat(createdContact))
        setNewName("");
        setNewNumber("");
      })
      .catch(console.error);
  }

  const deleteContact = id => {
    if(window.confirm(`Delete ${contacts.find(c => c.id === id).name}?`)) {
      contactService.deleteContact(id)
        .then(() => setContacts(contacts.filter(c => c.id !== id)))
        .catch(console.error)
    }
  }

  const updateContactNumber = () => {
    const existingContact = contacts.find(c => c.name.toLowerCase() === newName.toLowerCase());
    if(numberIsValid()) {
      contactService.updateNumber(existingContact.id, {name: existingContact.name, number: newNumber})
        .then(updatedContact => setContacts(contacts.filter(c => c.id !== existingContact.id).concat(updatedContact)))
        .catch(console.error);
    } else {
      alert("Provide a proper number");
    }
  }

  const attemptContactCreation = () => {
    if(nameAlreadyExists() && window.confirm(`${newName} is already added to the phonebook. Update existing number?`)) {
      updateContactNumber();
    } else if(nameIsProvided() && numberIsValid()) {
      createContract();
    } else {
      alert("Please provide both the name and the number. Also, ensure the number is long enough");
    }
  }

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);
  const handleContactDelete = contactId => deleteContact(contactId);
  const handleContactFormSubmit = event => event.preventDefault() || attemptContactCreation();

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={filter} handleChange={handleFilterChange} />
      <h2>Add new contact</h2>
        <ContactForm 
          name={newName} 
          number={newNumber} 
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          handleSubmit={handleContactFormSubmit} />
      <h2>Numbers</h2>
        <ContactList contacts={filteredContacts} onDelete={handleContactDelete} />
    </div>
  )

}

export default App