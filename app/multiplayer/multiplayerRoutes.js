const express = require('express')
const bodyParser = require('body-parser')

const multiplayerController = require('./multiplayerController')
const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/', multiplayerController.startGame)
router.put('/:id', multiplayerController.playerMove) // sending player selection to game record with matching ID then checking for win conditions
router.get('/:id', multiplayerController.getGame) // constantly return game record

module.exports = router
