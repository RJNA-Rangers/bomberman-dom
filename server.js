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
io.on("connection", function (socket) {
	socket.on("newuser", function (username) {
		io.sockets.sockets.size++
		console.log(io.sockets.sockets.size)
		if (io.sockets.sockets.size <= 4) {
			
			// when a player joins (find the smallest number available between 1-4 (based on playerCount) and make
			// incoming player that number
			if (startGameTimer) {
				socket.emit("connection-limit-reached", "Too Late!! The game has STARTED");
				socket.disconnect(true);
			} else {
				const connectedSockets = io.sockets.sockets;
				socket.username = username
				socket.playerCount = findPlayerCount()
				console.log(connectedSockets)
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
				io.sockets.emit("update", username + " joined the conversation");
			}
		} else {
			socket.emit("connection-limit-reached", "Lobby is now full! Please Try Again Later");
			socket.disconnect(true);
		}
	});
	socket.on("exituser", function (username) {
		console.log(io.sockets.sockets.size)
		socket.broadcast.emit("update", username + " left the conversation");
		socket.disconnect(true)
		// remove player-card from all connected users
		// socket.broadcast.emit("remove-waiting-player",socket.playerCount)
		io.sockets.sockets.delete(socket.id)
		if (io.sockets.sockets.size < 2 && waitingTimer) {
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

function findPlayerCount() {
	let smallestMissingValue = null;
	for (let n of [...Array(4).keys()]) {
	  let isValuePresent = false;
	  io.sockets.sockets.forEach(socket => {
		if (socket.playerCount && socket.playerCount) {
		  isValuePresent = true;
		}
	  });
  
	  if (!isValuePresent) {
		// Value n is not present in any socket's playerCount
		// Update the smallestMissingValue if it is null or greater than n
		if (smallestMissingValue === null || smallestMissingValue > n+1) {
		  smallestMissingValue = n+1;
		}
	  }
	}
  
	return smallestMissingValue;
  }