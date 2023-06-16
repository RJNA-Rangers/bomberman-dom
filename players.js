import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js"
export function placePlayer(number, character) {
    const loadingArea = document.querySelector(`.loading-${number}`).getBoundingClientRect()
    console.log(loadingArea, "loadingarea")
    console.log(document.querySelector(`.loading-${number}`), " doc")

    const playerTop = loadingArea.top - 120 - globalSettings.wallHeight + (loadingArea.height / 2);
    const playerLeft = loadingArea.left - (window.innerWidth * 0.2) + (loadingArea.width / 2);
    return RJNA.tag.img({
        class: `player-${number}`, style: {
            top: `${playerTop}px`, left: `${playerLeft}px`, width: `${globalSettings.wallWidth}px`,
            height: `${globalSettings.wallHeight}px`
        }
    }, {}, { src: globalSettings.players[character] });
}
