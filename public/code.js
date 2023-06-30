import RJNA from "../rjna/engine.js";
import { playerCard } from "../waitingRoom.js";
import { placePlayer } from "../players.js";
import { startAnimating } from "../script.js";

export let socket;
let uname;
export function runChatroom() {
	const app = document.querySelector(".app");
	// when the user presses join in the waiting room
	const joinUserButton = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "join-user")
	joinUserButton.setProp("onclick", function () {

		let username = app.querySelector(".join-screen #username").value;
		if (username.length == 0) {
			return;
		}
		socket = io()
		socket.emit("newuser", username);
		uname = username;
		runSocket()
	})

	// when the user the sends a message to the chatroom
	const sendMessageButton = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "send-message")
	sendMessageButton.setProp("onclick", function () {
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
	})

	// when the user presses the exit button on the chatroom
	const exitChatButton = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "exit-chat")
	exitChatButton.setProp("onclick", function (evt) {
		evt.preventDefault()
		socket.emit("exituser", uname);
		socket.close()
		renderMessage("update", "You have Left the conversation");
	})

	function runSocket() {	// sends update message to the chatroom
		socket.on("update", function (update) {
			console.log({ update })
			renderMessage("update", update);
		});

		// adds recently joined player-card to the waiting room
		socket.on("waiting", function (userObj) {
			RJNA.getObjByAttrsAndPropsVal(orbital.obj, "players-waiting-container")
				.setChild(playerCard(userObj))
			let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
			const gameWrapper = gameContainer.children[0];
			switch (userObj.count) {
				case 1:
					gameWrapper.setChild(placePlayer(1, "one"))
					break
				case 2:
					gameWrapper.setChild(placePlayer(2, "ghost"))
					break
				case 3:
					gameWrapper.setChild(placePlayer(3, "lad"))
					break
				case 4:
					gameWrapper.setChild(placePlayer(4, "wario"))
					break
			}
			orbital["players"][`${userObj["count"]}`] = {
				"name": userObj.username,
				"left": false,
				"right": false,
				"up": false,
				"down": false,
				"lives": 3,
				"powerUps": []
			}
		});

		// retrieves and displays all connected users on recently joined user's waiting room
		socket.on("join-lobby", function (userObj) {
			if (Object.keys(userObj).length != 0)
				if (userObj.username == uname) {
					socket.username = uname
					socket.playerCount = userObj.count
				}
			RJNA.getObjByAttrsAndPropsVal(orbital.obj, "join-screen").removeAttr("class", "active", "")
			RJNA.getObjByAttrsAndPropsVal(orbital.obj, "chat-screen").setAttr("class", "active")
			renderMessage("update", userObj.username + " joined the conversation");
			RJNA.getObjByAttrsAndPropsVal(orbital.obj, "players-waiting-container")
				.setChild(playerCard(userObj))
			let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
			const gameWrapper = gameContainer.children[0];
			switch (userObj.count) {
				case 1:
					gameWrapper.setChild(placePlayer(1, "one"))
					break
				case 2:
					gameWrapper.setChild(placePlayer(2, "ghost"))
					break
				case 3:
					gameWrapper.setChild(placePlayer(3, "lad"))
					break
				case 4:
					gameWrapper.setChild(placePlayer(4, "wario"))
					break
			}
			orbital["players"][`${userObj["count"]}`] = {
				"name": userObj.username,
				"left": false,
				"right": false,
				"up": false,
				"down": false,
				"lives": 3,
				"powerUps": []
			}
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
			RJNA.getObjByAttrsAndPropsVal(orbital.obj, "form").setChild(fullLobbyMessage)
			socket.emit("exituser", uname);
			socket.close()
		});



		// displays full lobby message on form
		socket.on("start-game", function () {
			const waitingRoomContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "waiting-rooms-container")
			waitingRoomContainer.removeAttr("style", "", { display: "none" })
			startAnimating(60)
		});

		// displays chat message
		socket.on("chat", function (message) {
			renderMessage("other", message);
		});

		socket.on("playerMovement", function (obj) {
			console.log(obj)
			for (let [key, value] of Object.entries(obj)) {
				if (key != "myPlayerNum") {
					orbital.players[obj.myPlayerNum][key] = value
				}
			}
			console.log(orbital)
		})
	}
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
	console.log("🚀 ~ file: code.js:180 ~ hello:", hello)

};

// // Add an event listener to capture the page refresh event
// window.addEventListener('unload', function () {
// 	console.log("refresh")
// 	socket.emit("exituser", uname);
// 	socket.close()
// });
