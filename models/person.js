const mongoose = require('mongoose')

const url = 'mongodb://juuseri:database@ds233218.mlab.com:33218/heroku_h2x98943'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
  })

  const formatPerson = (person) => {
    return {
      name: person.name,
      number: note.number,
      id: person._id
    }
  }


module.exports = Person