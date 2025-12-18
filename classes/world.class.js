class World {
    character = new Character();
    enemies = level1.enemies;
    clouds =  level1.clouds;
    backgroundObject = level1.backgroundObject;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit(); 
                    console.log('Character energy: ' + this.character.energy);
                      
                }
            });
        }, 100);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.translate(this.camera_x, 0); // Kamera bewegen

        this.addObjecttoMap(this.level.backgroundObject);
        this.addObjecttoMap(this.level.clouds);
        this.addtoMap(this.character);
        this.addObjecttoMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0); // Kamera zurücksetzen


        requestAnimationFrame(() => this.draw()); // Je besser die Grafikkarte, desto höher die fps

    }

    addObjecttoMap(objects) {
        objects.forEach(o => {
            this.addtoMap(o);
        });
    }

    addtoMap(mo) {
        if (mo.otherDirection) {
            this.spinImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx); 
        
        if (mo.otherDirection) {
            this.spinImageBack(mo);
        }
    }

    spinImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width / 2, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-(mo.x + mo.width / 2), 0);
    }

    spinImageBack(mo) {
        this.ctx.restore();
    }
}