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

io.on("connection", function (socket) {
	socket.on("newuser", function (username) {
		socket.broadcast.emit("update", username + " joined the conversation");
	});
	socket.on("exituser", function (username) {
		socket.broadcast.emit("update", username + " left the conversation");
	});
	socket.on("chat", function (message) {
		socket.broadcast.emit("chat", message);
	});
});

server.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
