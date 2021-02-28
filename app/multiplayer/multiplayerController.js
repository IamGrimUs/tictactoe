// user calls start game api
// query db for game without playerTwo
// if found user becomes playerTwo
// if no game is found create game and asign playerOne
// endpoint should return Schema to both users
// if playerOne is return without playerTwo
// client side needs to call api multiple times until playerTwo is filled && board has a selection

// playerTwo should be the first user to select square
// after selection playerTwo needs to pull from API until playerOne has made selection

Starting Game(post api)
// look thourgh DB for records with playerTwo empty
// when game is started playerId needs to be stored && gameId needs to be stored
// if playerOne populated no playerTwo you are playerOne
// if playerOne populated and playerTwo populated you are playerTwo

Polling
// is winner, stop
// if playerOne joined but not playerTwo keep calling api
// if playerOne joined && playerTwo joined && I am playerOne && gameboard even keep calling api
// if playerOne joined && playerTwo joined && I am playerTwo && gameboard odd keep calls api