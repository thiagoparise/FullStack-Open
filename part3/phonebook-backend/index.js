const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(cors())

morgan.token('data', function(req) {
    if(req.method === 'POST')
        return JSON.stringify(req.body)
    else
        return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person)
        response.json(person)
    else
        response.status(404).end()
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${(new Date()).toString()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)

    response.status(202).end()

})

app.post('/api/persons/', (request, response) => {  
    const person = request.body
    if(person.name && person.number) {
        if(persons.find(element => element.name === person.name)) {
            response.status(409).send({ error: 'name must be unique' })
        } else {
            person.id = Math.floor(Math.random()*10000)
            persons.push(person)
            //response.status(201).send({"Location": `/api/persons/${person.id}`})
            response.status(201).send(person)
        }
    } else {
        response.status(400).send({ error: 'information is missing' })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})