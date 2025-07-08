require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

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

app.get('/info', (request, response, next) => {
    Person.estimatedDocumentCount()
        .then(amount => {
            response.status(200).send(`<p>Phonebook has info for ${amount} people</p> <p>${(new Date()).toString()}</p>`)
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(200).send(result)
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {  
    const body = request.body

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })

    newPerson.save()
        .then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook`);
            response.status(201).send(newPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const updatedPerson = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, updatedPerson, {new: true, runValidators: true})
        .then(person => {
            if (person) {
                response.status(200).send(person)
            } else {
                response.status(404).send({ error: 'contact not found'})
            }
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})