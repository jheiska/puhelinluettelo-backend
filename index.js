const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

  /*
  const Info = () => {
    return(
    <div>
    <p>Puhelinluettelossa on {persons.length} henkilön tiedot</p>
    <p>{new Date()}</p>
    </div>
    )
    }
*/
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
        Math.floor(Math.random() * 500)
    )}

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
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