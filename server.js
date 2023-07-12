const express = require("express");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = 5500;

// Serve static files
app.use(express.static(__dirname));

// Serve index.html for all routes
app.get('/', (req, res) => {
	res.sendFile(__dirname, 'index.html');
});

let waitingTimer;
let startGameTimer;
let gameStarted = false
let choiceOfMap = []
io.on("connection", function (socket) {
	socket.on("newuser", function (username) {

		console.log(io.sockets.sockets.size)
		if (io.sockets.sockets.size <= 4) {
			// if (startGameTimer || gameStarted) {
			// 	socket.emit("connection-limit-reached", "Too Late!! The game has STARTED");
			// 	socket.disconnect(true);
			// } else {
			const connectedSockets = io.sockets.sockets;
			socket.username = username
			socket.playerCount = findPlayerCount()
			// console.log(connectedSockets)
			userObj = { "username": socket.username, "count": socket.playerCount }
			socket.broadcast.emit("waiting", userObj);

			if (io.sockets.sockets.size >= 2 && io.sockets.sockets.size < 4 && !waitingTimer) {
				// Start countdown when there are two or more connections and countdown is not already running
				startCountdown();
			}
			if (io.sockets.sockets.size === 4 && !startGameTimer) {
				// Start countdown when there are 4 connections and countdown is not already running
				startGameCountdown();
			}

			connectedSockets.forEach(connected => {
				const previouslyJoinedSocket = { "username": connected.username, "count": connected.playerCount }
				socket.emit("join-lobby", previouslyJoinedSocket)
			});
			socket.broadcast.emit("update", username + " joined the conversation");
			// }
		} else {
			socket.emit("connection-limit-reached", "Lobby is now full! Please Try Again Later");
			socket.disconnect(true);
		}
	});
	socket.on("exituser", function (username) {
		console.log("user has closed tab")
		socket.broadcast.emit("update", username + " left the conversation");
		socket.disconnect(true)
		// remove player-card from all connected users
		// socket.broadcast.emit("remove-waiting-player",socket.playerCount)
		io.sockets.sockets.delete(socket.id)
		if (io.sockets.sockets.size < 2 && waitingTimer) {
			stopCountdown();
		}
		if (io.sockets.sockets.size < 2 && startGameTimer) {
			stopGameCountdown();
		}
	});

	socket.on("generate-map", function (mapCells) {
		choiceOfMap.push(mapCells)
	})

	socket.on("player-movement", function (movingObj) {
		io.sockets.emit("player-moving", movingObj)
	})

	socket.on("chat", function (message) {
		socket.broadcast.emit("chat", message);
	});
	socket.on("disconnect", function (reason) {
		console.log({ reason })
		console.log({ socket })
		socket.broadcast.emit("update", socket.username + " has left the conversation")
		socket.broadcast.emit("remove-player", { "username": socket.username, "count": socket.playerCount })
		// if the length of connections=1, that player wins, send out game over with winner
	})
});

server.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

function startGameCountdown() {
	let countdown = 2;

	function emitGameCountdown() {
		io.sockets.emit("start-game-countdown", countdown);

		if (countdown > 0) {
			countdown--;
			startGameTimer = setTimeout(emitGameCountdown, 1000);
		} else {
			startGameTimer = null;
			const cells = choiceOfMap[Math.floor(Math.random() * choiceOfMap.length)]
			let allPlayers = []
			io.sockets.sockets.forEach(connected => {
				allPlayers.push({ "username": connected.username, "count": connected.playerCount })
			});
			io.sockets.emit("start-game", { cells, allPlayers });
			gameStarted = true
		}
	}
	emitGameCountdown();
}

function stopGameCountdown() {
	clearTimeout(startGameTimer);
	startGameTimer = null;
}

function startCountdown() {
	let countdown = 0;

	function emitCountdown() {
		io.sockets.emit("waiting-countdown", countdown);

		if (countdown > 0) {
			countdown--;
			waitingTimer = setTimeout(emitCountdown, 1000);
		} else {
			waitingTimer = null;
			startGameCountdown()
		}
	}

	emitCountdown();
}

function stopCountdown() {
	clearTimeout(waitingTimer);
	waitingTimer = null;
}

function findPlayerCount() {
	let smallestMissingValue = null;
	console.log("here")
	for (let n = 1; n <= 4; n++) {
		let found = false;

		for (let [id, socket] of io.sockets.sockets) {
			if (socket.playerCount === n) {
				found = true;
				break;
			}
		}

		if (!found) {
			smallestMissingValue = n;
			break;
		}
	}

	return smallestMissingValue;
}