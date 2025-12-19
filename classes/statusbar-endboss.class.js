class EndbossStatusbar extends DrawableObject {
    IMAGES_STATUSBAR = [
        "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
        "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
        "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
        "img/7_statusbars/2_statusbar_endboss/orange/orange100.png"
    ];
    percentage = 100;
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.width = 300;
        this.height = 80;
        this.setPercentage(100);
        
    }
    setPercentage(percentage) {
        this.percentage = percentage;
        if(this.percentage < 0) this.percentage = 0;
        if(this.percentage > 100) this.percentage = 100;
        let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 3;
        } else if (this.percentage >= 80) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
    
    draw(ctx) {
        
        const canvas = ctx.canvas;
        this.x = (canvas.width / 2) - (this.width / 2);
        this.y = canvas.height - this.height - 10;
        super.draw(ctx);
    }
}