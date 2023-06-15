import RJNA from "./rjna/engine.js";
import { layoutContainer } from "./gameContainer.js";
import { createMap, generateLevel } from "./mapTemplate.js";

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
let cells = generateLevel()
let map = createMap(cells)
let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
console.log(gameContainer, "what is this?")
gameContainer.setChild(map);
console.log(cells)