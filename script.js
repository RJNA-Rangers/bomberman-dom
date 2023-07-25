import { PlayerMovement, movePlayers } from "./players.js";
import { socket } from "./public/code.js";

export let currentLevel;


//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

let stop = false;
let fps = 60,
  fpsInterval,
  startTime,
  now,
  then,
  elapsed;

export function startAnimating(fps) {
  console.log("start", socket);
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  animate(fpsInterval);
}

// let duration = 0;
function animate(newtime) {
    // stop
    if (stop) {
        return;
    }
    
    // request another frame
    
    requestAnimationFrame(animate);
    
    // calc elapsed time since last loop
    
    now = newtime;
    elapsed = now - then;
    
    // if enough time has elapsed, draw the next frame
    
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);
        
        // draw stuff here
        
    // draw player movement
    if (socket != null)
    PlayerMovement(socket);
  }
}

export function changeStopValue() {
  stop = !stop;
  if (!stop) {
    startAnimating(fps);
  }
}
