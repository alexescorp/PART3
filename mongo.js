const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://dquitoc712:${password}@cluster0.iowrbi6.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: BigInt,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {  // --- Almacenar datos en MongoDB
    console.log('Almacena datos')
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })

} else if (process.argv.length = 3) {   // --- Consultar datos de MongoDB
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(note => {
        console.log(note.name + ' '+ note.number)
        })
        mongoose.connection.close()
    })
}