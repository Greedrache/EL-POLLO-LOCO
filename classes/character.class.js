class Character extends MovableObject {

    y = 180;
    height = 250;
    width = 130;
    speed = 5;
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];
    world;

    constructor() {
        super();
        this.loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);


        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world && this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world && this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;

        }, 1000 / 60);


        setInterval(() => {
            if (this.world && this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                if (this.currentImage >= this.IMAGES_WALKING.length) {
                    this.currentImage = 0;
                }
                let path = this.IMAGES_WALKING[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    jump() {

    }
}