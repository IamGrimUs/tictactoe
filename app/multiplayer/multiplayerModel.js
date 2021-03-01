const mongoose = require('mongoose')

const multiplayerSchema = new mongoose.Schema({
  playerOne: { type: String, required: true },
  playerTwo: { type: String },
  gameBoard: [mongoose.Schema.Types.Mixed],
  winner: String
})

const multiplayer = mongoose.model('multiplayer', multiplayerSchema)

module.exports = multiplayer
