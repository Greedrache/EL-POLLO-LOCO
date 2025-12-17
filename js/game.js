let canvas;
let world;
let keyboard = new Keyboard();

function init() {

    canvas = document.getElementById("Canvas");
    world = new World(canvas, keyboard);


}


window.addEventListener("keydown", (event) => {
    if (event.code == "KeyD" || event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.code == "KeyA" || event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.key == "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }  

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (event) => {

    if (event.code === "ArrowRight" || event.code === "KeyD") {
        keyboard.RIGHT = false;
    }

    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        keyboard.LEFT = false;
    }

    if (event.code === "ArrowUp" || event.code === "KeyW") {
        keyboard.UP = false;
    }

    if (event.code === "Space") {
        keyboard.SPACE = false;
    }
});
