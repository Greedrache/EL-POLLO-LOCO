class Bottle extends DrawableObject {

    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    constructor(x) {
        super();
        let randomImage = this.IMAGES_BOTTLE[Math.floor(Math.random() * 2)];
        this.loadImage(randomImage);
        this.x = x;
        this.y = 350;
        this.width = 80;
        this.height = 80;
    }
}
