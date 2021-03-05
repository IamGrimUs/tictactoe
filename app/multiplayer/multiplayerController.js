const multiplayerModel = require('./multiplayerModel')

const findOpenGame = async () => {
  const game = await multiplayerModel.findOne({
    playerTwo: { $eq: undefined }
  })
  return game
}

const startGame = async (req, res) => {
  try {
    const playerId = Date.now().toString()

    const matchGame = await findOpenGame()
    if (matchGame) {
      matchGame.playerTwo = playerId
      await matchGame.save()

      res.status(201).json({
        data: matchGame
      })
      return
    }

    const gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]

    const newGame = await multiplayerModel.create({
      playerOne: playerId,
      gameBoard
    })
    res.status(201).json({
      data: newGame
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const checkForWin = (board, matchPoint) => {
  if (matchPoint === board.length) {
    return true
  } else {
    return false
  }
}

const checkDiag = board => {
  let matchPoint = 0
  playerId = ''
  for (let i = 0; i < board.length; i++) {
    if ((board[i + 1] && board[i][i] === board[i + 1][i + 1]) || (!board[i + 1] && board[i][i] === board[i - 1][i - 1])) {
      matchPoint++
    } else {
      matchPoint = 0
      break
    }
  }

  if (matchPoint !== board.length) {
    for (let i = 0; i < board.length; i++) {
      const pos = board[i].length - 1 - i
      if ((board[i + 1] && board[i][pos] === board[i + 1][pos - 1]) || (!board[i + 1] && board[i][pos] === board[i - 1][pos + 1])) {
        matchPoint++
        playerId = board[i][pos]
      } else {
        matchPoint = 0
        playerId = ''
        break
      }
    }
  }
  if (checkForWin(board, matchPoint)) return playerId
}

const checkHori = board => {
  let matchPoint = 0
  let playerId = ''
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if ((board[i][j + 1] !== undefined && board[i][j] === board[i][j + 1]) || (board[i][j + 1] === undefined && board[i][j] === board[i][j - 1])) {
        matchPoint++
        playerId = board[i][j]
      } else {
        matchPoint = 0
        playerId = ''
        break
      }
    }
    if (checkForWin(board, matchPoint)) return playerId
  }
}

const checkVert = board => {
  let matchPoint = 0
  playerId = ''
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if ((board[j + 1] && board[j][i] === board[j + 1][i]) || (!board[j + 1] && board[j][i] === board[j - 1][i])) {
        matchPoint++
        plauerId = board[j][i]
      } else {
        matchPoint = 0
        playerId = ''
        break
      }
    }
    if (checkForWin(board, matchPoint)) return playerId
  }
}

const checkforWinner = board => {
  let winner = checkDiag(board) || checkHori(board) || checkVert(board)
  return winner
}

const playerMove = async (req, res) => {
  try {
    const gameId = req.params.id
    const { playerId, row, column } = req.body
    const game = await multiplayerModel.findOne({
      _id: gameId
    })

    if (!game) {
      res.status(404).json({
        message: `game ${gameId} not found`
      })
      return
    }

    const updatedBoard = [...game.gameBoard]
    updatedBoard[row][column] = playerId

    const winner = checkforWinner(game.gameBoard)

    await game.updateOne({
      $set: { gameBoard: updatedBoard, winner }
    })
    const updatedGame = await multiplayerModel.findOne({
      _id: gameId
    })

    res.status(200).json({
      data: updatedGame,
      version: Date.now()
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getGame = async (req, res) => {
  try {
    const gameId = req.params.id
    const game = await multiplayerModel.findOne({
      _id: gameId
    })
    if (!game) {
      res.status(404).json({
        message: `game ${gameId} not found`
      })
      return
    }

    res.status(200).json({
      data: game
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  startGame,
  playerMove,
  getGame
}
