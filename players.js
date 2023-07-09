import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js"
import { leftPressed, rightPressed, upPressed, downPressed } from "./input.js";

export function placePlayer(number, character) {
    return RJNA.tag.img({
        class: `player-${number}`, style: {
            top: orbital["players"][`${number}`]["row"] * globalSettings.wallHeight + "px",
            left: orbital["players"][`${number}`]["col"] * globalSettings.wallWidth + "px",
            width: `${globalSettings.players.width}px`,
            height: `${globalSettings.players.height}px`
        }
    }, {}, { src: globalSettings.players[character] });
}

export function PlayerMovement(socket) {
    const moving = {
        "myPlayerNum": socket.playerCount,
        "row": orbital["players"][`${socket.playerCount}`]["row"],
        "col": orbital["players"][`${socket.playerCount}`]["col"],
        "speed": orbital["players"][`${socket.playerCount}`]["speed"]
    }
    // move when the button is pressed and the next block is empty
    if (leftPressed && canMove(moving.row, moving.col - moving.speed)) {
        moving.col -= moving.speed
    } else if (rightPressed && canMove(moving.row, moving.col + 1)) {
        moving.col += moving.speed
    } else if (upPressed && canMove(moving.row - moving.speed, moving.col)) {
        moving.row -= moving.speed
    } else if (downPressed && canMove(moving.row + 1, moving.col)) {
        moving.row += moving.speed
    }
    movePlayers()
    socket.emit("playerMovement", moving)
}

function canMove(row, col) {
    if (row > 0 && row < globalSettings.numOfRows
        && col > 0 && col < globalSettings.numOfCols
        && orbital.cells[Math.floor(row)][Math.floor(col)] !== 1
        && orbital.cells[Math.floor(row)][Math.floor(col)] !== "▉") {
        return true;
    }
    return false;
}

export function movePlayers() {
    for (let [playerNum, playerObj] of Object.entries(orbital.players)) {
        document.querySelector(`.player-${playerNum}`).style.top = playerObj.row * globalSettings.wallHeight + "px"
        document.querySelector(`.player-${playerNum}`).style.left = playerObj.col * globalSettings.wallWidth + "px"
    }

}

