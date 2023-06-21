import RJNA from "./rjna/engine.js";

export const chatroom = RJNA.tag.div({ class: "main-app" }, {}, {},
  RJNA.tag.div({ class: "screen join-screen active" }, {}, {},
    RJNA.tag.div({ class: "form" }, {}, {},
      RJNA.tag.h2({}, {}, {}, "Join Chatroom"),
      RJNA.tag.div({ class: "form-input" }, {}, {},
        RJNA.tag.label({}, {}, {}, "Username"),
        RJNA.tag.input({ type: "text", id: "username" }, {}, {}, "Join Chatroom"),
      ),
      RJNA.tag.div({ class: "form-input" }, {}, {},
        RJNA.tag.button({ id: "join-user" }, {}, {}, "Join"),
      )
    )
  ),
  RJNA.tag.div({ class: "screen chat-screen" }, {}, {},
    RJNA.tag.div({ class: "header" }, {}, {},
      RJNA.tag.div({ class: "logo" }, {}, {}, "Chatroom"),
      RJNA.tag.button({ id: "exit-chat" }, {}, {}, "Exit"),

    ),
    RJNA.tag.div({ class: "messages" }, {}, {}),
    RJNA.tag.div({ class: "typebox" }, {}, {},
      RJNA.tag.input({ type: "text", id: "message-input" }, {}, {}),
      RJNA.tag.button({ id: "send-message" }, {}, {}, "Send"),
    )
  )
) 