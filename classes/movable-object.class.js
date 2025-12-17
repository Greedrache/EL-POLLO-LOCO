class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.3;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log("Moving right");
    }

    moveLeft() {
         setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        if (this.currentImage >= this.IMAGES_WALKING.length) {
                    this.currentImage = 0;
                }
                let path = images[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
    }
}




