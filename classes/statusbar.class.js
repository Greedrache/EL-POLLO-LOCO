class Statusbar extends DrawableObject {

    IMAGES_STATUSBAR = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImage(this.IMAGES_STATUSBAR[5]);
        this.loadImages(this.IMAGES_STATUSBAR);
        this.x = 20;
        this.y = 20;
        this.width = 200;
        this.height = 60;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];

        if (this.percentage == 0) {
            this.width = 0;
        }
        
    }
}