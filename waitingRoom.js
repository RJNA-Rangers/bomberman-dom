import RJNA from "./rjna/engine.js";
import { globalSettings } from "./gameSetting.js";
export const waitingRoomGrid = RJNA.tag.div(
  {
    class: "waiting-rooms-grid",
    style: {
      "grid-template-columns": `${globalSettings.gridColumn1}px ${globalSettings.gridColumn2}px ${globalSettings.gridColumn3}px`,
      "grid-template-rows": `60px 60px ${globalSettings.gridFr}px ${globalSettings.gridFr}px`,
    },
  },
  {},
  {},
  RJNA.tag.h1({ class: "waiting-rooms-title" }, {}, {}, "Waiting Room"),
  RJNA.tag.div({ class: "countdown" }, {}, {}, "00:00"),
  RJNA.tag.div(
    { class: "waiting-rooms" },
    {},
    {},
    RJNA.tag.div({ class: "user-name" }, {}, {},
    ),
    RJNA.tag.div({ class: "room-1" }, {}, {}),
    RJNA.tag.div({ class: "room-2" }, {}, {}),
    RJNA.tag.div({ class: "room-3" }, {}, {}),
    RJNA.tag.div({ class: "room-4" }, {}, {})
  )
);
