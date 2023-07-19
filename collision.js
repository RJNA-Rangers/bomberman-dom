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

    for (let i = 0; i < hardWalls.length; i++) {
        let wallDOMRect = hardWalls[i].getBoundingClientRect();
        if (checkCollision(newPlayerDOMRect, wallDOMRect)) {
            // Collision detected with a wall
            return true;
        }
    }

    // No collision with any walls
    return false;
}