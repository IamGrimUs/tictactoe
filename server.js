const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const multiplayerRouter = require('./app/multiplayer/multiplayerRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.static('public'))
app.use('/api/game', multiplayerRouter)

// CORS
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(204)
//   }
//   next()
// })

const mongoString = 'mongodb+srv://r_dbl_l:t__thPile333@cluster0.0dpsk.mongodb.net/tictactoe?retryWrites=true&w=majority'

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', function (error) {
  console.log(error)
})

mongoose.connection.on('open', function () {
  console.log('Connected to MongoDB database.')
})

app.listen(PORT, () => {
  console.log('The app is running... You better go catch it.', PORT)
})

module.exports = { app }
