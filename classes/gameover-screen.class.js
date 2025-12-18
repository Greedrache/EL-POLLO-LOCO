class GameOverScreen extends DrawableObject {

    IMAGE_GAMEOVER = [
        "img/9_intro_outro_screens/game_over/game over.png",
        "img/9_intro_outro_screens/game_over/game over!.png",
        "img/9_intro_outro_screens/game_over/oh no you lost!.png",
        "img/9_intro_outro_screens/game_over/you lost.png"
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
}