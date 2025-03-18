import { useState, useEffect } from 'react'
import axios from 'axios'

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

  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setPersonsFiltered(response.data.slice())
    })
  }, [])

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