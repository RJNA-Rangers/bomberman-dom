import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js"
export function placePlayer(number, character) {
    const loadingArea = document.querySelector(`.loading-${number}`).getBoundingClientRect()
    // console.log(loadingArea, "loadingarea")
    // console.log(document.querySelector(`.loading-${number}`), " doc")

    const playerTop = loadingArea.top - 120 - globalSettings.wallHeight + (loadingArea.height / 4);
    const playerLeft = loadingArea.left - globalSettings.gridColumn1 - (loadingArea.width / 4);
    return RJNA.tag.img({
        class: `player-${number}`, style: {
            top: `${playerTop}px`, left: `${playerLeft}px`, width: `${globalSettings.players.width}px`,
            height: `${globalSettings.players.height}px`
        }
    }, {}, { src: globalSettings.players[character] });
}
