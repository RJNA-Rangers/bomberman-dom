import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js";
const template = [
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
  ['▉', 'x', 'x', , , , , , , , , , 'x', 'x', '▉'],
  ['▉', 'x', '▉', , '▉', , '▉', , '▉', , '▉', , '▉', 'x', '▉'],
  ['▉', 'x', , , , , , , , , , , , 'x', '▉'],
  ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
  ['▉', , , , , , , , , , , , , , '▉'],
  ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
  ['▉', , , , , , , , , , , , , , '▉'],
  ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
  ['▉', 'x', , , , , , , , , , , , 'x', '▉'],
  ['▉', 'x', '▉', , '▉', , '▉', , '▉', , '▉', , '▉', 'x', '▉'],
  ['▉', 'x', 'x', , , , , , , , , , 'x', 'x', '▉'],
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉']
];

export function generateLevel() {
  let cells = [];

  for (let row = 0; row < globalSettings.numOfRows; row++) {
    cells[row] = [];

    for (let col = 0; col < globalSettings.numOfCols; col++) {

      // 90% chance cells will contain a soft wall
      if (!template[row][col] && Math.random() < 0.90) {
        cells[row][col] = globalSettings.wallTypes.softWall;
      }
      else if (template[row][col] === globalSettings.wallTypes.wall) {
        cells[row][col] = globalSettings.wallTypes.wall;
      }
    }
  }
  return cells
}

export function createMap(map) {
  const gameWrapper = RJNA.tag.div(
    { class: "game-wrapper" },
    {},
    {}
  )
  console.log(document.querySelector('.game-container'));
  for (let row = 0; row < globalSettings.numOfRows; row++) {
    for (let col = 0; col < globalSettings.numOfCols; col++) {
      switch (map[row][col]) {
        case globalSettings.wallTypes.wall:
          gameWrapper.setChild(RJNA.tag.img({ class: "hard-wall", style: { top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px` } }, {}, { src: globalSettings.wallSrc.hard }));
          break;
        case globalSettings.wallTypes.softWall:
          gameWrapper.setChild(RJNA.tag.img({ class: "soft-wall", style: { top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px` } }, {}, { src: globalSettings.wallSrc.soft }));
          break;
        case undefined:
          gameWrapper.setChild(RJNA.tag.img({ class: "dirt-patch", style: { top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px` } }, {}, { src: globalSettings.wallSrc.empty }));
      }
    }
  }
  return gameWrapper
}