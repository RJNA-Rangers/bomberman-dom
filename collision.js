import { globalSettings } from "./gameSetting.js";
import { createNode } from "./rjna/engine.js";
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
  let hardWalls = document.querySelectorAll(".hard-wall");
  let softWalls = document.querySelectorAll(".soft-wall");
  let allBombs = document.querySelectorAll(".bomb");
  let allWallsAndBombs = [...hardWalls, ...softWalls, ...allBombs];
  let playerDOMRect = document
    .querySelector(`.player-${playerCount}`)
    .getBoundingClientRect();
  let newPlayerDOMRect = {
    x: playerDOMRect.x + globalSettings.players.width * 0.4,
    y: playerDOMRect.y + globalSettings.players.height * 0.2,
    width: playerDOMRect.width * 0.2,
    height: playerDOMRect.height - (globalSettings.players.height * 0.4),
  };
  switch (direction) {
    case "left":
      newPlayerDOMRect.x -=
        movingSpeed * globalSettings.wallWidth + globalSettings.wallWidth * 0.1;
      break;
    case "right":
      newPlayerDOMRect.x +=
        movingSpeed * globalSettings.wallWidth + globalSettings.wallWidth * 0.1;
      break;
    case "up":
      newPlayerDOMRect.y -=
        movingSpeed * globalSettings.wallHeight +
        globalSettings.wallHeight * 0.1;
      break;
    case "down":
      newPlayerDOMRect.y +=
        movingSpeed * globalSettings.wallHeight +
        globalSettings.wallHeight * 0.1;
      break;
  }

  for (let i = 0; i < allWallsAndBombs.length; i++) {
    let wallDOMRect = allWallsAndBombs[i].getBoundingClientRect();
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
    case playerDOMRect.y + playerDOMRect.height >
      objectDOMRect.y + objectDOMRect.height &&
      playerDOMRect.x + playerDOMRect.width >=
      objectDOMRect.x + objectDOMRect.width:
      return "bottom-right";

    //top right corner of object
    case playerDOMRect.y < objectDOMRect.y &&
      playerDOMRect.x + playerDOMRect.width >=
      objectDOMRect.x + objectDOMRect.width:
      return "top-right";

    //bottom left corner of object
    case playerDOMRect.y + playerDOMRect.height >
      objectDOMRect.y + objectDOMRect.height &&
      playerDOMRect.x < objectDOMRect.x:
      return "bottom-left";

    //top left corner of object
    case playerDOMRect.y < objectDOMRect.y && playerDOMRect.x < objectDOMRect.x:
      return "top-left";

    // //bottom of the object
    case playerDOMRect.y + playerDOMRect.height >
      objectDOMRect.y + objectDOMRect.height:
      return "bottom";

    //top of object
    case playerDOMRect.y < objectDOMRect.y:
      return "top";

    // left-side of the object
    case playerDOMRect.x < objectDOMRect.x:
      return "left";

    // right-side of the object
    case playerDOMRect.x + playerDOMRect.width >
      objectDOMRect.x + objectDOMRect.width:
      return "right";
  }
}

export function touchPowerUp(count, moving) {
  const player = document
    .querySelector(`.player-${count}`)
    .getBoundingClientRect();
  const powerUps = document.querySelectorAll(".power-up");

  for (let i = 0; i < powerUps.length; i++) {
    let powerUpRect = powerUps[i].getBoundingClientRect();
    if (checkCollision(player, powerUpRect)) {
      // Collision detected with a power-up
      switch (whichSideCollision(player, powerUpRect)) {
        case "bottom-right":
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.floor(moving.row), Math.floor(moving.col)],
          };
        case "top-right":
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.ceil(moving.row), Math.floor(moving.col)],
          };
        case "bottom-left":
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.floor(moving.row), Math.ceil(moving.col)],
          };
        case "top-left":
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.ceil(moving.row), Math.ceil(moving.col)],
          };
        case "bottom":
          if (moving.col >= Math.floor(moving.col) + 0.8) {
            return {
              powerUp: powerUps[i].classList[1],
              powerUpCoords: [Math.floor(moving.row), Math.ceil(moving.col)],
            };
          }
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.floor(moving.row), Math.floor(moving.col)],
          };
        case "top":
          if (moving.col >= Math.floor(moving.col) + 0.8) {
            return {
              powerUp: powerUps[i].classList[1],
              powerUpCoords: [Math.ceil(moving.row), Math.ceil(moving.col)],
            };
          }
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.ceil(moving.row), Math.floor(moving.col)],
          };
        case "left":
          if (moving.row >= Math.floor(moving.row) + 0.8) {
            return {
              powerUp: powerUps[i].classList[1],
              powerUpCoords: [Math.ceil(moving.row), Math.ceil(moving.col)],
            };
          }
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.floor(moving.row), Math.ceil(moving.col)],
          };
        case "right":
          if (moving.row >= Math.floor(moving.row) + 0.8) {
            return {
              powerUp: powerUps[i].classList[1],
              powerUpCoords: [Math.ceil(moving.row), Math.floor(moving.col)],
            };
          }
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.floor(moving.row), Math.floor(moving.col)],
          };
        default:
          return {
            powerUp: powerUps[i].classList[1],
            powerUpCoords: [Math.floor(moving.row), Math.ceil(moving.col)],
          };
      }
    }
  }
}

