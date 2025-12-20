/**
 * Global mute flag for game audio.
 * @type {boolean}
 */
let isMuted = false;

/**
 * Toggle global mute state for the game.
 * @returns {void}
 */
function toggleMute() {
    isMuted = !isMuted;
    setBackgroundMuted(isMuted);
    setWorldMuted(isMuted);
    updateMuteBtn();
}

/**
 * Mute/unmute the global background music.
 * @param {boolean} muted - Whether to mute the background music.
 * @returns {void}
 */
function setBackgroundMuted(muted) {
    if (typeof backgroundMusic !== 'undefined') backgroundMusic.muted = muted;
}

/**
 * Mute/unmute sounds attached to the current World instance.
 * @param {boolean} muted - Whether to mute world sounds.
 * @returns {void}
 */
function setWorldMuted(muted) {
    if (!world) return;
    ['bottle_collect_sound','coin_collect_sound','throw_bottle_sound','game_won_sound','game_lost_sound'].forEach(n => world[n] && (world[n].muted = muted));
    let endboss = world.level && world.level.enemies && world.level.enemies.find(e => e instanceof Endboss);
    if (endboss && endboss.endboss_music) endboss.endboss_music.muted = muted;
    if (world.character) ['walking_sound','jump_sound','hurt_sound','dead_sound'].forEach(n => world.character[n] && (world.character[n].muted = muted));
    if (world.throwableObjects && world.throwableObjects.length) world.throwableObjects.forEach(o => o.splash_sound && (o.splash_sound.muted = muted));
}

/**
 * Update the mute button UI to reflect current mute state.
 * @returns {void}
 */
function updateMuteBtn() {
    let btn = document.getElementById('mute-btn');
    if (btn) btn.innerText = isMuted ? '🔇' : '🔈';
}
let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let startScreen;
let backgroundMusic = new Audio('audio/backround-musik.mp3');
let gameIntervals = [];

/**
 * Initialize game systems (canvas, music, mobile controls).
 * @returns {void}
 */
function init() {
    setupCanvasAndStartScreen();
    setupBackgroundMusic();
    setupMobileControls();
}

/**
 * Prepare canvas element and create the start screen instance.
 * @returns {void}
 */
function setupCanvasAndStartScreen() {
    canvas = document.getElementById("Canvas");
    startScreen = new StartScreen();
    drawStartScreen();
}

/**
 * Configure background music playback options.
 * @returns {void}
 */
function setupBackgroundMusic() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 1;
}

/**
 * Setup touch event handlers for mobile control buttons.
 * @returns {void}
 */
function setupMobileControls() {
    let btnLeft = document.getElementById('btn-left');
    let btnRight = document.getElementById('btn-right');
    let btnJump = document.getElementById('btn-jump');
    let btnThrow = document.getElementById('btn-throw');
    if (!btnLeft || !btnRight || !btnJump || !btnThrow) return;
    btnLeft.addEventListener('touchstart', () => { keyboard.LEFT = true; });
    btnLeft.addEventListener('touchend', () => { keyboard.LEFT = false; });
    btnRight.addEventListener('touchstart', () => { keyboard.RIGHT = true; });
    btnRight.addEventListener('touchend', () => { keyboard.RIGHT = false; });
    btnJump.addEventListener('touchstart', () => { keyboard.SPACE = true; });
    btnJump.addEventListener('touchend', () => { keyboard.SPACE = false; });
    btnThrow.addEventListener('touchstart', () => { keyboard.THROW = true; });
    btnThrow.addEventListener('touchend', () => { keyboard.THROW = false; });
}

/**
 * Draw the selected start screen image onto the canvas.
 * @returns {void}
 */
function drawStartScreen() {
    let ctx = canvas.getContext("2d");
    startScreen.img.onload = function() {
        ctx.drawImage(startScreen.img, 0, 0, 720, 480);
    };
    if (startScreen.img.complete) {
        ctx.drawImage(startScreen.img, 0, 0, 720, 480);
    }
}

/**
 * Start the game: initialize level, create World and play background music.
 * @returns {void}
 */
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('start-btn').style.display = 'none';
        initLevel();
        world = new World(canvas, keyboard);
        backgroundMusic.play();
    }
}

/**
 * Show the replay screen and reset game intervals/state.
 * @returns {void}
 */
function showReplayScreen() {
    gameIntervals.forEach(id => clearInterval(id));
    gameIntervals = [];
    if (typeof window !== 'undefined') {
        for (let i = 1; i < 10000; i++) {
            clearInterval(i);
        }
    }
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameStarted = false;
    world = null;
    initLevel();
    startScreen = new StartScreen();
    drawStartScreen();
    let btn = document.getElementById('start-btn');
    btn.innerText = 'REPLAY';
    btn.style.display = 'block';
}

/**
 * Toggle fullscreen mode for the game container element.
 * @returns {void}
 */
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