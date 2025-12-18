class GameOverScreen extends DrawableObject {

    IMAGE_GAMEOVER = [
        "img/9_intro_outro_screens/game_over/game over.png",
        "img/9_intro_outro_screens/game_over/game over!.png",
        "img/9_intro_outro_screens/game_over/oh no you lost!.png",
        "img/9_intro_outro_screens/game_over/you lost.png"
    ];

    IMAGES_GAMEWIN = [
        "img/You won, you lost/You Win A.png",
        "img/You won, you lost/You won A.png",
        "img/You won, you lost/You win B.png"
    ];

    constructor() {
        super();
        let randomImage = this.IMAGE_GAMEOVER[Math.floor(Math.random() * this.IMAGE_GAMEOVER.length)];
        this.loadImage(randomImage);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }

    showWinScreen() {
        let randomImage = this.IMAGES_GAMEWIN[Math.floor(Math.random() * this.IMAGES_GAMEWIN.length)];
        this.loadImage(randomImage);
        this.width = 500;
        this.height = 250;
        this.x = (720 - this.width) / 2;
        this.y = (480 - this.height) / 2;
    }
}