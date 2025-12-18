class Chicken extends MovableObject {

    y = 365;
    height = 65;
    width = 80;
    chickenDead = false;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    ];


    constructor() {
        super();
        this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

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

