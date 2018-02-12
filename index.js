const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

/*
const url = 'mongodb://juuseri:database@ds233218.mlab.com:33218/heroku_h2x98943'
mongoose.connect(url)
*/
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
morgan.token('vastaus', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :vastaus :res[content-length] - :response-time ms'))

/*
let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Matti Tienari",
      "number": "040-654321",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-111222",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-555444",
      "id": 4
    },
    ]
*/

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
  })

app.get('/api/info', (request, response) => {
    response.send(`<div><p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${new Date()}</p></div>`)    
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            Response.json(formatPerson(person))
        })
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return (
        Math.floor(Math.random() * 999999)
    )}

app.post('/api/persons/', (request, response) => {
    const body = request.body

    const found = persons.find(person => person.name === body.name )
    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
    }
    if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
    }
    /*
    if (found === undefined) {
        return response.status(400).json({error: 'name already exists'})
    }
    */
    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })
    
    person
        .save()
        .then(savedPerson => {
            response.json(formatPerson(savedPerson))
        })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})