const express = require('express')
const bodyParser = require('body-parser')

const multiplayerController = require('./multiplayerController')
const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/game', multiplayerController.startGame) // check db for records if record exists with no playerTwo add playerTwo or if no records then create game in db
// router.put('/game/:id', multiplayerController.playerMove) // sending player selection to game record with matching ID then checking for win conditions
// router.get('/game/:id', multiplayerController.getGame) // constantly return game record

module.exports = router
