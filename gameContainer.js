import { hearts, otherLivesContainer } from "./gameState.js";
import RJNA from "./rjna/engine.js";
// -- Live updates of current game events -- //
export const gameUpdatesContainer =
    RJNA.tag.div(
        { class: "game-updates-container" },
        {},
        {},
        RJNA.tag.h3(
            { class: "game-updates-title" },
            {},
            {},
            "GAME UPDATES:",
            RJNA.tag.div(
                { class: "live-updates" },
                {},
                {},
            )
        )
    )
// -- //

// -- Chatroom Container -- //
export const chatroomContainer = RJNA.tag.div(
    { class: "chatroom-container" },
    {},
    {},
    RJNA.tag.h3(
        { class: "chatroom-title" },
        {},
        {},
        "Live Chat:"
    )
)
// -- //

// -- Power Up Container -- //
export const powerUpsContainer = RJNA.tag.div(
    { class: "power-up-container" },
    {},
    {},
    RJNA.tag.h3(
        { class: "power-up-title" },
        {},
        {},
        "💣💣💣"
    )
)
// -- //

const gameTitle = RJNA.tag.h1(
    { class: "game-title" },
    {},
    {}, "💣BOMBERMAN💣");

const gameContainer = RJNA.tag.div(
    { class: "game-container" },
    {},
    {})

export const layoutContainer = () => {
    return RJNA.tag.div(
        { class: "container" },
        {},
        {},
        gameTitle,
        gameContainer,
        hearts(3),
        powerUpsContainer,
        chatroomContainer,
        gameUpdatesContainer,
        otherLivesContainer(3));
}


