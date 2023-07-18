import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js"
import { leftPressed, rightPressed, upPressed, downPressed, pickUp, speedPressed, flamesPressed, bombsPressed } from "./input.js";
import { checkWallCollision } from "./collision.js";

export function placePlayer(number, character, username) {
    let topPosition = (orbital["players"][`${number}`]["row"] * globalSettings.wallHeight) + (globalSettings.wallHeight * 0.1)
    let leftPosition = (orbital["players"][`${number}`]["col"] * globalSettings.wallWidth) + (globalSettings.wallWidth * 0.1)
    console.log("top", topPosition, "left", leftPosition)
    return RJNA.tag.div(
        {
            class: `player-${number}`, style: {
                top: topPosition + "px",
                left: leftPosition + "px",
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
            { src: globalSettings.players[character] }
        )
    );
}

export function PlayerMovement(socket) {
    const moving = {
        "myPlayerNum": socket.playerCount,
        "row": orbital["players"][`${socket.playerCount}`]["row"],
        "col": orbital["players"][`${socket.playerCount}`]["col"],
        "speed": orbital["players"][`${socket.playerCount}`]["speed"] || 0.2
    }
    let playerPowerUpsArr = orbital["players"][moving.myPlayerNum]["power-ups"]

    // move when the button is pressed and the next block is empty
    if (leftPressed && !checkWallCollision("left", socket.playerCount, moving.speed)) {
        moving.col -= moving.speed;
    } else if (rightPressed && !checkWallCollision("right", socket.playerCount, moving.speed)) {
        moving.col += moving.speed
    } else if (upPressed && !checkWallCollision("up", socket.playerCount, moving.speed)) {
        moving.row -= moving.speed;
    } else if (downPressed && !checkWallCollision("down", socket.playerCount, moving.speed)) {
        moving.row += moving.speed;
    } else if (pickUp && isPowerUp(moving.row, moving.col)) {
        // if (playerPowerUpsArr.length < 3) {
        // console.log(touchingPowerUp(socket.playerCount,moving))
        let row = moving.row
        let col = moving.col
        let powerUp;
        let powerUpCoords = [Math.floor(row), Math.floor(col)]
        if (orbital.cells[Math.floor(row)][Math.floor(col)] === globalSettings["power-ups"]["types"]["speed"]) {
            powerUp = "speed"
        } else if (orbital.cells[Math.floor(row)][Math.floor(col)] === globalSettings["power-ups"]["types"]["flames"]) {
            powerUp = "flames"
        } else if (orbital.cells[Math.floor(row)][Math.floor(col)] === globalSettings["power-ups"]["types"]["bombs"]) {
            powerUp = "bombs"
        }
        playerPowerUpsArr.push(powerUp)
        let amountOfPowerUp = playerPowerUpsArr.filter(power => power === powerUp).length
        document.querySelector(`.${powerUp}-amount`).innerHTML = amountOfPowerUp
        socket.emit("power-picked-up", { powerUp, powerUpCoords })
        // }
    } else if (speedPressed) {
        console.log(playerPowerUpsArr)
        if (playerPowerUpsArr.indexOf("speed") !== -1 && moving.speed == globalSettings.speed.normal)
            moving.speed = globalSettings.speed.fast
        console.log("before remove", playerPowerUpsArr)
        playerPowerUpsArr.splice(playerPowerUpsArr.indexOf("speed"), 1)
        console.log("after remove", playerPowerUpsArr)
        setTimeout(() => {
            const revert = {
                "myPlayerNum": socket.playerCount,
                "row": orbital["players"][`${socket.playerCount}`]["row"],
                "col": orbital["players"][`${socket.playerCount}`]["col"],
                "speed": orbital["players"][`${socket.playerCount}`]["speed"]
            }
            revert.speed = globalSettings.speed.normal
            socket.emit("player-movement", revert)
        }, 10000)
        let amountOfPowerUp = playerPowerUpsArr.filter(power => power === "speed").length
        document.querySelector(`.speed-amount`).innerHTML = amountOfPowerUp
    } else if (flamesPressed) {
        //change explosion range.
    } else if (bombsPressed) {
        //drop another bomb.a
    }
    movePlayers()
    socket.emit("player-movement", moving)
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
        document.querySelector(`.player-${playerNum}`).style.top = (playerObj.row * globalSettings.wallHeight) + (globalSettings.wallHeight * 0.1) + "px"
        document.querySelector(`.player-${playerNum}`).style.left = (playerObj.col * globalSettings.wallWidth) + (globalSettings.wallWidth * 0.1) + "px"
    }
}

