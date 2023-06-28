import RJNA from "./rjna/engine.js";
import { globalSettings } from "./gameSetting.js";

export const playerCard = (incomingPlayer) => RJNA.tag.div({ class: `player-${incomingPlayer.count}-card` },
  {},
  {},
  RJNA.tag.div({ class: "player-1-card-wrapper" },
    {},
    {},
    RJNA.tag.img({ class: "player-1-cover-image" }, {}, { src: "https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" })
  ),
  RJNA.tag.span({ class: "player-1-card-footer" }, {}, {},
    RJNA.tag.span({}, {}, {}, `${incomingPlayer.username}`),
    RJNA.tag.span()
  ),
  // RJNA.tag.img({ class: "player-1-title" }, {}, { src: "https://ggayane.github.io/css-experiments/cards/dark_rider-title.png" }),
  RJNA.tag.img({ class: "player-1-character" }, {}, { src: "https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp" }),
)

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
  RJNA.tag.h1({ class: "waiting-rooms-title" }, {}, {}, ".Waiting Room"),
  RJNA.tag.div({ class: "countdown" }, {}, {}, "00:00"),
  RJNA.tag.div(
    { class: "waiting-rooms" },
    {},
    {},
    RJNA.tag.div({ class: "screen join-screen active" }, {}, {},
      RJNA.tag.div({ class: "form" }, {}, {},
        RJNA.tag.h2({}, {}, {}, "Join Here"),
        RJNA.tag.div({ class: "form-input" }, {}, {},
          RJNA.tag.label({}, {}, {}, "Username"),
          RJNA.tag.input({ type: "text", id: "username" }, {}, {}, "Join Chatroom"),
        ),
        RJNA.tag.div({ class: "form-input" }, {}, {},
          RJNA.tag.button({ id: "join-user" }, {}, {}, "Join"),
        )
      )
    ),
    RJNA.tag.div({ class: "players-waiting-container" }, {}, {},
      RJNA.tag.h3({ class: "players-waiting-title" }, {}, {}, "Ready!!"),
      // playerCard(1),
      // playerCard(2),
      // playerCard(3),
      // playerCard(4),
    )

  ),
  RJNA.tag.div({ class: "game-info-container" }, {}, {},
    RJNA.tag.h3({ class: "game-info-title" }, {}, {}, "Info"),
    RJNA.tag.div({ class: "game-controls-container" }, {}, {},
      RJNA.tag.h3({ class: "game-controls-title" }, {}, {}, "Controls"),
    ),
    RJNA.tag.div({ class: "game-extras-container" }, {}, {},
      RJNA.tag.h3({ class: "game-extras-title" }, {}, {}, "Extra"),
    )
  )
);


//  <div class="card">
//     <div class="wrapper">
//       <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" class="cover-image" />
//     </div>
//     <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png" class="title" />
//     <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp" class="character" />
//   </div>

{/* <a href="#" class="card">
<img src="https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI0OTY1ODM&ixlib=rb-1.2.1&q=80" alt="balloon with an emoji face" class="card__img">
<span class="card__footer">
  <span>Awesome speedy card</span>
  <span>2 minutes!</span>
</span>
<span class="card__action">
  <svg viewBox="0 0 448 512" title="play">
    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
  </svg>
</span>
</a> */}