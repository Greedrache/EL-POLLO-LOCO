class StatusbarCoin extends DrawableObject {

    IMAGES_STATUSBAR_COIN = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png"
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_COIN);
        this.x = 20;
        this.y = 95;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        /**
         * Update coin statusbar percentage and image.
         * @param {number} percentage
         * @returns {void}
         */
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];


        if(this.percentage < 0) {
            this.percentage = 0;
        }
    }
        
    resolveImageIndex() {
        /**
         * Map coin percentage to an image index.
         * @returns {number}
         */
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

  
