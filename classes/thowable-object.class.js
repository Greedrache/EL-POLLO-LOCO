class ThrowableObject extends MovableObject {


    IMAGES_BOTTLE_ROTATE = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];


    IMAGES_BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
        
    ];

    isSplashing = false;
    splash_sound = new Audio('audio/splashhitted.mp3');

    constructor(x, y) {
        super();
        this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.splash_sound.volume = 0.3;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 80;
        this.trow();
        this.animate();
    }

    animate() {
        let rotateInterval = setInterval(() => {
            if (!this.isSplashing) {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
            }
        }, 50);
        gameIntervals.push(rotateInterval);
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            if (!this.isSplashing) {
                this.x += 10;
            }
        }, 25);
        gameIntervals.push(throwInterval);
    }

    splash() {
        if (!this.isSplashing) {
            this.isSplashing = true;
            this.speedY = 0;
            this.currentImage = 0;
            if (typeof isMuted === 'undefined' || !isMuted) {
                this.splash_sound.play();
            }
            let splashInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                if (this.currentImage >= this.IMAGES_BOTTLE_SPLASH.length) {
                    clearInterval(splashInterval);
                }
            }, 80);
            gameIntervals.push(splashInterval);
        }
    }

    hasHitGround() {
        return this.y >= 350;
    }
}