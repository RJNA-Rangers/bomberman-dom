import RJNA from "./rjna/engine.js";
import { layoutContainer } from "./gameContainer.js";
import { createMap, generateLevel } from "./mapTemplate.js";
import { changeGameSettingValue, globalSettings } from "./gameSetting.js";
import { placePlayer } from "./players.js";

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Resize event handler with debounce
window.onresize = debounce(() => {
    let columnCount = 0;
    let rowCount = 0;
    const newWindowWidth = ((window.innerWidth - 10) * 0.6) / 15;
    changeGameSettingValue("wallWidth", newWindowWidth);
    const newWindowHeight = (window.innerHeight - 60 - 60 - 15 - 30) / 13;
    changeGameSettingValue("wallHeight", newWindowHeight);

    const resizedMap = createMap(orbital.cells);
    let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
    // console.log(gameContainer.children[0].children)
    gameContainer.children[0].children.forEach(wall => {
        const newStyle = {
            top: `${rowCount * globalSettings.wallHeight}px`, left: `${columnCount * globalSettings.wallWidth}px`, width: `${globalSettings.wallWidth}px`,
            height: `${globalSettings.wallHeight}px`
        }
        console.log(wall, "wall before...")
        console.log(globalSettings.wallWidth, "wall width");
        wall.removeAttr("style", " ", newStyle);
        console.log(wall, "wall after...");
        columnCount++
        if (columnCount === 15) {
            console.log('in here bro.', columnCount);
            columnCount = 0
            rowCount++
        }

    })
    // gameContainer.removeChildren(1, 1);
    // gameContainer.setChild(resizedMap);
    // }
}, 1000); // Delay of 200ms (adjust as needed)
const rootObj = RJNA.tag.div({ class: "app" }, {}, {});
const rootEl = RJNA.createNode(rootObj);
orbital.obj = rootObj;
orbital.rootEl = rootEl;
document.body.appendChild(orbital.rootEl);
const container = layoutContainer();
rootObj.setChild(container);
console.log(rootEl);

// const gameMap = [[]]
// cells will go inside orbital, it is the representation of the map.
orbital.cells = generateLevel()
let map = createMap(orbital.cells)
let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
console.log(gameContainer, "what is this?");
gameContainer.setChild(map);
const gameWrapper = gameContainer.children[0];
console.log(gameWrapper, "game wrapper");
gameWrapper.setChild(placePlayer(1, "one"))
gameWrapper.setChild(placePlayer(2, "two"))
gameWrapper.setChild(placePlayer(3, "lad"))
gameWrapper.setChild(placePlayer(4, "wario"))
console.log(gameWrapper, "game wrapper2");
