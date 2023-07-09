import RJNA from "./rjna/engine.js";
import { layoutContainer, waitingRoom } from "./gameContainer.js";
import { createMap, generateLevel } from "./mapTemplate.js";
import { changeGameSettingValue, globalSettings, browserHeight } from "./gameSetting.js";
import { placePlayer } from "./players.js";
import { runChatroom } from "./public/code.js";

// Debounce function
// function debounce(func, delay) {
//     let timeoutId;
//     return function (...args) {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }

// Resize event handler with debounce
// window.onresize = debounce(() => {
//     if (((window.screen.width - 10) * 0.6) / 15!=globalSettings.wallWidth){
//     const newWindowWidth = ((window.screen.width - 10) * 0.6) / 15;
//     changeGameSettingValue("wallWidth", newWindowWidth);
//     const newWindowHeight = (browserHeight() - 60 - 60 - 15 - 10) / 13;
//     changeGameSettingValue("wallHeight", newWindowHeight);
//     changeGameSettingValue("gridColumn1", ((window.screen.width) * 0.17));
//     changeGameSettingValue("gridColumn2", ((window.screen.width - 10) * 0.6));
//     changeGameSettingValue("gridColumn3", ((window.screen.width - 20) * 0.2));
//     changeGameSettingValue("gridFr", (browserHeight() - 60 - 60 - 15 - 20) / 2);
//     let gameContainer = RJNA.getObjByAttrsAndPropsVal(orbital.obj, "game-container");
//     gameContainer.removeChildren(1, 1);
//     openGame()
// }
// }, 1000); // Delay of 200ms (adjust as needed)

// https://stackoverflow.com/questions/1125084/how-to-make-the-window-full-screen-with-javascript-stretching-all-over-the-scre

// function requestFullScreen(element) {
//     // Supports most browsers and their versions.
//     var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

//     if (requestMethod) { // Native full screen.
//         requestMethod.call(element);
//     } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
//         var wscript = new ActiveXObject("WScript.Shell");
//         if (wscript !== null) {
//             wscript.SendKeys("{F11}");
//         }
//     }
// }
function openGame() {
    return new Promise((resolve) => {
        const rootObj = RJNA.tag.div({ class: "app" }, {}, {});
        const rootEl = RJNA.createNode(rootObj);
        orbital.obj = rootObj;
        orbital.rootEl = rootEl;
        document.body.appendChild(orbital.rootEl);
        const container = layoutContainer()
        rootObj.setChild(waitingRoom);
        rootObj.setChild(container);
        console.log(rootEl);
        resolve("success")
    })
}

openGame().then(
    (response) => response == "success" ? runChatroom() : console.log("failed to open chatroom. Please Try Again later")
);

