import RJNA from "./rjna/engine.js";
import { congratulationsContainer, layoutContainer, waitingRoom } from "./gameContainer.js";
import { runChatroom } from "./public/code.js";

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
        rootObj.setChild(congratulationsContainer)
        resolve("success")
    })
}

openGame().then(
    (response) => response == "success" ? runChatroom() : console.log("failed to open chatroom. Please Try Again later")
);

