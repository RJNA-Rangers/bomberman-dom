import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js"
export function placePlayer(number, character) {
    // 
    const loadingArea = document.querySelector(`.loading-${number}`).getBoundingClientRect()
    // the starting central position of player:
    // -- top position of loading box - height of title and lives container (60px each)- half of box height + half of total border height
    const playerTop = loadingArea.top - 120 - (globalSettings.players.height / 2) + 10;
    // -- left position of loading box - width first grid column- a quater of box width (the player is the size width as the box) + half of total border width
    const playerLeft = loadingArea.left - globalSettings.gridColumn1  - (globalSettings.players.width / 4)+ 5;
    return RJNA.tag.img({
        class: `player-${number}`, style: {
            top: `${playerTop}px`, left: `${playerLeft}px`, width: `${globalSettings.wallWidth}px`,
            height: `${globalSettings.wallHeight}px`
        }
    }, {}, { src: globalSettings.players[character] });
}
