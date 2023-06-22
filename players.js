import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js"
export function placePlayer(number, character) {
    // 
    const loadingArea =  document.querySelector(`.loading-${number}`).style
    console.log( loadingArea.top)
    // the starting central position of player:
    // -- top position of loading box
    const playerTop = loadingArea.top;
    // -- left position of loading box
    const playerLeft = loadingArea.left;
    return RJNA.tag.img({
        class: `player-${number}`, style: {
            top: `${playerTop}`, left: `${playerLeft}`, width: `${globalSettings.players.width}px`,
            height: `${globalSettings.players.height}px`
        }
    }, {}, { src: globalSettings.players[character] });
}
