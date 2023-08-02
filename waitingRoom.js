import RJNA from "./rjna/engine.js";
import { globalSettings } from "./gameSetting.js";

function imageBackground(number) {
  switch (number) {
    case 1:
      return RJNA.tag.img({ class: "player-1-cover-image" }, {}, { src: "https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" })
    case 2:
      return RJNA.tag.img({ class: "player-1-cover-image" }, {}, { src: "https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" })
    case 3:
      return RJNA.tag.img({ class: "player-1-cover-image" }, {}, { src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/95e10b5f-f014-468c-a760-4bad15ef5d5a/d9o74ca-78920cfa-91c4-4291-afd6-d5326d80eb63.jpg/v1/fill/w_622,h_350,q_70,strp/scarface_by_cautious2music_d9o74ca-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvOTVlMTBiNWYtZjAxNC00NjhjLWE3NjAtNGJhZDE1ZWY1ZDVhXC9kOW83NGNhLTc4OTIwY2ZhLTkxYzQtNDI5MS1hZmQ2LWQ1MzI2ZDgwZWI2My5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.wqnGNAjA82ZxcrOkvycdT3Mfz-gYgXUEklmX680V9cU" })
    case 4:
      return RJNA.tag.img({ class: "player-1-cover-image" }, {}, { src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/006d725f-6449-48f6-bba6-db39bbe5331b/d8sh5e0-7b275d44-72a2-4e28-b5a6-b4ee8fdebb02.jpg/v1/fill/w_622,h_350,q_70,strp/halo_5___team_chief_by_vgwallpapers_d8sh5e0-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvMDA2ZDcyNWYtNjQ0OS00OGY2LWJiYTYtZGIzOWJiZTUzMzFiXC9kOHNoNWUwLTdiMjc1ZDQ0LTcyYTItNGUyOC1iNWE2LWI0ZWU4ZmRlYmIwMi5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.CDRgGUDcI7-YtIg6B-5w2wpa2RVKjU-inWG2WXvUEL8" })
  }
}
function imageAvatar(number) {
  switch (number) {
    case 1:
      return RJNA.tag.img({ class: "player-1-character" }, {}, { src: globalSettings.players.one })
    case 2:
      return RJNA.tag.img({ class: "player-1-character" }, {}, { src: globalSettings.players.ghost })
    case 3:
      return RJNA.tag.img({ class: "player-1-character" }, {}, { src: globalSettings.players.lad })
    case 4:
      return RJNA.tag.img({ class: "player-1-character" }, {}, { src: globalSettings.players.wario })
  }
}

export const playerCard = (incomingPlayer) => RJNA.tag.div({ class: `player-${incomingPlayer.count}-card` },
  {},
  {},
  RJNA.tag.div({ class: "player-1-card-wrapper" },
    {},
    {},
    imageBackground(incomingPlayer.count)
  ),
  RJNA.tag.span({ class: "player-1-card-footer" }, {}, {},
    RJNA.tag.span({}, {}, {}, `${incomingPlayer.username}`),
    RJNA.tag.span()
  ),
  imageAvatar(incomingPlayer.count)
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
          RJNA.tag.input({ type: "text", id: "username" }, {}, { pattern: "^(?=\\s*\\S).{1,6}$", required: true }, "Join Chatroom"),
          RJNA.tag.p({}, {}, {}, "Enter up to 6 Characters")
        ),
        RJNA.tag.div({ class: "form-input" }, {}, {},
          RJNA.tag.button({ id: "join-user" }, {}, {}, "Join"),
        )
      )
    ),
    RJNA.tag.div({ class: "players-waiting-container" }, {}, {},
      RJNA.tag.h3({ class: "players-waiting-title" }, {}, {}, "Ready!!"),
    )

  ),
  RJNA.tag.div({ class: "game-info-container" }, {}, {},
    RJNA.tag.div({ class: "synopsis-info" }, {}, {},
      RJNA.tag.h3({ class: "game-info-title" }, {}, {}, "Welcome to Bomberman"),
      RJNA.tag.p(
        { class: "synopsis-text" },
        {},
        {},
        `Bomberman is an arcade-style game where players control a 
           character who strategically places bombs to eliminate obstacles,
           enemies, and opponents in a maze-like arena.
          `),
      RJNA.tag.p(
        { class: "synopsis-text" },
        {},
        {},
        `Can You Outwit Your Enemies`)
    ),
    RJNA.tag.div({ class: "game-controls-container" }, {}, {},
      RJNA.tag.h3({ class: "game-controls-title" }, {}, {}, "Controls"),
      RJNA.tag.div({ class: "arrow-controls-info" }, {}, {},
        RJNA.tag.img({ class: "arrow-controls-image" }, {}, { src: "./img/arrows.png" }),
        RJNA.tag.p(
          { class: "arrow-controls-text" },
          {},
          {},
          "To move the player character, use the arrow keys on your keyboard:",
          RJNA.tag.br(),
          RJNA.tag.br(),
          RJNA.tag.ul(
            { class: "arrow-controls-list" },
            {},
            {},
            RJNA.tag.li({}, {}, {}, "Press the Left Arrow key to move the player character to the left."),
            RJNA.tag.li({}, {}, {}, "Press the Right Arrow key to move the player character to the right."),
            RJNA.tag.li({}, {}, {}, "Press the Up Arrow key to move the player character upwards."),
            RJNA.tag.li({}, {}, {}, "Press the Down Arrow key to move the player character downwards.")
          )
        )
      ),
      RJNA.tag.div({ class: "bomb-controls-info" }, {}, {},
        RJNA.tag.img({ class: "bomb-controls-image" }, {}, { src: "./img/w.png" }),
        RJNA.tag.p(
          { class: "bomb-controls-text" },
          {},
          {},
          "Press and Release the W key to drop a bomb. Be careful tho, friendly fire is activated.",
        )
      ),
      RJNA.tag.div({ class: "pick-up-controls-info" }, {}, {},
        RJNA.tag.img({ class: "pick-up-controls-image" }, {}, { src: "./img/q.png" }),
        RJNA.tag.p(
          { class: "pick-up-controls-text" },
          {},
          {},
          "Press and Release the Q key to pick up a power-up. But remember you only get up to 3.",
        )
      ),
      RJNA.tag.div({ class: "power-up-controls-info" }, {}, {},
        RJNA.tag.img({ class: "power-up-controls-image" }, {}, { src: "./img/asd.png" }),
        RJNA.tag.p(
          { class: "power-up-controls-text" },
          {},
          {},
          "To use power-ups, use the following keys on your keyboard:",
          RJNA.tag.br(),
          RJNA.tag.br(),
          RJNA.tag.ul(
            { class: "power-up-controls-list" },
            {},
            {},
            RJNA.tag.li({}, {}, {}, "Press and Release the A key to use the flames power-up."),
            RJNA.tag.li({}, {}, {}, "Press and Release the S  key to use the speed power-up."),
            RJNA.tag.li({}, {}, {}, "Press and Release the D key to use bombs power-up.")
          )
        )
      )
    ),
    RJNA.tag.div({ class: "game-extras-container" }, {}, {},
      RJNA.tag.h3({ class: "game-extras-title" }, {}, {}, "Extra"),
      RJNA.tag.div({ class: "synopsis-info" }, {}, {},
        RJNA.tag.p(
          { class: "bombs-text" },
          {},
          {},
          `A 20s countdown will be initiated once 2 or more players join a lobby - 
          during this time more players can join. Once the countdown has ended or the lobby
           is full with 4 players, the game will be start after a further 10s countdown. 
           At this point, there is no going back!`
        )
      ),
      RJNA.tag.div({ class: "speed-info" }, {}, {},
        RJNA.tag.p(
          { class: "speed-text" },
          {},
          {},
          "There are three types of power ups:",
        ),
      ),
      RJNA.tag.div({ class: "speed-info" }, {}, {},
        RJNA.tag.img({ class: "speed-image" }, {}, { src: globalSettings["power-ups"]["speed"] }),
        RJNA.tag.p(
          { class: "speed-text" },
          {},
          {},
          "SPEED",
        ),
        RJNA.tag.p(
          { class: "speed-text" },
          {},
          {},
          "Doubles player movement speed temporarily for 10s",
        )
      ),
      RJNA.tag.div({ class: "flames-info" }, {}, {},
        RJNA.tag.img({ class: "flames-image" }, {}, { src: globalSettings["power-ups"]["flames"] }),
        RJNA.tag.p(
          { class: "flames-text" },
          {},
          {},
          "FLAMES",
        ),
        RJNA.tag.p(
          { class: "flames-text" },
          {},
          {},
          " Increases explosion range from the bomb in four directions by 1 block.",
        )
      ),
      RJNA.tag.div({ class: "bombs-info" }, {}, {},
        RJNA.tag.img({ class: "bombs-image" }, {}, { src: globalSettings["power-ups"]["bombs"] }),
        RJNA.tag.p(
          { class: "bombs-text" },
          {},
          {},
          "BOMBS",
        ),
        RJNA.tag.p(
          { class: "bombs-text" },
          {},
          {},
          " Increases the amount of bombs dropped at a time by 1.",
        )
      ),
      RJNA.tag.div({ class: "speed-info" }, {}, {},
        RJNA.tag.p(
          { class: "speed-text" },
          {},
          {},
          `But to use the flames and the bomb power- ups, you must use this power up before dropping your bomb for its effect to take place. 
        Each of these power-ups, bar speed also have a multiplier effect of 3 levels meaning:`,
          RJNA.tag.br(),
          RJNA.tag.ul(
            { class: "arrow-controls-list" },
            {},
            {},
            RJNA.tag.li({}, {}, {}, "You can increase the range of explosion upto a 4 block radius."),
            RJNA.tag.li({}, {}, {}, "You can increase the number of bombs dropped to 4."),
          )
        ),
      ),
      RJNA.tag.div({ class: "authors-info" }, {}, {},
        RJNA.tag.p(
          { class: "authors-text" },
          {},
          {},
          "This game was created by:"),
        RJNA.tag.div({ class: "authors-list" }, {}, {},
          RJNA.tag.a(
            {
              href: "https://github.com/rsmith-github",
            },
            {},
            {},
            " Remington Smith, "
          ),
          RJNA.tag.a(
            {
              href: "https://github.com/Jasonasante",
            },
            {},
            {},
            " Jason Asante, "
          ),
          RJNA.tag.a({
            href: "https://github.com/nik-don",
          },
            {},
            {},
            " Nikolo Don, "),
          RJNA.tag.a({
            href: "https://github.com/AbdKhan1",
          },
            {},
            {},
            " Abd Al-Raheem Khan,"),
          RJNA.tag.a({
            href: "https://github.com/edluis37",
          },
            {},
            {},
            " Luis Amaya")
        )
      )
    )
  )
);
