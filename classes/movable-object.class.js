/**
 * MovableObject
 * Base class for objects that move and interact in the game world.
 * Provides basic physics (gravity), collision checks and animation helpers.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    _currentAnimation = null;

    isAboveGround() {
        /**
         * Check whether the object is above the ground.
         * For throwable objects the ground level differs from other objects.
         * @returns {boolean}
         */
        if (this instanceof ThrowableObject) {
            if (this.isSplashing) return false;
            return this.y < 350;
        } else {
            return this.y < 180;
        }
    }

    applyGravity() {
        /**
         * Start applying gravity to the object by updating vertical speed and position.
         * @returns {void}
         */
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        gameIntervals.push(gravityInterval);
    }

    isColliding(mo) {
        /**
         * Axis-aligned bounding box collision detection with a shrink factor.
         * @param {Object} mo - Other movable object to test against.
         * @returns {boolean}
         */
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
        /**
         * Draw a debug frame around the object's collision box.
         * @param {CanvasRenderingContext2D} ctx
         * @returns {void}
         */
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
        /**
         * Apply damage to this object and record hit time for invulnerability frames.
         * @returns {void}
         */
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        /**
         * Check whether the object is in a hurt state (recently hit).
         * @returns {boolean}
         */
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        /**
         * Whether the object has no energy left.
         * @returns {boolean}
         */
        return this.energy == 0;
    }

    moveRight() {
        /**
         * Move the object to the right by its speed.
         * @returns {void}
         */
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        /**
         * Move the object to the left by its speed.
         * @returns {void}
         */
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump() {
        /**
         * Set an upward speed to initiate a jump.
         * @returns {void}
         */
        this.speedY = 30;
    }

    playAnimation(images, loop = true) {
        /**
         * Start or continue playing an animation sequence.
         * @param {string[]} images - Array of image paths.
         * @param {boolean} [loop=true] - Whether to loop the animation.
         * @returns {void}
         */
        if (this._currentAnimation !== images) { this._currentAnimation = images; this.currentImage = 0; }
        this._advanceAnimation(images, loop);
    }

    _advanceAnimation(images, loop) {
        /**
         * Advance the animation frame, handling loop or final frame.
         * @private
         * @param {string[]} images
         * @param {boolean} loop
         * @returns {void}
         */
        if (this.currentImage >= images.length) this.currentImage = loop ? 0 : images.length - 1;
        const path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}