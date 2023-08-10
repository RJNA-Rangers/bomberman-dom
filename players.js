import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js";
import {
  leftPressed,
  rightPressed,
  upPressed,
  downPressed,
  pickUp,
  speedPressed,
  flamesPressed,
  bombsPressed,
  falseKeyBool,
  bombDropped,
} from "./input.js";
import {
  checkWallCollision,
  touchPowerUp,
  touchExplosion
} from "./collision.js";

export function placePlayer(number, character, username) {
  let topPosition =
    orbital["players"][`${number}`]["row"] * globalSettings.wallHeight +
    globalSettings.wallHeight * 0.1;
  let leftPosition =
    orbital["players"][`${number}`]["col"] * globalSettings.wallWidth +
    globalSettings.wallWidth * 0.1;
  return RJNA.tag.div(
    {
      class: `player-${number}`,
      style: {
        top: topPosition + "px",
        left: leftPosition + "px",
        width: `${globalSettings.players.width}px`,
        height: `${globalSettings.players.height}px`,
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
        },
      },
      {},
      { src: globalSettings.players[character] }
    )
  );
}
let isTouchingExplosion = false
export function PlayerMovement(socket) {
  let moving = {
    myPlayerNum: socket.playerCount,
    row: orbital["players"][`${socket.playerCount}`]["row"],
    col: orbital["players"][`${socket.playerCount}`]["col"],
    speed: orbital["players"][`${socket.playerCount}`]["speed"] || globalSettings.speed.normal,
    flames: orbital["players"][`${socket.playerCount}`]["flames"] || globalSettings.flames.normal,
    bombs: orbital["players"][`${socket.playerCount}`]["bombs"] || globalSettings.bombs.normal,
  };
  let playerPowerUpsArr = orbital["players"][moving.myPlayerNum]["power-ups"];
  //drop player's bomb when they press 'w'
  if (bombDropped) {
    falseKeyBool("bombs-dropped");
    //send to everyone bomb has been dropped
    socket.emit("drop-bomb", moving);
    moving.flames = globalSettings.flames.normal
  }
  // move when the button is pressed and the next block is empty
  if (
    leftPressed &&
    !checkWallCollision("left", socket.playerCount, moving.speed)
  ) {
    moving.col = parseFloat((moving.col - moving.speed).toFixed(2));
  } else if (
    rightPressed &&
    !checkWallCollision("right", socket.playerCount, moving.speed)
  ) {
    moving.col = parseFloat((moving.col + moving.speed).toFixed(2));
  } else if (
    upPressed &&
    !checkWallCollision("up", socket.playerCount, moving.speed)
  ) {
    moving.row = parseFloat((moving.row - moving.speed).toFixed(2));
  } else if (
    downPressed &&
    !checkWallCollision("down", socket.playerCount, moving.speed)
  ) {
    moving.row = parseFloat((moving.row + moving.speed).toFixed(2));
  }
  if (pickUp) {
    falseKeyBool("pick-up");
    if (playerPowerUpsArr.length < 3) {
      let powerUpObj = touchPowerUp(socket.playerCount, moving);
      if (powerUpObj !== undefined) {
        playerPowerUpsArr.push(powerUpObj.powerUp);
        let amountOfPowerUp = playerPowerUpsArr.filter(
          (power) => power === powerUpObj.powerUp
        ).length;
        document.querySelector(`.${powerUpObj.powerUp}-amount`).innerHTML =
          amountOfPowerUp;
        socket.emit("power-picked-up", powerUpObj);
      }
    }
  }

  if (speedPressed) {
    falseKeyBool("speed-pressed");
    if (
      playerPowerUpsArr.indexOf("speed") !== -1
    ) {
      moving.speed = globalSettings.speed.fast;
      playerPowerUpsArr.splice(playerPowerUpsArr.indexOf("speed"), 1);
      setTimeout(() => {
        const revert = {
          myPlayerNum: socket.playerCount,
          speed: globalSettings.speed.normal,
        };
        socket.emit("player-movement", revert);
      }, 10000);
      let amountOfPowerUp = playerPowerUpsArr.filter(
        (power) => power === "speed"
      ).length;
      document.querySelector(`.speed-amount`).innerHTML = amountOfPowerUp;
    }
  }
  if (flamesPressed) {
    falseKeyBool("flames-pressed");
    if (playerPowerUpsArr.indexOf("flames") !== -1) {
      if (moving.flames === globalSettings.flames.normal) {
        moving.flames = globalSettings.flames.pickUp1;
      } else if (moving.flames === globalSettings.flames.pickUp1) {
        moving.flames = globalSettings.flames.pickUp2;
      } else if (moving.flames === globalSettings.flames.pickUp2) {
        moving.flames = globalSettings.flames.pickUp3;
      }
      playerPowerUpsArr.splice(playerPowerUpsArr.indexOf("flames"), 1);
      let amountOfPowerUp = playerPowerUpsArr.filter(
        (power) => power === "flames"
      ).length;
      document.querySelector(`.flames-amount`).innerHTML = amountOfPowerUp;
    }
  }

  if (bombsPressed) {
    falseKeyBool("bombs-pressed");
    if (playerPowerUpsArr.indexOf("bombs") !== -1) {
      orbital["players"][moving["myPlayerNum"]]["numOfBombs"]++
      playerPowerUpsArr.splice(playerPowerUpsArr.indexOf("bombs"), 1);
      let amountOfPowerUp = playerPowerUpsArr.filter(
        (power) => power === "bombs"
      ).length;
      document.querySelector(`.bombs-amount`).innerHTML = amountOfPowerUp;
    }
  }
  const touchingExplosion = touchExplosion(moving);
  // Check if touchExplosion is true and the event hasn't been emitted yet
  if (touchingExplosion && !isTouchingExplosion && !orbital["players"][`${touchingExplosion.playerKilled}`].immune) {
    // Set the flag to true to prevent further requests
    isTouchingExplosion = true;

    // Emit the "player-killed" event
    socket.emit("player-killed", touchingExplosion);

    setTimeout(() => {
      isTouchingExplosion = false;
    }, 67);

    moving = resetMovingCoords(moving.myPlayerNum);
    movePlayers();
    socket.emit("player-movement", moving);
  } else {
    // If not touching explosion, continue with normal movement
    movePlayers();
    socket.emit("player-movement", moving);
  }
}

export function movePlayers() {
  for (let [playerNum, playerObj] of Object.entries(orbital.players)) {
    document.querySelector(`.player-${playerNum}`).style.top =
      playerObj.row * globalSettings.wallHeight +
      globalSettings.wallHeight * 0.1 +
      "px";
    document.querySelector(`.player-${playerNum}`).style.left =
      playerObj.col * globalSettings.wallWidth +
      globalSettings.wallWidth * 0.1 +
      "px";
  }
}

export const debounce = (func, wait) => {
  let debounceTimer
  return function (eve) {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(context, args), wait)
    return debounceTimer
  }
}

function resetMovingCoords(count) {
  let moving = {
    myPlayerNum: count,
    speed: globalSettings.speed.normal,
    flames: globalSettings.flames.normal,
    bombs: globalSettings.bombs.normal,
    immune: true
  }
  switch (count) {
    case 1:
      moving.row = 1;
      moving.col = 1;
      break;
    case 2:
      moving.row = 1;
      moving.col = 13;
      break;
    case 3:
      moving.row = 11;
      moving.col = 13;
      break;
    case 4:
      moving.row = 11;
      moving.col = 1;
      break;
  }
  return moving
}
