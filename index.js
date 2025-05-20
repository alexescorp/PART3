const express = require('express')
const app = express()

let agenda = [
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

app.get('/api/persons', (request, response) => {
    response.json(agenda)
})

// Información de una sola entrada de la agenda
app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = agenda.find(note => note.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// GET Info
app.get('/info', (request, response) => {
    const horaSolicitud = new Date();
    const entradasAgenda = agenda.length;

    response.send(`
        <p>Phonebook has info for ${entradasAgenda} people.</p>
        <p>${horaSolicitud.toString()}</p>
    `);
});


//-------------------------------------------------------
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})