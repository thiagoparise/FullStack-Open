require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

const persons = []

app.use(express.json())
app.use(express.static('dist'))
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
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person)
                response.json(person)
            else
                response.status(404).end()
        })
        .catch(error => next(error))
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
    
    if(request.body.name && request.body.number) {
        const person = new Person({
            name: request.body.name,
            number: request.body.number,
        })
        person.save().then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook`);
        })
        response.status(201).send(person)
    } else {
        response.status(400).send({ error: 'information is missing' })
    }
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})