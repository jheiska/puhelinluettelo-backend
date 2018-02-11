const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.json())

// Tehtävä 3.8 JOS ON AIKAA!
//morgan.token('data', function (req, res) { return req.headers['content-type'] })
//app.use(morgan(':method :url :status :data :res[content-length] - :response-time ms'))

app.use(morgan('tiny'))

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

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/info', (request, response) => {
    response.send(`<div><p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${new Date()}</p></div>`)    
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )
    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
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
    if (found === undefined) {
        return response.status(400).json({error: 'name already exists'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)