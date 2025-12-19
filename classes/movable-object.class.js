class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            if (this.isSplashing) return false;
            return this.y < 350;
        } else {
            return this.y < 180;
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
        const shrink = 0.2;
        const offsetSelfX = this.x + (this.width * shrink) / 2;
        const offsetSelfY = this.y + (this.height * shrink) / 2;
        const selfWidth = this.width * (1 - shrink);
        const selfHeight = this.height * (1 - shrink);

        const offsetMoX = mo.x + (mo.width * shrink) / 2;
        const offsetMoY = mo.y + (mo.height * shrink) / 2;
        const moWidth = mo.width * (1 - shrink);
        const moHeight = mo.height * (1 - shrink);

        return offsetSelfX + selfWidth > offsetMoX &&
            offsetSelfX < offsetMoX + moWidth &&
            offsetSelfY + selfHeight > offsetMoY &&
            offsetSelfY < offsetMoY + moHeight;
    }

    drawFrame(ctx) {
        const shrink = 0.2;
        const offsetX = this.x + (this.width * shrink) / 2;
        const offsetY = this.y + (this.height * shrink) / 2;
        const w = this.width * (1 - shrink);
        const h = this.height * (1 - shrink);
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(offsetX, offsetY, w, h);
        ctx.restore();
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