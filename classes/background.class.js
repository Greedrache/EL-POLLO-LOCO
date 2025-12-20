/**
 * BackgroundObject
 * Static background segment placed in the level.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {


    width = 720;
    height = 480;
    /**
     * Create a background object.
     * @param {string} imagePath - Path to background image.
     * @param {number} x - X position in the world.
     * @returns {void}
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;

    }

}