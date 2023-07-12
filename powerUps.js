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