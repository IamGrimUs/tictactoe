const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const multiplayerGame = require('./app/multiplayer/multiplayerModel')

const mongoString = 'mongodb+srv://r_dbl_l:t__thPile333@cluster0.0dpsk.mongodb.net/tictactoe?retryWrites=true&w=majority'

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', function (error) {
  console.log(error)
})

mongoose.connection.on('open', function () {
  console.log('Connected to MongoDB database.')
})

app.listen(port, () => {
  console.log('The app is running... You better go catch it.')
})
