import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js"
import { leftPressed, rightPressed, upPressed, downPressed, pickUp, one, two, three } from "./input.js";

export function placePlayer(number, character, username) {
    return RJNA.tag.div(
        {
            class: `player-${number}`, style: {
                top: orbital["players"][`${number}`]["row"] * globalSettings.wallHeight + "px",
                left: orbital["players"][`${number}`]["col"] * globalSettings.wallWidth + "px",
                width: `${globalSettings.players.width}px`,
                height: `${globalSettings.players.height}px`
            },
        },
        {},
        {},
        RJNA.tag.p({}, {}, {}, username),
        RJNA.tag.img(
            {
                style: {
                    width: "100%",
                    height: "100%",
                }
            },
            {},
            { src: globalSettings.players[character] })
    )
}

export function PlayerMovement(socket) {
    const moving = {
        "myPlayerNum": socket.playerCount,
        "row": orbital["players"][`${socket.playerCount}`]["row"],
        "col": orbital["players"][`${socket.playerCount}`]["col"],
        "speed": orbital["players"][`${socket.playerCount}`]["speed"]
    }
    let playerPowerUpsArr = orbital["players"][moving.myPlayerNum]["power-ups"]
    // move when the button is pressed and the next block is empty
    if (leftPressed && canMove(moving.row, moving.col - moving.speed)) {
        moving.col -= moving.speed
    } else if (rightPressed && canMove(moving.row, moving.col + 1)) {
        moving.col += moving.speed
    } else if (upPressed && canMove(moving.row - moving.speed, moving.col)) {
        moving.row -= moving.speed
    } else if (downPressed && canMove(moving.row + 1, moving.col)) {
        moving.row += moving.speed
    } else if (pickUp && isPowerUp(moving.row, moving.col)) {
        if (playerPowerUpsArr.length < 3) {
            let row = moving.row
            let col = moving.col
            let powerUp;
            let powerUpCoords = [Math.floor(row), Math.floor(col)]
            // send to server, the icon and its coords to remove from everyones map.
            if (orbital.cells[Math.floor(row)][Math.floor(col)] === globalSettings["power-ups"]["types"]["speed"]) {
                powerUp = "speed"
            } else if (orbital.cells[Math.floor(row)][Math.floor(col)] === globalSettings["power-ups"]["types"]["flames"]) {
                powerUp = "flames"
            } else if (orbital.cells[Math.floor(row)][Math.floor(col)] === globalSettings["power-ups"]["types"]["bombs"]) {
                powerUp = "bombs"
            }
            playerPowerUpsArr.push(powerUp)
            // add power up to power-up container
            socket.emit("power-picked-up", { powerUp, powerUpCoords })
        }
    } else if (one) {
        // change speed and
        console.log(playerPowerUpsArr)
        if (playerPowerUpsArr.indexOf("speed") !== -1)
            moving.speed = globalSettings.speed.fast
        // remove speed icon from power-up container

    } else if (two) {
        //change explosion range.

    } else if (three) {
        //drop another bomb.

    }
    movePlayers()
    socket.emit("player-movement", moving)
}

function canMove(row, col) {
    if (orbital.cells[Math.floor(row)][Math.floor(col)] !== 1
        && orbital.cells[Math.floor(row)][Math.floor(col)] !== "▉") {
        return true;
    }
    return false;
}

function isPowerUp(row, col) {
    if (
        orbital.cells[Math.floor(row)][Math.floor(col)] == globalSettings["power-ups"]["types"]["speed"] ||
        orbital.cells[Math.floor(row)][Math.floor(col)] == globalSettings["power-ups"]["types"]["flames"] ||
        orbital.cells[Math.floor(row)][Math.floor(col)] == globalSettings["power-ups"]["types"]["bombs"]
    ) {
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

