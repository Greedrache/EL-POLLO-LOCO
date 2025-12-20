/**
 * Bottle
 * Represents a collectible bottle placed on the ground.
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {

    /**
     * Available bottle images.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    constructor(x) {
        /**
         * Create a Bottle at the given x position.
         * @param {number} x - X position on the level.
         * @returns {void}
         */
        super();
        let randomImage = this.IMAGES_BOTTLE[Math.floor(Math.random() * 2)];
        this.loadImage(randomImage);
        this.x = x;
        this.y = 350;
        this.width = 80;
        this.height = 80;
    }
}