export function touchExplosion(moving) {
  const player = document.querySelector(`.player-${moving["myPlayerNum"]}`).getBoundingClientRect();
  const explosionImage = document.querySelectorAll(
    `.explosion`
  );
  //bomb cannot touch player if they are immune
  if (
    orbital["players"][`${moving["myPlayerNum"]}`].hasOwnProperty("immune") &&
    orbital["players"][`${moving["myPlayerNum"]}`].immune
  ) return undefined;
  for (let i = 0; i < explosionImage.length; i++) {
    let explosionImageRect = explosionImage[i].getBoundingClientRect();
    if (checkCollision(player, explosionImageRect)) {
      // Collision detected with a power-up
      switch (whichSideCollision(player, explosionImageRect)) {
        case "bottom-right":
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [
              Math.floor(moving.row),
              Math.floor(moving.col),
            ],
          };
        case "top-right":
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [Math.ceil(moving.row), Math.floor(moving.col)],
          };
        case "bottom-left":
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [Math.floor(moving.row), Math.ceil(moving.col)],
          };
        case "top-left":
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [Math.ceil(moving.row), Math.ceil(moving.col)],
          };
        case "bottom":
          if (moving.col >= Math.floor(moving.col) + 0.8) {
            return {
              bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
              playerKilled: `${moving["myPlayerNum"]}`,
              playerKilledCoords: [
                Math.floor(moving.row),
                Math.ceil(moving.col),
              ],
            };
          }
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [
              Math.floor(moving.row),
              Math.floor(moving.col),
            ],
          };
        case "top":
          if (moving.col >= Math.floor(moving.col) + 0.8) {
            return {
              bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
              playerKilled: `${moving["myPlayerNum"]}`,
              playerKilledCoords: [
                Math.ceil(moving.row),
                Math.ceil(moving.col),
              ],
            };
          }
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [Math.ceil(moving.row), Math.floor(moving.col)],
          };
        case "left":
          if (moving.row >= Math.floor(moving.row) + 0.8) {
            return {
              bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
              playerKilled: `${moving["myPlayerNum"]}`,
              playerKilledCoords: [
                Math.ceil(moving.row),
                Math.ceil(moving.col),
              ],
            };
          }
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [Math.floor(moving.row), Math.ceil(moving.col)],
          };
        case "right":
          if (moving.row >= Math.floor(moving.row) + 0.8) {
            return {
              bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
              playerKilled: `${moving["myPlayerNum"]}`,
              playerKilledCoords: [
                Math.ceil(moving.row),
                Math.floor(moving.col),
              ],
            };
          }
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [
              Math.floor(moving.row),
              Math.floor(moving.col),
            ],
          };
        default:
          return {
            bomber: parseInt(explosionImage[i].classList.item(0).replace(/\D/g, "")),
            playerKilled: `${moving["myPlayerNum"]}`,
            playerKilledCoords: [Math.floor(moving.row), Math.ceil(moving.col)],
          };
      }
    }
  }
}

export function removeFromCellsAndDom(row, col, querySelectorStatement) {
  orbital.cells[row][col] = null;
  const removeDomEle = Array.from(
    //.soft-wall
    document.querySelectorAll(`.${querySelectorStatement}`)
  ).filter((ele) => {
    //if the co-ord has a decimal places then make it to 2dp.
    let eleTopDp = Math.pow(10, 0);
    if (ele.style.top.includes(".")) {
      eleTopDp = Math.pow(10, ele.style.top.split(".")[1].length - 2);
    }
    let eleLeftDp = Math.pow(10, 0);
    if (ele.style.left.includes(".")) {
      eleLeftDp = Math.pow(10, ele.style.left.split(".")[1].length - 2);
    }
    let top =
      Math.round(row * globalSettings["wallHeight"] * eleTopDp) / eleTopDp;
    let left =
      Math.round(col * globalSettings["wallWidth"] * eleLeftDp) / eleLeftDp;
    return (
      Math.round(parseFloat(ele.style.top) * eleTopDp) / eleTopDp === top &&
      Math.round(parseFloat(ele.style.left) * eleLeftDp) / eleLeftDp === left
    );
  });
  while (removeDomEle.length > 0) {
    removeDomEle.shift().remove();
  }
}

