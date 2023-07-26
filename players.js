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

export function PlayerMovement(socket) {
  const moving = {
    myPlayerNum: socket.playerCount,
    row: orbital["players"][`${socket.playerCount}`]["row"],
    col: orbital["players"][`${socket.playerCount}`]["col"],
    speed: orbital["players"][`${socket.playerCount}`]["speed"] || 0.05,
    flames: orbital["players"][`${socket.playerCount}`]["flames"] || 3,
    bombs: orbital["players"][`${socket.playerCount}`]["bombs"] || 1,
  };
  let playerPowerUpsArr = orbital["players"][moving.myPlayerNum]["power-ups"];

  //drop player's bomb when they press 'w'
  if (bombDropped) {
    falseKeyBool("bombs-dropped");
    //send to everyone bomb has been dropped
    socket.emit("drop-bomb", moving);
    for (let i = 1; i <= Object.keys(orbital.players).length; i++) {
      let explosionTouchedObj = touchExplosion(
        moving["myPlayerNum"],
        i,
        moving
      );
      if (explosionTouchedObj == undefined) continue;
      console.log(explosionTouchedObj);
      let playerNumber = parseInt(
        explosionTouchedObj.playerKilled.split("-")[1]
      );
      let playerOrbital = JSON.parse(JSON.stringify(orbital["players"][`${playerNumber}`]));
      //reduce their live count from orbital
      playerOrbital.lives > 0
        ? (playerOrbital.lives -= 1)
        : (playerOrbital.lives = 0);
      //reset player position's to corners
      switch (playerNumber) {
        case 1:
          playerOrbital.myPlayerNum = playerNumber;
          playerOrbital.row = 1;
          playerOrbital.col = 1;
          playerOrbital.immune = true;
          movePlayers();
          socket.emit("player-movement", playerOrbital);
          break;
        case 2:
          playerOrbital.myPlayerNum = playerNumber;
          playerOrbital.row = 1;
          playerOrbital.col = 13;
          playerOrbital.immune = true;
          movePlayers();
          socket.emit("player-movement", playerOrbital);
          break;
        case 3:
          playerOrbital.myPlayerNum = playerNumber;
          playerOrbital.row = 11;
          playerOrbital.col = 13;
          playerOrbital.immune = true;
          movePlayers();
          socket.emit("player-movement", playerOrbital);
          break;
        case 4:
          playerOrbital.myPlayerNum = playerNumber;
          playerOrbital.row = 11;
          playerOrbital.col = 1;
          playerOrbital.immune = true;
          movePlayers();
          socket.emit("player-movement", playerOrbital);
          break;
      }
    }
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
  } else if (pickUp) {
    falseKeyBool("pick-up");
    // console.log(touchPowerUp(socket.playerCount, moving))
    if (playerPowerUpsArr.length < 3) {
      let powerUpObj = touchPowerUp(socket.playerCount, moving);
      if (powerUpObj != undefined) playerPowerUpsArr.push(powerUpObj.powerUp);
      let amountOfPowerUp = playerPowerUpsArr.filter(
        (power) => power === powerUpObj.powerUp
      ).length;
      document.querySelector(`.${powerUpObj.powerUp}-amount`).innerHTML =
        amountOfPowerUp;
      socket.emit("power-picked-up", powerUpObj);
    }
  } else if (speedPressed) {
    falseKeyBool("speed-pressed");
    if (
      playerPowerUpsArr.indexOf("speed") !== -1 &&
      moving.speed == globalSettings.speed.normal
    ) {
      moving.speed = globalSettings.speed.fast;
      playerPowerUpsArr.splice(playerPowerUpsArr.indexOf("speed"), 1);
      setTimeout(() => {
        const revert = {
          myPlayerNum: socket.playerCount,
          row: orbital["players"][`${socket.playerCount}`]["row"],
          col: orbital["players"][`${socket.playerCount}`]["col"],
          speed: orbital["players"][`${socket.playerCount}`]["speed"],
        };
        revert.speed = globalSettings.speed.normal;
        socket.emit("player-movement", revert);
      }, 10000);
      let amountOfPowerUp = playerPowerUpsArr.filter(
        (power) => power === "speed"
      ).length;
      document.querySelector(`.speed-amount`).innerHTML = amountOfPowerUp;
    }
  } else if (flamesPressed) {
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
      document.querySelector(`.speed-amount`).innerHTML = amountOfPowerUp;
    }
  } else if (bombsPressed) {
    falseKeyBool("bombs-pressed");
    if (playerPowerUpsArr.indexOf("bombs") !== -1) {
      if (moving.bombs === globalSettings.bombs.normal) {
        moving.bombs = globalSettings.bombs.pickUp1;
      } else if (moving.bombs === globalSettings.bombs.pickUp1) {
        moving.bombs = globalSettings.bombs.pickUp2;
      } else if (moving.bombs === globalSettings.bombs.pickUp2) {
        moving.bombs = globalSettings.bombs.pickUp3;
      }
      playerPowerUpsArr.splice(playerPowerUpsArr.indexOf("bombs"), 1);
      let amountOfPowerUp = playerPowerUpsArr.filter(
        (power) => power === "bombs"
      ).length;
      document.querySelector(`.speed-amount`).innerHTML = amountOfPowerUp;
    }
  }
  movePlayers();
  socket.emit("player-movement", moving);
}

function isPowerUp(row, col) {
  if (
    orbital.cells[Math.floor(row)][Math.floor(col)] ==
      globalSettings["power-ups"]["types"]["speed"] ||
    orbital.cells[Math.floor(row)][Math.floor(col)] ==
      globalSettings["power-ups"]["types"]["flames"] ||
    orbital.cells[Math.floor(row)][Math.floor(col)] ==
      globalSettings["power-ups"]["types"]["bombs"]
  ) {
    return true;
  }
  return false;
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
