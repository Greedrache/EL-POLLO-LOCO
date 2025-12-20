class Coin extends MovableObject {

    IMAGES_COIN = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png"
    ];

    constructor(x, y) {
        /**
         * Create a coin at the given position and start its spin animation.
         * @param {number} x
         * @param {number} y
         * @returns {void}
         */
        super();
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.width = 120;
        this.height = 120;
        this.animate();
    }

    animate() {
        /**
         * Start coin animation interval to alternate frames.
         * @returns {void}
         */
        let animInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
        gameIntervals.push(animInterval);
    }
}
