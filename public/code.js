import RJNA from "../rjna/engine.js";
import { playerCard } from "../waitingRoom.js";

export function runChatroom() {

	const app = document.querySelector(".app");
	const socket = io();

	let uname;

	// when the user presses join in the waiting room
	app.querySelector(".join-screen #join-user").addEventListener("click", function () {
		let username = app.querySelector(".join-screen #username").value;
		if (username.length == 0) {
			return;
		}
		socket.emit("newuser", username);
		uname = username;
	});

	// when the user the sends a message to the chatroom
	app.querySelector(".chat-screen #send-message").addEventListener("click", function () {
		let message = app.querySelector(".chat-screen #message-input").value;
		if (message.length == 0) {
			return;
		}
		renderMessage("my", {
			username: uname,
			text: message
		});
		socket.emit("chat", {
			username: uname,
			text: message
		});
		app.querySelector(".chat-screen #message-input").value = "";
	});

	// when the user presses the exit button on the chatroom
	app.querySelector(".chat-screen #exit-chat").addEventListener("click", function (evt) {
		evt.preventDefault()
		socket.emit("exituser", uname);
		socket.close()
		renderMessage("update", "You have Left the conversation");
	});

	// sends update message to the chatroom
	socket.on("update", function (update) {
		console.log({ update })
		renderMessage("update", update);
	});

	// adds recently joined player-card to the waiting room
	socket.on("waiting", function (userObj) {
		app.querySelector(".players-waiting-container").appendChild(RJNA.createNode(playerCard(userObj)))
		// RJNA.getObjByAttrsAndPropsVal(orbital.obj,"players-waiting-container").setChild()
		console.log(userObj);
	});

	// retrieves and displays all connected users on recently joined user's waiting room
	socket.on("join-lobby", function (userObj) {
		if (Object.keys(userObj).length != 0)
			app.querySelector(".join-screen").classList.remove("active");
		app.querySelector(".chat-screen").classList.add("active");
		renderMessage("update", userObj.username + " joined the conversation");
		console.log(app.querySelector(".players-waiting-container").appendChild(RJNA.createNode(playerCard(userObj))))
		console.log(userObj);
	});

	// display 20s countdown when 2 or more users have joined the waiting room
	socket.on("waiting-countdown", function (countdown) {
		const waitingCountdown = app.querySelector(".countdown")
		waitingCountdown.classList.add("waiting")
		if (countdown >= 10) {
			waitingCountdown.innerHTML = `00:${countdown}`
		} else {
			waitingCountdown.innerHTML = `00:0${countdown}`
		}
	});
	// display 10s countdown before game starts
	socket.on("start-game-countdown", function (countdown) {
		const startGameCountdown = app.querySelector(".countdown")
		startGameCountdown.classList.remove("waiting")
		if (countdown >= 10) {
			startGameCountdown.innerHTML = `00:${countdown}`
		} else {
			startGameCountdown.innerHTML = `00:0${countdown}`
		}
	});

	// displays full lobby message on form
	socket.on("connection-limit-reached", function (message) {
		const fullLobbyMessage = RJNA.tag.p({ class: "full-lobby-message" }, {}, {}, message)
		const fullLobbyMessageNode = RJNA.createNode(fullLobbyMessage)
		app.querySelector(".join-screen form").appendChild(fullLobbyMessageNode)
	});

	// displays full lobby message on form
	socket.on("start-game", function (message) {
		const waitingRoomContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "waiting-rooms-container")
		console.log(waitingRoomContainer)
		waitingRoomContainer.removeAttrs("style", "", { display: "none" })
		// app.querySelector(".waiting-rooms-container")
	});

	// displays chat message
	socket.on("chat", function (message) {
		renderMessage("other", message);
	});

	// Add an event listener to capture the page refresh event
	window.addEventListener('beforeunload', function () {
		console.log("refresh")
		socket.emit("exituser", uname);
		socket.close()
	});

	function renderMessage(type, message) {
		let messageContainer = app.querySelector(".chat-screen .messages");
		if (type == "my") {
			let el = document.createElement("div");
			el.setAttribute("class", "message my-message");
			el.innerHTML = `
				<div>
					<div class="name">You</div>
					<div class="text">${message.text}</div>
				</div>
			`;
			messageContainer.appendChild(el);
		} else if (type == "other") {
			let el = document.createElement("div");
			el.setAttribute("class", "message other-message");
			el.innerHTML = `
				<div>
					<div class="name">${message.username}</div>
					<div class="text">${message.text}</div>
				</div>
			`;
			messageContainer.appendChild(el);
		} else if (type == "update") {
			let el = document.createElement("div");
			el.setAttribute("class", "update");
			el.innerText = message;
			messageContainer.appendChild(el);
		}
		// scroll chat to end
		messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
	}
	let hello = "Hello"
	console.log("🚀 ~ file: code.js:80 ~ hello:", hello)

};
