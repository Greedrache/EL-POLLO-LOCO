let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let startScreen;

function init() {
    canvas = document.getElementById("Canvas");
    startScreen = new StartScreen();
    drawStartScreen();
}

function drawStartScreen() {
    let ctx = canvas.getContext("2d");
    startScreen.img.onload = function() {
        ctx.drawImage(startScreen.img, 0, 0, 720, 480);
    };
    if (startScreen.img.complete) {
        ctx.drawImage(startScreen.img, 0, 0, 720, 480);
    }
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('start-btn').style.display = 'none';
        world = new World(canvas, keyboard);
    }
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

    if (event.code == "KeyS" || event.key == "ArrowDown" || event.keyCode == 40) {
        keyboard.THROW = true;
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

    if (event.code === "KeyS" || event.code === "ArrowDown") {
        keyboard.THROW = false;
    }
});



// AUfgaben 
// 1. Coins einsammeln
// 2. Flaschen einsammeln
// 3. Flaschen nur werfen, wenn welche da sind
// 4. Collision
// 5. Endboss besiegen
// 6. Game Over Screen // fertig
// 7. Fullscreen toggle
// 8. Sound einbauen                   // so gut wie fertig, schlaf sound fehlt und endboss sound
// 9. Startbildschirm


// Endboss sound, springen, 
