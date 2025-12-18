class ThrowableObject extends MovableObject {

    constructor() {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = 100;
        this.y = 300;
        this.width = 50;
        this.height = 80;
        this.animate();
        this.trow(this.x, this.y);
    }

    animate() {
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    trow(x, y) {
        this.x = x + 100;
        this.y = y - 30;
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
    }
}