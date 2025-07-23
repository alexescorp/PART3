const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

// establece coneccion con url
// valida si la conecion fue exitosa o con error e imprime un mensaje
mongoose.connect(url) 
  .then(result => {   console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  //Definicion del esquema
const agendaSchema = new mongoose.Schema({    
    name: String,
    number: BigInt,
})

// Configura cómo se transforman los documentos cuando se convierten a JSON
agendaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
       returnedObject.id = returnedObject._id.toString()
       returnedObject.number = returnedObject.number.toString()
       delete returnedObject._id
       delete returnedObject.__v
    }
  })

// Exporta el modelo "Note" para que pueda ser usado en otras partes de la aplicación.
module.exports = mongoose.model('Person', agendaSchema)