import { chatroom } from "./chatroom.js";
import { globalSettings } from "./gameSetting.js";
import { hearts } from "./gameState.js";
import { waitingRoomGrid } from "./waitingRoom.js"
import RJNA from "./rjna/engine.js";
// -- Live updates of current game events -- //
export const gameUpdatesContainer = RJNA.tag.div(
  { class: "game-updates-container" },
  {},
  {},
  RJNA.tag.h3(
    { class: "game-updates-title" },
    {},
    {},
    "GAME UPDATES:"

  ),
  RJNA.tag.div({ class: "live-updates" }, {}, {})
);
// -- //

// -- Chatroom Container -- //
export const chatroomContainer = RJNA.tag.div(
  { class: "chatroom-container" },
  {},
  {},
  // RJNA.tag.h3({ class: "chatroom-title" }, {}, {}, "Live Chat:"),
  chatroom
);
// -- //

//-- Waiting room -- //
export const waitingRoom = RJNA.tag.div(
  {
    class: "waiting-rooms-container",
    style: {
      display: "block"
    },
  },
  {},
  {},
  waitingRoomGrid
);
// -- //

// -- Power Up Container -- //
export const powerUpsContainer = RJNA.tag.div(
  { class: "power-up-container" },
  {},
  {},
  RJNA.tag.h3({ class: "power-up-title" }, {}, {}, "Power-Ups:"),
  RJNA.tag.div({ class: "power-up-speed-icon" }, {}, {},
    RJNA.tag.p({ class: "key" }, {}, {}, "s"),
    RJNA.tag.img({}, {}, { src: globalSettings["power-ups"]["speed"] }),
    RJNA.tag.p({ class: "speed-amount" }, {}, {}, "0"),
  ),
  RJNA.tag.div({ class: "power-up-flames-icon" }, {}, {},
    RJNA.tag.p({ class: "key" }, {}, {}, "a"),
    RJNA.tag.img({}, {}, { src: globalSettings["power-ups"]["flames"] }),
    RJNA.tag.p({ class: "flames-amount" }, {}, {}, "0"),
  ),
  RJNA.tag.div({ class: "power-up-bombs-icon" }, {}, {},
    RJNA.tag.p({ class: "key" }, {}, {}, "d"),
    RJNA.tag.img({}, {}, { src: globalSettings["power-ups"]["bombs"] }),
    RJNA.tag.p({ class: "bombs-amount" }, {}, {}, "0"),
  )

);
// -- //

// -- game title -- //
const gameTitle = RJNA.tag.h1({ class: "game-title" }, {}, {}, "BOMBERMAN");

// -- game container -- //
const gameContainer = RJNA.tag.div({ class: "game-container" }, {}, {});

// -- Congratulations Container -- //
export const congratulationsContainer = RJNA.tag.div(
  { class: "congratulations-container hidden" },
  {},
  {},
);
// -- //

// -- grid layout -- //
export const layoutContainer = () => {
  return RJNA.tag.div(
    {
      class: "container",
      style: {
        "grid-template-columns": `${globalSettings.gridColumn1}px ${globalSettings.gridColumn2}px ${globalSettings.gridColumn3}px`,
        "grid-template-rows": `60px 60px ${globalSettings.gridFr}px ${globalSettings.gridFr}px`,
      },
    },
    {},
    {},
    gameTitle,
    gameContainer,
    hearts(3),
    powerUpsContainer,
    chatroomContainer,
    gameUpdatesContainer,
  );
};
