import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js";

export function placePowerUp(powerUpObj) {
    return RJNA.tag.div(
        {
            class: `power-up ${powerUpObj["powerUp"]}`, style: {
                top: powerUpObj["powerUpCoords"][0] * globalSettings["power-ups"]["height"] + "px",
                left: powerUpObj["powerUpCoords"][1] * globalSettings["power-ups"]["width"] + "px",
                width: `${globalSettings["power-ups"]["width"]}px`,
                height: `${globalSettings["power-ups"]["height"]}px`,
            },
            // id: `${powerUpObj["powerUpCoords"][0]}${powerUpObj["powerUpCoords"][1]}`
        },
        {},
        {},
        RJNA.tag.img(
            {
                style: {
                    width: "100%",
                    height: "100%",
                }
            },
            {},
            { src: globalSettings["power-ups"][powerUpObj["powerUp"]] })
    )
}

export function placeBomb(moving) {
    return RJNA.tag.div(
        {
            class: `player-${moving["myPlayerNum"]}-bomb`, style: {
                top: Math.round(moving.row) * globalSettings["bomb"]["height"] + "px",
                left: Math.round(moving.col) * globalSettings["bomb"]["width"] + "px",
                width: `${globalSettings["bomb"]["width"]}px`,
                height: `${globalSettings["bomb"]["height"]}px`,
                position:"absolute",
            },
            // id: `${powerUpObj["powerUpCoords"][0]}${powerUpObj["powerUpCoords"][1]}`
        },
        {},
        {},
        RJNA.tag.img(
            {
                style: {
                    width: "100%",
                    height: "100%",
                }
            },
            {},
            { src: globalSettings["bomb"]["src"] })
    )
}

export function placeExplosion(moving) {
    return RJNA.tag.div(
        {
            class: `player-${moving["myPlayerNum"]}-explosion`, style: {
                top: Math.round(moving.row) * globalSettings["bomb"]["height"] + "px",
                left: Math.round(moving.col) * globalSettings["bomb"]["width"] + "px",
                width: `${globalSettings["explosion"]["width"]}px`,
                height: `${globalSettings["explosion"]["height"]}px`,
                position:"absolute",
            },
        },
        {},
        {},
        RJNA.tag.img(
            {
                style: {
                    width: "100%",
                    height: "100%",
                }
            },
            {},
            { src: globalSettings["explosion"]["src"] })
    )
}
// function PowerUp(row, col, name, owner, socket) {
//     this.row = row
//     this.col = col
//     this.name = name
//     this.type = globalSettings["power-ups"]["types"][name]
//     this.owner = owner
//     this.timer = 3000

//     // when player presses a key, activate power-up and send that power up to everyone
//     this.action = function () {

//     }

// }