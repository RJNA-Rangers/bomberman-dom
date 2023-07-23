// For player movement movement
export let rightPressed = false,
    leftPressed = false,
    upPressed = false,
    downPressed = false,
    pickUp = false,
    speedPressed = false,
    flamesPressed = false,
    bombsPressed = false,
    bombDropped = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

export function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    } else if (e.key == 'Up' || e.key == 'ArrowUp') {
        upPressed = true;
    } else if (e.key == 'Down' || e.key == 'ArrowDown') {
        downPressed = true;
    }
}

export function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    } else if (e.key == 'Up' || e.key == 'ArrowUp') {
        upPressed = false;
    } else if (e.key == 'Down' || e.key == 'ArrowDown') {
        downPressed = false;
    } else if (e.key == "q") {
        pickUp = true
    } else if (e.key == "s") {
        //active speed power up
        speedPressed = true;
    } else if (e.key == "a") {
        // active flames power
        flamesPressed = true;
    } else if (e.key == "d") {
        //active bombs power up
        bombsPressed = true;
    }else if (e.key == "w"){
        console.log("w pressed...")
        bombDropped = true;
    }
}
export function falseKeyBool(string) {
    switch (string) {
        case "left":
            leftPressed = false
            break
        case "right":
            rightPressed = false
            break
        case "up":
            upPressed = false
            break
        case "down":
            downPressed = false
            break
        case "pick-up":
            pickUp = false
            break
        case "speed-pressed":
            speedPressed = false
            break
        case "flames-pressed":
            flamesPressed = false
            break
        case "bombs-pressed":
            bombsPressed = false
            break
        case "bombs-dropped":
            bombDropped = false
            break
    }
}

//https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
//prevent arrows and space bar from moving the screen
window.addEventListener(
    'keydown',
    function stopCrolling(e) {
        if (
            [
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight'
            ].indexOf(e.code) > -1
        ) {
            e.preventDefault();
        }
    },
    false
);