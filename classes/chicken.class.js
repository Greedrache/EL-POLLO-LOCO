class Chicken extends MovableObject {

    y = 360;
    height = 60;
    width = 80;
    constructor() {
        super();
        this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

        this.x = 200 + Math.random() * 400; 
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.35;
        }, 1000 / 60);
    }
}
