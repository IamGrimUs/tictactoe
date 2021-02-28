const mongoose = require('mongoose')

const multiplayerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  playerOne: { type: String, required: true },
  playerTwo: { type: String },
  gameBoard: [
    [String, String, String],
    [String, String, String],
    [String, String, String]
  ],
  winner: String
})

const multiplayer = mongoose.model('multiplayer', multiplayerSchema)

module.exports = multiplayer
