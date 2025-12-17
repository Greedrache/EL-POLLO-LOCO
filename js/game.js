let canvas;
let world;
let keyboard = new Keyboard();

function init() {

    canvas = document.getElementById("Canvas");
    world = new World(canvas);


}


window.addEventListener("onkeydown", (event) => {
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.key == "ArrowLeft") {
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

window.addEventListener("onkeyup", (event) => {
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.key == "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }  

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});