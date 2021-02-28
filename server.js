const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const multiplayerRoutes = require('./app/multiplayer/multiplayerRoutes')

const app = express()
const port = 8080

app.use(express.static('public'))
app.use('/api/game', multiplayerRoutes)
app.use(cors())

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }
  next()
})

const mongoString = 'mongodb+srv://r_dbl_l:t__thPile333@cluster0.0dpsk.mongodb.net/tictactoe?retryWrites=true&w=majority'

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', function (error) {
  console.log(error)
})

mongoose.connection.on('open', function () {
  console.log('Connected to MongoDB database.')
})

app.get('/', function (req, res) {
  res.send('GET request to homepage')
})

app.listen(port, () => {
  console.log('The app is running... You better go catch it.', port)
})

module.exports = { app }
