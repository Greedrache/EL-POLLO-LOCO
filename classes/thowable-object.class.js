class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 80;
        this.animate();
        this.trow();
    }

    animate() {
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    trow() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}