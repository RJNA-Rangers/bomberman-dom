import { globalSettings } from "./gameSetting.js";
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
        {
            class: "container",
            style: {
                "grid-template-columns": `${globalSettings.gridColumn1}px ${globalSettings.gridColumn2}px ${globalSettings.gridColumn3}px`,
                "grid-template-rows": `60px 60px ${globalSettings.gridFr}px ${globalSettings.gridFr}px 15px`
            }
        },
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


