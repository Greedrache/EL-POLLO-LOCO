class StartScreen extends DrawableObject {

    IMAGE_STARTSCREEN = [
        "img/9_intro_outro_screens/start/startscreen_1.png",
        "img/9_intro_outro_screens/start/startscreen_2.png"
    ];

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