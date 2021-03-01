const express = require('express')
const bodyParser = require('body-parser')

const multiplayerController = require('./multiplayerController')
const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/', multiplayerController.startGame)
router.get('/:id', multiplayerController.getGame)
router.put('/:id', multiplayerController.playerMove)

module.exports = router
