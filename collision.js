import { globalSettings } from "./gameSetting.js";
export function checkCollision(player, objectDOMRect) {
    // https://youtu.be/r0sy-Cr6WHY?t=327
    if (
        // left of player touches right of obj
        player.x >= objectDOMRect.x + objectDOMRect.width ||
        // right of player touches left of obj
        player.x + player.width <= objectDOMRect.x ||
        // top of player touches bottom of obj
        player.y >= objectDOMRect.y + objectDOMRect.height ||
        // bottom of player touches to of obj
        player.y + player.height <= objectDOMRect.y
    ) {
        // no collision
        return false;
    } else {

        return true;
    }
}

// checks if player does not bump into a hard wall
export function checkWallCollision(direction, playerCount, movingSpeed) {
    let hardWalls = document.querySelectorAll('.hard-wall');
    let softWalls = document.querySelectorAll('.soft-wall');
    let allWalls = [...hardWalls, ...softWalls];
    let playerDOMRect = document.querySelector(`.player-${playerCount}`).getBoundingClientRect()
    let newPlayerDOMRect = {
        x: playerDOMRect.x + (globalSettings.players.width * 0.4),
        y: playerDOMRect.y + (globalSettings.players.height * 0.2),
        width: playerDOMRect.width - (globalSettings.players.width * 0.4),
        height: playerDOMRect.height - (globalSettings.players.height * 0.4)
    }
    switch (direction) {
        case "left":
            newPlayerDOMRect.x -= (movingSpeed * globalSettings.wallWidth) + (globalSettings.wallWidth * 0.1)
            break
        case "right":
            newPlayerDOMRect.x += (movingSpeed * globalSettings.wallWidth) + (globalSettings.wallWidth * 0.1)
            break
        case "up":
            newPlayerDOMRect.y -= (movingSpeed * globalSettings.wallHeight) + (globalSettings.wallHeight * 0.1)
            break
        case "down":
            newPlayerDOMRect.y += (movingSpeed * globalSettings.wallHeight) + (globalSettings.wallHeight * 0.2)
            break

    }

    for (let i = 0; i < allWalls.length; i++) {
        let wallDOMRect = allWalls[i].getBoundingClientRect();
        if (checkCollision(newPlayerDOMRect, wallDOMRect)) {
            // Collision detected with a wall
            return true;
        }
    }

    // No collision with any walls
    return false;
}

export function whichSideCollision(playerDOMRect, objectDOMRect) {

    switch (true) {
        //bottom right corner of object
        case playerDOMRect.y + playerDOMRect.height > objectDOMRect.y + objectDOMRect.height &&
            playerDOMRect.x + playerDOMRect.width >= objectDOMRect.x + objectDOMRect.width:
            return "bottom-right";

        //top right corner of object
        case playerDOMRect.y < objectDOMRect.y && playerDOMRect.x + playerDOMRect.width >= objectDOMRect.x + objectDOMRect.width:
            return "top-right";

        //bottom left corner of object
        case playerDOMRect.y + playerDOMRect.height > objectDOMRect.y + objectDOMRect.height && playerDOMRect.x < objectDOMRect.x:
            return "bottom-left";

        //top left corner of object
        case playerDOMRect.y < objectDOMRect.y && playerDOMRect.x < objectDOMRect.x:
            return "top-left";

        // //bottom of the object
        case playerDOMRect.y + playerDOMRect.height > objectDOMRect.y + objectDOMRect.height:
            return "bottom";

        //top of object
        case playerDOMRect.y < objectDOMRect.y:
            return "top";

        // left-side of the object
        case playerDOMRect.x < objectDOMRect.x:
            return "left";

        // right-side of the object
        case playerDOMRect.x + playerDOMRect.width > objectDOMRect.x + objectDOMRect.width:
            return "right";
    }
}

export function touchPowerUp(count, moving) {
    const player = document.querySelector(`.player-${count}`).getBoundingClientRect()
    const powerUps = document.querySelectorAll(".power-up")

    for (let i = 0; i < powerUps.length; i++) {
        let powerUpRect = powerUps[i].getBoundingClientRect();
        if (checkCollision(player, powerUpRect)) {
            // Collision detected with a power-up
            console.log("it is touching a powerUp", moving)
            switch (whichSideCollision(player, powerUpRect)) {
                case "bottom-right":
                    console.log("bottom-right")
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.floor(moving.row), Math.floor(moving.col)] }
                case "top-right":
                    console.log("top-right")
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.ceil(moving.row), Math.floor(moving.col)] }
                case "bottom-left":
                    console.log("bottom-left")
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.floor(moving.row), Math.ceil(moving.col)] }
                case "top-left":
                    console.log("top-left")
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.ceil(moving.row), Math.ceil(moving.col)] }
                case "bottom":
                    console.log("bottom")
                    if (moving.col >= Math.floor(moving.col) + 0.8) {
                        return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.floor(moving.row), Math.ceil(moving.col)] }
                    }
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.floor(moving.row), Math.floor(moving.col)] }
                case "top":
                    console.log("top")
                    if (moving.col >= Math.floor(moving.col) + 0.8) {
                        return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.ceil(moving.row), Math.ceil(moving.col)] }
                    }
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.ceil(moving.row), Math.floor(moving.col)] }
                case "left":
                    console.log("left")
                    if (moving.row >= Math.floor(moving.row) + 0.8) {
                        return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.ceil(moving.row), Math.ceil(moving.col)] }
                    }
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.floor(moving.row), Math.ceil(moving.col)] }
                case "right":
                    console.log("right")
                    if (moving.row >= Math.floor(moving.row) + 0.8) {
                        return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.ceil(moving.row), Math.floor(moving.col)] }
                    }
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.floor(moving.row), Math.floor(moving.col)] }
                default:
                    console.log("default")
                    return { "powerUp": powerUps[i].classList[1], "powerUpCoords": [Math.floor(moving.row), Math.ceil(moving.col)] }
            }
        }
    }

}