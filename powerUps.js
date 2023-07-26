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