import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js"
import { leftPressed, rightPressed, upPressed, downPressed } from "./input.js";
export function placePlayer(number, character) {
    // 
    const loadingArea = document.querySelector(`.loading-${number}`).style
    console.log(loadingArea.top)
    // the starting central position of player:
    // -- top position of loading box
    const playerTop = loadingArea.top;
    // -- left position of loading box
    const playerLeft = loadingArea.left;
    return RJNA.tag.img({
        class: `player-${number}`, style: {
            top: `${playerTop}`, left: `${playerLeft}`, width: `${globalSettings.players.width}px`,
            height: `${globalSettings.players.height}px`
        }
    }, {}, { src: globalSettings.players[character] });
}

export function PlayerMovement(socket) {
    const moving = {
        "myPlayerNum": socket.playerCount,
        "left": false,
        "right": false,
        "up": false,
        "down": false
    }
    if (leftPressed) {
        moving.left = true
    } else if (rightPressed) {
        moving.right = true
    } else if (upPressed) {
        moving.up = true
    } else if (downPressed) {
        moving.down = true
    } else if (!leftPressed) {
        moving.left = false
    } else if (!rightPressed) {
        moving.right = false
    } else if (!upPressed) {
        moving.up = false
    } else if (!downPressed) {
        moving.down = false
    }
    movePlayers()
    socket.emit("playerMovement", moving)
}

export function movePlayers() {
    for (let [playerNum, playerObj] of Object.entries(orbital.players)) {
        const leftValue = parseInt(document.querySelector(`.player-${playerNum}`).style.left);
        const topValue = parseInt(document.querySelector(`.player-${playerNum}`).style.top);
        for (let [direction, bool] of Object.entries(playerObj)) {
            switch (direction) {
                case "left":
                    if (bool) {
                        document.querySelector(`.player-${playerNum}`).style.left = (leftValue - globalSettings.speed.x) + "px";
                    }
                    break;

                case "right":
                    if (bool) {
                        document.querySelector(`.player-${playerNum}`).style.left = (leftValue + globalSettings.speed.x) + "px";
                    }
                    break;

                case "up":
                    if (bool) {
                        document.querySelector(`.player-${playerNum}`).style.top = (topValue - globalSettings.speed.y) + "px";
                    }
                    break;

                case "down":
                    if (bool) {
                        document.querySelector(`.player-${playerNum}`).style.top = (topValue + globalSettings.speed.y) + "px";
                    }
                    break;

                default:
                    break;
            }
        }

    }

}

