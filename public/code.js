import RJNA from "../rjna/engine.js";
import { playerCard } from "../waitingRoom.js";
import { placePlayer } from "../players.js";
import { startAnimating } from "../script.js";
import { createMap, generateLevel } from "../mapTemplate.js";
import { globalSettings } from "../gameSetting.js";
import { otherLivesContainer } from "../gameState.js";
import { placePowerUp } from "../powerUps.js";

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
			renderMessage("update", update);
		});

		// adds recently joined player-card to the waiting room
		socket.on("waiting", function (userObj) {
			RJNA.getObjByAttrsAndPropsVal(orbital.obj, "players-waiting-container")
				.setChild(playerCard(userObj))
			updatePlayerOrbital(userObj)
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
			const cells = generateLevel()
			console.log(cells)
			socket.emit("generate-map", cells)
			updatePlayerOrbital(userObj)
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

		// draw map with all connected players and start game
		socket.on("start-game", function (obj) {
			orbital.cells = obj.cells
			let map = createMap(obj.cells)
			console.log(orbital)
			let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
			gameContainer.setChild(map);
			const gameWrapper = gameContainer.children[0];
			for (const player of obj.allPlayers) {
				switch (player.count) {
					case 1:
						gameWrapper.setChild(placePlayer(1, "one", player.username))
						break
					case 2:
						gameWrapper.setChild(placePlayer(2, "ghost", player.username))
						break
					case 3:
						gameWrapper.setChild(placePlayer(3, "lad", player.username))
						break
					case 4:
						gameWrapper.setChild(placePlayer(4, "wario", player.username))
						break
				}
			}
			// add player lives to the side
			let otherPlayers = obj.allPlayers.filter(player => player.count != socket.playerCount)
			console.log({ otherPlayers })
			let container = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "container")
			console.log(container)
			let otherLivesContainerObj = otherLivesContainer(otherPlayers)
			container.setChild(otherLivesContainerObj)
			const waitingRoomContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "waiting-rooms-container")
			waitingRoomContainer.removeAttr("style", "", { display: "none" })
			startAnimating(60)
		});

		// displays chat message
		socket.on("chat", function (message) {
			renderMessage("other", message);
		});

		socket.on("player-moving", function (obj) {
			for (let [key, value] of Object.entries(obj)) {
				if (key != "myPlayerNum") {
					orbital.players[obj.myPlayerNum][key] = value
				}
			}
		})
		socket.on("remove-player", function (userObj) {
			delete orbital.players[userObj.count]
			document.querySelector(`.player-${userObj.count}`).remove()
			document.querySelector(`#player-${userObj.count}-lives`).remove()
			console.log(orbital)
		})
		socket.on("receive-cells", function () {
			socket.emit("update-cells", orbital.cells)
		})
		socket.on("drop-power-up", function (powerUpArr) {
			for (let powerUpObj of powerUpArr) {
				switch (powerUpObj.powerUp) {
					case "speed":
						orbital.cells[powerUpObj.powerUpCoords[0]][[powerUpObj.powerUpCoords[1]]] = '🏃‍♂️'
						break;
					case "flames":
						orbital.cells[powerUpObj.powerUpCoords[0]][[powerUpObj.powerUpCoords[1]]] = '🔥'
						break;
					case "bombs":
						orbital.cells[powerUpObj.powerUpCoords[0]][[powerUpObj.powerUpCoords[1]]] = '💣'
						break;
				}
				let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
				const gameWrapper = gameContainer.children[0];
				gameWrapper.setChild(placePowerUp(powerUpObj))
			}
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

function updatePlayerOrbital(userObj) {
	orbital["players"][`${userObj["count"]}`] = {
		"name": userObj.username,
		"lives": 3,
		"powerUps": [],
		"speed": globalSettings.speed.normal,
	}
	// coordinates are [row][col]
	switch (userObj.count) {
		case 1:
			orbital["players"][`${userObj["count"]}`]["row"] = 1
			orbital["players"][`${userObj["count"]}`]["col"] = 1
			break
		case 2:
			orbital["players"][`${userObj["count"]}`]["row"] = 1
			orbital["players"][`${userObj["count"]}`]["col"] = 13
			break
		case 3:
			orbital["players"][`${userObj["count"]}`]["row"] = 11
			orbital["players"][`${userObj["count"]}`]["col"] = 13
			break
		case 4:
			orbital["players"][`${userObj["count"]}`]["row"] = 11
			orbital["players"][`${userObj["count"]}`]["col"] = 1
			break
	}
}

