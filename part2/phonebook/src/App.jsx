import { useState } from 'react'

const Filter = ({ handlePersonsFilter }) => <div>filter shown with <input onChange={handlePersonsFilter} /></div>

const PersonForm = ({ addNumber, handleNewNumber, handleNewName }) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input onChange={handleNewName} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form> 
  ) 
}

const Persons = ({ personsFiltered }) => {
  return (
    <ul>
        {
          personsFiltered.map(person => <li key={person.name}>{person.name + ' ' + person.number}</li>)
        }
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsFiltered, setPersonsFiltered] = useState(persons.slice()) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonsFilter = (event) => {
    setPersonsFiltered(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName))
      alert(`${newName} is already added to the phonebook`)
    else{
      const personsUpdated = persons.concat({name: newName, number: newNumber, id: persons.length + 1})
      setPersons(personsUpdated)
      setPersonsFiltered(personsUpdated.slice())
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handlePersonsFilter={handlePersonsFilter}/>

      <h2>Add a new</h2>
      
      <PersonForm addNumber={addNumber} handleNewNumber={handleNewNumber} handleNewName={handleNewName} />

      <h2>Numbers</h2>
      
      <Persons personsFiltered={personsFiltered} />

    </div>
  )
}

export default App