/**
 * StartScreen
 * Displays a randomly selected start screen image.
 * @extends DrawableObject
 */
class StartScreen extends DrawableObject {

    /**
     * Available start screen images.
     * @type {string[]}
     */
    IMAGE_STARTSCREEN = [
        "img/9_intro_outro_screens/start/startscreen_1.png",
        "img/9_intro_outro_screens/start/startscreen_2.png"
    ];

    /**
     * Creates a StartScreen and loads a random start image.
     * @returns {void}
     */
    constructor() {
        super();
        let randomImage = this.IMAGE_STARTSCREEN[Math.floor(Math.random() * this.IMAGE_STARTSCREEN.length)];
        this.loadImage(randomImage);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}