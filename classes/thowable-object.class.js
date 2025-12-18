class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20;

    constructor() {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = 100;
        this.y = 300;
        this.width = 50;
        this.height = 80;
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}