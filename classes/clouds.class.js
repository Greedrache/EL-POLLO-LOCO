class Cloud extends MovableObject {


    IMAGES_CLOUDS = [
        "img/5_background/layers/4_clouds/1.png",
        "img/5_background/layers/4_clouds/2.png"
    ];

    y = 20;
    width = 500;
    height = 250;

    constructor(x) {
        super();
        let randomImage = this.IMAGES_CLOUDS[Math.floor(Math.random() * 2)];
        this.loadImage(randomImage);
        this.x = x !== undefined ? x : Math.random() * 720;
        this.y = 20 + Math.random() * 50;
        this.speed = 0.15 + Math.random() * 0.3;
        this.animate();
    }


    animate() {
        let moveInterval = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        gameIntervals.push(moveInterval);
    }

    

}