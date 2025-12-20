class BabyChicken extends MovableObject {

    y = 365;
    height = 45;
    width = 60;
    chickenDead = false;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png", 
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 300 + Math.random() * 2000;
        this.speed = 0.2 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        let moveInterval = setInterval(() => {
            if (!this.chickenDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
        gameIntervals.push(moveInterval);

        let animInterval = setInterval(() => {
            if (!this.chickenDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
        gameIntervals.push(animInterval);
    }

    die() {
        this.chickenDead = true;
        this.loadImage(this.IMAGES_DEAD[0]);
        this.speed = 0;
    }
}