const express = require('express')
const morgan = require('morgan');

const app = express()

app.use(express.json())
app.use(express.static('dist'))

//  Datos enviados en las solicitudes HTTP POST
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :response-time ms :body', {
    skip: (req) => req.method !== 'POST'
}));

// app.use(morgan('tiny'));


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

// Eliminar una sola entrada
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    agenda = agenda.filter(person => person.id !== id)

    response.status(204).end()
})

// Genera un nuevo id random
const generateId = () => {
    return Math.floor(Math.random() * 100000) + 1;
}

// Agregar nuevas entradas
app.post('/api/persons', (request, response) => {
    console.log(request.headers) // IMPRIME CABECERAS
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (agenda.some(contact => contact.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const persona = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    agenda = agenda.concat(persona)

    response.json(persona)
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