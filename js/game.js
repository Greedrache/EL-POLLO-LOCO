let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let startScreen;
let backgroundMusic = new Audio('audio/backround-musik.mp3');
let gameIntervals = [];

function init() {
    canvas = document.getElementById("Canvas");
    startScreen = new StartScreen();
    drawStartScreen();
    backgroundMusic.loop = true;
    backgroundMusic.volume = 1;

    // Mobile Controls
    let btnLeft = document.getElementById('btn-left');
    let btnRight = document.getElementById('btn-right');
    let btnJump = document.getElementById('btn-jump');
    let btnThrow = document.getElementById('btn-throw');
    if (btnLeft && btnRight && btnJump && btnThrow) {
        btnLeft.addEventListener('touchstart', () => { keyboard.LEFT = true; });
        btnLeft.addEventListener('touchend', () => { keyboard.LEFT = false; });
        btnRight.addEventListener('touchstart', () => { keyboard.RIGHT = true; });
        btnRight.addEventListener('touchend', () => { keyboard.RIGHT = false; });
        btnJump.addEventListener('touchstart', () => { keyboard.SPACE = true; });
        btnJump.addEventListener('touchend', () => { keyboard.SPACE = false; });
        btnThrow.addEventListener('touchstart', () => { keyboard.THROW = true; });
        btnThrow.addEventListener('touchend', () => { keyboard.THROW = false; });
    }
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
        initLevel();
        world = new World(canvas, keyboard);
        backgroundMusic.play();
    }
}

function showReplayScreen() {
    // Stoppe alle Intervalle
    gameIntervals.forEach(id => clearInterval(id));
    gameIntervals = [];
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameStarted = false;
    world = null;
    // Endboss und Level neu initialisieren
    initLevel();
    startScreen = new StartScreen();
    drawStartScreen();
    let btn = document.getElementById('start-btn');
    btn.innerText = 'REPLAY';
    btn.style.display = 'block';
}

function toggleFullscreen() {
    let gameContainer = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        gameContainer.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
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
// 2. Flaschen einsammeln // fertig
// 3. Flaschen nur werfen, wenn welche da sind // fertig
// 4. Collision
// 5. Endboss besiegen
// 6. Game Over Screen                // fertig
// 7. Fullscreen toggle
// 8. Sound einbauen                   // so gut wie fertig, schlaf sound fehlt und endboss sound
// 9. Startbildschirm                  // fertig auch mit play button


// Endboss sound, springen, 
