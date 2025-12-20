/**
 * Cloud
 * Moving cloud that drifts across the screen and recycles when off-screen.
 * @extends MovableObject
 */
class Cloud extends MovableObject {


    /**
     * Cloud image variations.
     * @type {string[]}
     */
    IMAGES_CLOUDS = [
        "img/5_background/layers/4_clouds/1.png",
        "img/5_background/layers/4_clouds/2.png"
    ];

    y = 20;
    width = 500;
    height = 250;

    constructor(x) {
        /**
         * Create a cloud and start its movement.
         * @param {number} [x] - Optional X position; random if omitted.
         * @returns {void}
         */
        super();
        let randomImage = this.IMAGES_CLOUDS[Math.floor(Math.random() * 2)];
        this.loadImage(randomImage);
        this.x = x !== undefined ? x : Math.random() * 720;
        this.y = 20 + Math.random() * 50;
        this.speed = 0.15 + Math.random() * 0.3;
        this.animate();
    }


    animate() {
        /**
         * Start movement interval to drift the cloud leftwards.
         * @returns {void}
         */
        let moveInterval = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        gameIntervals.push(moveInterval);
    }

    

}