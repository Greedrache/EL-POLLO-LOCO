class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObject = level1.backgroundObject;
    bottles = level1.bottles;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();
    throwableObjects = [];
    gameOverScreen = new GameOverScreen();
    gameOver = false;
    collectedBottles = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkClouds();
            this.checkBottleCollisions();
        }, 200);
    }

    checkClouds() {
        let cameraRight = -this.camera_x + 720;
        let cameraLeft = -this.camera_x;
        
        this.level.clouds.forEach((cloud) => {
            // Wenn Wolke links aus dem Bild verschwindet, rechts neu spawnen
            if (cloud.x + cloud.width < cameraLeft - 100) {
                cloud.x = cameraRight + Math.random() * 300;
                cloud.y = 20 + Math.random() * 50;
                let randomImage = cloud.IMAGES_CLOUDS[Math.floor(Math.random() * 2)];
                cloud.loadImage(randomImage);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.THROW && this.collectedBottles > 0) {
            let throwableObject = new ThrowableObject(
                this.character.x + 100,
                this.character.y + 100
            );
            this.throwableObjects.push(throwableObject);
            this.collectedBottles--;
            this.statusbarBottle.setPercentage(this.collectedBottles * 20);
            this.keyboard.THROW = false;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.translate(this.camera_x, 0); 

        this.addObjecttoMap(this.level.backgroundObject);
        
        this.addObjecttoMap(this.level.clouds);
        this.addObjecttoMap(this.level.bottles);
        this.addObjecttoMap(this.level.enemies);
        this.addtoMap(this.character);

        this.ctx.translate(-this.camera_x, 0); 
        this.addtoMap(this.statusbar);
        this.addtoMap(this.statusbarBottle);
        this.addtoMap(this.statusbarCoin);
        this.ctx.translate(this.camera_x, 0); 

        this.addObjecttoMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0); // Kamera zurücksetzen

        if (this.character.isDead()) {
            this.gameOver = true;
            this.addtoMap(this.gameOverScreen);
        }

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

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0 && !enemy.chickenDead) {
                    enemy.die();
                    this.character.speedY = 15;
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 1000);
                } else if (!enemy.chickenDead) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.collectedBottles++;
                if (this.collectedBottles > 5) this.collectedBottles = 5;
                this.statusbarBottle.setPercentage(this.collectedBottles * 20);
            }
        });
    }
}