import RJNA from "./rjna/engine.js";
import { layoutContainer } from "./gameContainer.js";
import { createMap, generateLevel } from "./mapTemplate.js";
import { placePlayer } from "./players.js";

const rootObj = RJNA.tag.div({ class: "app" }, {}, {});
const rootEl = RJNA.createNode(rootObj);
orbital.obj = rootObj;
orbital.rootEl = rootEl;
document.body.appendChild(orbital.rootEl);
const container = layoutContainer();
rootObj.setChild(container);
console.log(rootEl);

// cells will go inside orbital, it is the representation of the map.
orbital.cells = generateLevel()
let map = createMap(orbital.cells)
let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
// console.log(gameContainer, "what is this?");
gameContainer.setChild(map);
const gameWrapper = gameContainer.children[0];
// console.log(gameWrapper, "game wrapper");
gameWrapper.setChild(placePlayer(1, "one"))
gameWrapper.setChild(placePlayer(2, "two"))
gameWrapper.setChild(placePlayer(3, "lad"))
gameWrapper.setChild(placePlayer(4, "wario"))
// console.log(gameWrapper, "game wrapper2");
