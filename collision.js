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

// export function whichSideCollision(player, objectDOMRect) {
//     // https://youtu.be/r0sy-Cr6WHY?t=327


//     if /* left of player touches right of obj*/
//         (player.x < objectDOMRect.x + objectDOMRect.width) {
//         return "left"
//     }/* right of player touches left of obj*/
//     else if (player.x + player.width > objectDOMRect.x) {
//         return "right"
//     }/* top of player touches bottom of obj */
//     else if (player.y < objectDOMRect.y + objectDOMRect.height) {
//         return "above"
//     }/* bottom of player touches to of obj*/
//     else if (player.y + player.height > objectDOMRect.y) {
//         return "below"
//     } else {
//         return ""
//     }
// }

// checks if player does not bump into a hard wall
export function checkWallCollision(direction, playerCount, movingSpeed) {
    let hardWalls = document.querySelectorAll('.hard-wall');
    let playerDOMRect = document.querySelector(`.player-${playerCount}`).getBoundingClientRect()
    let newPlayerDOMRect = {
        x: playerDOMRect.x,
        y: playerDOMRect.y,
        width: playerDOMRect.width,
        height: playerDOMRect.height
    }
    switch (direction) {
        case "left":
            newPlayerDOMRect.x -= (movingSpeed * globalSettings.wallWidth) + (globalSettings.wallWidth * 0.2)
            break
        case "right":
            newPlayerDOMRect.x += (movingSpeed * globalSettings.wallWidth) + (globalSettings.wallWidth * 0.2)
            break
        case "up":
            newPlayerDOMRect.y -= (movingSpeed * globalSettings.wallHeight) + (globalSettings.wallHeight * 0.2)
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

// export function touchingPowerUp(playerCount, movingObj) {
//     let powerUps = document.querySelectorAll('.power-up');
//     let playerDOMRect = document.querySelector(`.player-${playerCount}`).getBoundingClientRect()

//     for (let i = 0; i < powerUps.length; i++) {
//         let powerUpDOMRect = powerUps[i].getBoundingClientRect();
//         console.log(whichSideCollision(playerDOMRect, powerUpDOMRect))
//         switch (whichSideCollision(playerDOMRect, powerUpDOMRect)) {
//             case "left":
//                 return [orbital.cells[Math.floor(movingObj.row)][Math.floor(movingObj.col)],[Math.floor(movingObj.row),Math.floor(movingObj.col)]]
//             case "right":
//                 return [orbital.cells[Math.floor(movingObj.row)][Math.floor(movingObj.col+1)],[Math.floor(movingObj.row),movingObj.col+1]]
//             case "above":
//                 return [orbital.cells[Math.floor(movingObj.row)][Math.floor(movingObj.col)],[Math.floor(movingObj.row),Math.floor(movingObj.col)]]
//             case "below":
//                 return [orbital.cells[Math.floor(movingObj.row+1)][Math.floor(movingObj.col)],[Math.floor(movingObj.row+1),Math.floor(movingObj.col)]]
//             default:
//                 continue
//         }
//     }
// }