import { useState, useEffect } from 'react'
import personService from './services/persons'
import './styles.css'

const Filter = ({ handlePersonsFilter }) => <div>filter shown with <input onChange={handlePersonsFilter} /></div>

const Notification = ({ message, type }) => {
  if(message == null)
    return null
  return (
    <div className={`notification ${type}-notification`}>
      {message}
    </div>
  )
}

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

const Persons = ({ personsFiltered, handleDeleteContact }) => {
  return (
    <ul>
        {
          personsFiltered.map(person => 
          {
            return (
                <li key={person.name}>
                  {`${person.name} ${person.number}  `}
                  <button onClick={() => handleDeleteContact(person.name, person.id)}>delete</button>
                </li>)
          })
        }
    </ul>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNotification, setNewNotification] = useState({message: null, type: null})
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsFiltered(initialPersons.slice())
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

  const handleDeleteContact = (name, id) => {
    if ( window.confirm(`Delete ${name}?`) ){
      const personsUpdated = persons.filter(person => person.id != id)
      setPersons(personsUpdated)
      setPersonsFiltered(personsUpdated.slice())
      personService
        .deleteContact(id)
        .then(deletedContact => console.log(deletedContact))
    }
  }

  const addNumber = (event) => {
    event.preventDefault()
    const findedPerson = persons.find(person => person.name === newName)
    
    if (findedPerson){
      if ( window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`) ) {
        const personUpdated = {...findedPerson, number: newNumber}

        personService
          .update(findedPerson.id, personUpdated)
          .then(response => {
            const personsUpdated = persons.map(person => person.id === findedPerson.id ? response : person)
            setPersons(personsUpdated)
            setPersonsFiltered(personsUpdated.slice())
            setNewNotification({
              message:`Updated ${personUpdated.name}`,
              type: 'succesful'
            })
          })
          .catch(promise => {
            console.log(promise)
            setNewNotification({
              message:`Information of ${personUpdated.name} has already been removed from the server`,
              type:'error'
            })
          })
        setTimeout(() => {
          setNewNotification(null)
        }, 5000)
      }
    }
    else{
      const newContact = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(newContact)
        .then(returnedContact => {
          const personsUpdated = persons.concat(returnedContact)
          setPersons(personsUpdated)
          setPersonsFiltered(personsUpdated.slice())
        })
      setNewNotification({
          message:`Added ${newContact.name}`,
          type:'success'
      })
      setTimeout(() => {
        setNewNotification({message: null, type: null})
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={newNotification?.message} type={newNotification?.type} />

      <Filter handlePersonsFilter={handlePersonsFilter}/>

      <h2>Add a new</h2>
      
      <PersonForm addNumber={addNumber} handleNewNumber={handleNewNumber} handleNewName={handleNewName} />

      <h2>Numbers</h2>
      
      <Persons personsFiltered={personsFiltered} handleDeleteContact={handleDeleteContact} />

    </div>
  )
}

export default App