// Function to handle explosion propagation in a specific direction
export function propagateExplosion(rowChange, colChange, moving) {
  let tmpMovingObj = JSON.parse(JSON.stringify(moving));
  let gameWrapper = document.querySelector(".game-wrapper");
  for (let r = 0; r < moving.flames; r++) {
    tmpMovingObj.row = Math.round(tmpMovingObj.row);
    tmpMovingObj.col = Math.round(tmpMovingObj.col);
    tmpMovingObj.row += rowChange;
    tmpMovingObj.col += colChange;

    // Check if the cell is a wall
    // Stop the explosion if it is
    if (
      orbital.cells[tmpMovingObj.row][tmpMovingObj.col] ===
      globalSettings.wallTypes.wall
    )
      break;

    // Check if the cell is a soft wall
    if (
      orbital.cells[tmpMovingObj.row][tmpMovingObj.col] ===
      globalSettings.wallTypes.softWall
    ) {
      //destroy the soft wall
      removeFromCellsAndDom(tmpMovingObj.row, tmpMovingObj.col, "soft-walls");
      break;
    }
    // If the cell is not a wall place the explosion at the current position
    gameWrapper.appendChild(createNode(placeExplosion(tmpMovingObj)));
  }
}

export async function placeBombAndExplode(moving) {
  return new Promise((res) => {
    let bombElement = createNode(placeBomb(moving));
    let gameWrapper = document.querySelector(".game-wrapper");
    gameWrapper.appendChild(bombElement);
    setTimeout(() => {
      bombElement.classList.replace(
        `player-${moving["myPlayerNum"]}-bomb`,
        `player-${moving["myPlayerNum"]}-explosion`
      );
      bombElement.children[0].src = globalSettings.explosion.src;
      // Propagate explosion in all four directions
      propagateExplosion(0, 1, moving); // Right
      propagateExplosion(0, -1, moving); // Left
      propagateExplosion(1, 0, moving); // Down
      propagateExplosion(-1, 0, moving); // Up
    }, 2000);
    setTimeout(() => {
      res(moving);
    }, 2500);
  });
}

// //check if player touched an explosion
// export function killPlayersInExplosion(moving, socket) {
//   for (let i = 1; i <= Object.keys(orbital.players).length; i++) {
//     let explosionTouchedObj = touchExplosion(moving["myPlayerNum"], i, moving);
//     if (explosionTouchedObj == undefined) continue;
//     let playerNumber = parseInt(explosionTouchedObj.playerKilled.split("-")[1]);
//     let playerOrbital = orbital["players"][`${playerNumber}`];
//     //reduce their live count from orbital
//     playerOrbital.lives > 0 ? (playerOrbital.lives -= 1) : playerOrbital.lives = 0;
//     //reset player position's to corners
//     switch (playerNumber) {
//       case 1:
//         playerOrbital.myPlayerNum = playerNumber
//         playerOrbital.row = 1;
//         playerOrbital.col = 1;
//         playerOrbital.immune = true;
//         movePlayers();
//         socket.emit("player-movement", playerOrbital);
//         break;
//       case 2:
//         playerOrbital.myPlayerNum = playerNumber
//         playerOrbital.row = 1;
//         playerOrbital.col = 13;
//         playerOrbital.immune = true;
//         movePlayers();
//         socket.emit("player-movement", playerOrbital);
//         break;
//       case 3:
//         playerOrbital.myPlayerNum = playerNumber
//         playerOrbital.row = 11;
//         playerOrbital.col = 13;
//         playerOrbital.immune = true;
//         movePlayers();
//         socket.emit("player-movement", playerOrbital);
//         break;
//       case 4:
//         playerOrbital.myPlayerNum = playerNumber
//         playerOrbital.row = 11;
//         playerOrbital.col = 1;
//         playerOrbital.immune = true;
//         movePlayers();
//         socket.emit("player-movement", playerOrbital);
//         break;
//     }
//   }
//   setTimeout(() => {
//     Array.from(
//       document.querySelectorAll(`.player-${moving["myPlayerNum"]}-explosion`)
//     ).forEach((el) => el.remove());
//   }, 1000);
// }
