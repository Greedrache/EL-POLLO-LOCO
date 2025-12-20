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
function _isTouchableDevice() {
    return (typeof window !== 'undefined') && (('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));
}

function _getMobileButtons() {
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnJump = document.getElementById('btn-jump');
    const btnThrow = document.getElementById('btn-throw');
    if (!btnLeft || !btnRight || !btnJump || !btnThrow) return null;
    return { btnLeft, btnRight, btnJump, btnThrow };
}

function _hideMobileButtons(btns) {
    btns.btnLeft.style.display = 'none';
    btns.btnRight.style.display = 'none';
    btns.btnJump.style.display = 'none';
    btns.btnThrow.style.display = 'none';
}

function _showMobileButtons(btns) {
    btns.btnLeft.style.display = 'block';
    btns.btnRight.style.display = 'block';
    btns.btnJump.style.display = 'block';
    btns.btnThrow.style.display = 'block';
}

function _attachMobileListeners(btns) {
    btns.btnLeft.addEventListener('touchstart', () => { keyboard.LEFT = true; });
    btns.btnLeft.addEventListener('touchend', () => { keyboard.LEFT = false; });
    btns.btnRight.addEventListener('touchstart', () => { keyboard.RIGHT = true; });
    btns.btnRight.addEventListener('touchend', () => { keyboard.RIGHT = false; });
    btns.btnJump.addEventListener('touchstart', () => { keyboard.SPACE = true; });
    btns.btnJump.addEventListener('touchend', () => { keyboard.SPACE = false; });
    btns.btnThrow.addEventListener('touchstart', () => { keyboard.THROW = true; });
    btns.btnThrow.addEventListener('touchend', () => { keyboard.THROW = false; });
}

/**
 * Setup touch event handlers for mobile control buttons.
 * This function is now split into helpers: it finds buttons, hides them
 * for non-touch devices and attaches listeners only on touch devices.
 * @returns {void}
 */
function setupMobileControls() {
    const btns = _getMobileButtons();
    if (!btns) return;

    const isTouchable = _isTouchableDevice();
    if (!isTouchable) {
        _hideMobileButtons(btns);
        return;
    }

    _showMobileButtons(btns);
    _attachMobileListeners(btns);
    // initial impressum visibility update and listen for orientation changes
    updateImpressumVisibility();
    window.addEventListener('resize', updateImpressumVisibility);
    window.addEventListener('orientationchange', updateImpressumVisibility);
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
        // If device is not in landscape, prompt user to rotate first.
        if (!isLandscape()) {
            pendingStartRequested = true;
            showRotateOverlay();
            return;
        }

        gameStarted = true;
        document.getElementById('start-btn').style.display = 'none';
        initLevel();
        world = new World(canvas, keyboard);
        backgroundMusic.play();
    }
}

    // update impressum visibility after attempting to start
    updateImpressumVisibility();

/**
 * Whether the viewport is in landscape orientation.
 * @returns {boolean}
 */
function isLandscape() {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= window.innerHeight;
}

let pendingStartRequested = false;
let _rotateListener = null;

/**
 * Create and show an overlay asking the user to rotate the device.
 * @returns {void}
 */
function showRotateOverlay() {
    // If overlay already exists, don't recreate
    if (document.getElementById('rotate-overlay')) return;

    /**
     * Create the rotate overlay DOM element.
     * @returns {HTMLDivElement} The overlay element.
     */
    function createRotateOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'rotate-overlay';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.85)';
        overlay.style.color = '#fff';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        overlay.innerHTML = `<div style="text-align:center;font-family: 'Arial', sans-serif; max-width:80%;">\
            <h2 style=\"margin-bottom:0.5rem;\">Bitte Gerät drehen</h2>\
            <p style=\"margin-top:0;\">Drehe dein Gerät ins Querformat, um das Spiel zu starten.</p>\
            <button id=\"rotate-ok\" style=\"margin-top:1rem;padding:0.6rem 1rem;font-size:1rem;\">Ich habe gedreht</button>\
        </div>`;
        return overlay;
    }

    /**
     * Attach click handler to the overlay confirmation button.
     * @param {HTMLDivElement} overlay
     * @returns {void}
     */
    function attachRotateOkHandler(overlay) {
        const btn = overlay.querySelector('#rotate-ok');
        if (!btn) return;
        btn.addEventListener('click', () => {
            if (isLandscape()) {
                hideRotateOverlay();
                if (pendingStartRequested) { pendingStartRequested = false; startGame(); }
            }
        });
    }

    /**
     * Attach orientation/resize listeners that auto-close the overlay when rotated.
     * @returns {void}
     */
    function attachRotateListeners() {
        _rotateListener = () => {
            if (isLandscape()) {
                hideRotateOverlay();
                if (pendingStartRequested) { pendingStartRequested = false; startGame(); }
                removeRotateListener();
            }
        };
        window.addEventListener('orientationchange', _rotateListener);
        window.addEventListener('resize', _rotateListener);
    }

    const overlay = createRotateOverlay();
    document.body.appendChild(overlay);
    attachRotateOkHandler(overlay);
    attachRotateListeners();
}

function removeRotateListener() {
    if (!_rotateListener) return;
    window.removeEventListener('orientationchange', _rotateListener);
    window.removeEventListener('resize', _rotateListener);
    _rotateListener = null;
}

/**
 * Hide and remove the rotate overlay.
 * @returns {void}
 */
function hideRotateOverlay() {
    const overlay = document.getElementById('rotate-overlay');
    if (overlay) overlay.remove();
    removeRotateListener();
}

/**
 * Hide all Impressum link buttons when in landscape or when the game is active.
 * @returns {void}
 */
function _hideImpressumButtons() {
    document.querySelectorAll('.impressum-link-btn').forEach(el => {
        el.style.display = 'none';
    });
}

/**
 * Show Impressum link buttons (used when not in landscape and not in-game).
 * @returns {void}
 */
function _showImpressumButtons() {
    document.querySelectorAll('.impressum-link-btn').forEach(el => {
        el.style.display = '';
    });
}

/**
 * Update Impressum visibility based on orientation and game state.
 * @returns {void}
 */
function updateImpressumVisibility() {
    if (isLandscape() || gameStarted) {
        _hideImpressumButtons();
        document.body.classList.add('compact-runtime');
    } else {
        _showImpressumButtons();
        document.body.classList.remove('compact-runtime');
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