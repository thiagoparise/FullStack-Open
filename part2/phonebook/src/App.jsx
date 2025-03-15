import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { key: 'Arto Hellas', name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  console.log(persons[0])

  const handleNewNumber = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName))
      alert(`${newName} is already added to the phonebook`)
    else
      setPersons(persons.concat({name: newName}))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App