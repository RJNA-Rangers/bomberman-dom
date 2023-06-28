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

let connectionCount = 0
let waitingTimer;
let startGameTimer;
io.on("connection", function (socket) {
	socket.on("newuser", function (username) {
		connectionCount++
		if (connectionCount <= 4) {
			// when a player joins (find the smallest number available between 1-4 (based on playerCount) and make
			// incoming player that number
			const connectedSockets = io.sockets.sockets;
			socket.username = username
			socket.playerCount = connectionCount
			userObj = { "username": socket.username, "count": socket.playerCount }
			socket.broadcast.emit("waiting", userObj);

			if (connectionCount >= 2 && connectionCount < 4 && !waitingTimer) {
				// Start countdown when there are two or more connections and countdown is not already running
				startCountdown();
			}
			if (connectionCount === 4 && !startGameTimer) {
				// Start countdown when there are 4 connections and countdown is not already running
				startGameCountdown();
			}
			//   console.log({connectedSockets})
			connectedSockets.forEach(connected => {
				console.log(connected)
				const previouslyJoinedSocket = { "username": connected.username, "count": connected.playerCount }
				socket.emit("join-lobby", previouslyJoinedSocket)
			});
			io.sockets.emit("update", username + " joined the conversation");
			if (connectionCount == 2) {

			}
		} else {
			socket.emit("connection-limit-reached", "Lobby is now full! Please Try Again Later");
			socket.disconnect(true);
		}
	});
	socket.on("exituser", function (username) {
		if (connectionCount > 0) {
			connectionCount--
		}
		socket.broadcast.emit("update", username + " left the conversation");
		socket.disconnect(true)
		// remove player-card from all connected users
		// socket.broadcast.emit("rempove-waiting-player",socket.playerCount)
		io.sockets.sockets.delete(socket.id)
		if (connectionCount < 2 && waitingTimer) {
			stopCountdown();
		}
	});
	socket.on("chat", function (message) {
		socket.broadcast.emit("chat", message);
	});
});

server.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

function startGameCountdown() {
	let countdown = 10;

	function emitGameCountdown() {
		io.sockets.emit("start-game-countdown", countdown);

		if (countdown > 0) {
			countdown--;
			startGameTimer = setTimeout(emitGameCountdown, 1000);
		} else {
			startGameTimer = null;
			io.sockets.emit("start-game", countdown);
		}
	}
	emitGameCountdown();
}

function stopGameCountdown() {
	clearTimeout(startGameTimer);
	startGameTimer = null;
}

function startCountdown() {
	let countdown = 20;

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