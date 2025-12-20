/**
 * DrawableObject
 * Base class for drawable assets which manage images and drawing to canvas.
 * Handles image caching and basic draw utilities used by game objects.
 */
class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        /**
         * Load a single image into this drawable object.
         * @param {string} path - Image source path.
         * @returns {void}
         */
        this.img = new Image();
        this.img.src = path;
    }

    drawFrame(ctx) {
        /**
         * Draw a red debug frame around the object.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @returns {void}
         */
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    draw(ctx) {
        /**
         * Draw the object's current image to the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @returns {void}
         */
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        /**
         * Preload multiple images into the object's image cache.
         * @param {string[]} arr - Array of image paths.
         * @returns {void}
         */
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}