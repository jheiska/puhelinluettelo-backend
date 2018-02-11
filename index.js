const express = require('express')
const app = express()

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
      "number": "040-555666",
      "id": 4
    },
    
  ]

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)