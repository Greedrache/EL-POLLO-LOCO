class Character extends MovableObject {

    y = 180;
    height = 250;
    width = 130;
    speed = 8;
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png"
    ];

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png"
    ];
    
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png"
    ];

    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png"
    ];
    world;
    lastActionTime = new Date().getTime();
    deadAnimationPlayed = false;
    jump_sound = new Audio('audio/jump .mp3');
    hurt_sound = new Audio('audio/characterbecomedamage.mp3');
    dead_sound = new Audio('audio/sterben .mp3');

    constructor() {
        super();
        this.loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    animate() {

        let moveInterval = setInterval(() => {
            if (this.isDead()) return;
            
            if (this.world && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.lastActionTime = new Date().getTime();
            }

            if (this.world && this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.lastActionTime = new Date().getTime();
            }
            if (this.world) {
                this.world.camera_x = -this.x + 100;
            }

            if (this.world && this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

        }, 1000 / 60);
        gameIntervals.push(moveInterval);


        let animInterval = setInterval(() => {
            if (this.isDead()) {
                if (!this.deadAnimationPlayed) {
                    this.playAnimation(this.IMAGES_DEAD);
                    if (this.currentImage >= this.IMAGES_DEAD.length) {
                        this.deadAnimationPlayed = true;
                        this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
                    }
                    this.dead_sound.play();
                }
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.hurt_sound.play();
            }
            else if (!this.isAboveGround()) {
                if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    let timeSinceLastAction = new Date().getTime() - this.lastActionTime;
                    if (timeSinceLastAction > 60000) {
                        this.playAnimation(this.IMAGES_LONG_IDLE);
                    } else {
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                }
            }
        }, 50);
        gameIntervals.push(animInterval);

        let jumpInterval = setInterval(() => {
            if (this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 100);
        gameIntervals.push(jumpInterval);
    }

    jump() {
        this.speedY = 22;
        this.jump_sound.play();
        this.lastActionTime = new Date().getTime();
    }
}