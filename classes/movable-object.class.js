class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            if (this.isSplashing) return false;  // Stop gravity when splashing
            return this.y < 350;  // Boden für Flaschen
        } else {
            return this.y < 180;  // Character stoppt bei y = 180 (Boden)
        }
    }

    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        gameIntervals.push(gravityInterval);
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}