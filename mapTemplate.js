import { globalSettings } from "./gameSetting.js";
import RJNA from "./rjna/engine.js";
const template = [
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
  ['▉', 'x', 'l', , , , , , , , , , 'l', 'y', '▉'],
  ['▉', 'l', '▉', , '▉', , '▉', , '▉', , '▉', , '▉', 'l', '▉'],
  ['▉', 'l', , , , , , , , , , , , 'l', '▉'],
  ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
  ['▉', , , , , , , , , , , , , , '▉'],
  ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
  ['▉', , , , , , , , , , , , , , '▉'],
  ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
  ['▉', 'l', , , , , , , , , , , , 'l', '▉'],
  ['▉', 'l', '▉', , '▉', , '▉', , '▉', , '▉', , '▉', 'l', '▉'],
  ['▉', 'w', 'l', , , , , , , , , , 'l', 'z', '▉'],
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
      } else if (template[row][col] === 'w' || template[row][col] === 'x' || template[row][col] === 'y' || template[row][col] === 'z') {
        cells[row][col] = template[row][col]
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
  for (let row = 0; row < globalSettings.numOfRows; row++) {
    for (let col = 0; col < globalSettings.numOfCols; col++) {
      switch (map[row][col]) {
        case globalSettings.wallTypes.wall:
          gameWrapper.setChild(RJNA.tag.img({
            class: "hard-wall", style: {
              top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px`, width: `${globalSettings.wallWidth}px`,
              height: `${globalSettings.wallHeight}px`
            }
          }, {}, { src: globalSettings.wallSrc.hard }));
          break;
        case globalSettings.wallTypes.softWall:
          gameWrapper.setChild(RJNA.tag.img({
            class: "soft-wall", style: {
              top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px`, width: `${globalSettings.wallWidth}px`,
              height: `${globalSettings.wallHeight}px`
            }
          }, {}, { src: globalSettings.wallSrc.soft }));
          break;
        case undefined:
          gameWrapper.setChild(RJNA.tag.img({
            class: "dirt-patch", style: {
              top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px`, width: `${globalSettings.wallWidth}px`,
              height: `${globalSettings.wallHeight}px`
            }
          }, {}, { src: globalSettings.wallSrc.empty }));
          break
        case 'w':
          gameWrapper.setChild(RJNA.tag.img({
            class: "loading-2", style: {
              top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px`, width: `${globalSettings.wallWidth}px`,
              height: `${globalSettings.wallHeight}px`
            }
          }, {}, { src: globalSettings.wallSrc.empty }));
          break
        case 'x':
          gameWrapper.setChild(RJNA.tag.img({
            class: "loading-1", style: {
              top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px`, width: `${globalSettings.wallWidth}px`,
              height: `${globalSettings.wallHeight}px`
            }
          }, {}, { src: globalSettings.wallSrc.empty }));
          break
        case 'y':
          gameWrapper.setChild(RJNA.tag.img({
            class: "loading-3", style: {
              top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px`, width: `${globalSettings.wallWidth}px`,
              height: `${globalSettings.wallHeight}px`
            }
          }, {}, { src: globalSettings.wallSrc.empty }));
          break
        case 'z':
          gameWrapper.setChild(RJNA.tag.img({
            class: "loading-4", style: {
              top: `${row * globalSettings.wallHeight}px`, left: `${col * globalSettings.wallWidth}px`, width: `${globalSettings.wallWidth}px`,
              height: `${globalSettings.wallHeight}px`
            }
          }, {}, { src: globalSettings.wallSrc.empty }));
      }

    }
  }
  return gameWrapper
}