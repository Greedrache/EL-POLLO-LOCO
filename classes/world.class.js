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
    statusbarEndboss = new EndbossStatusbar();
    throwableObjects = [];
    gameOverScreen = new GameOverScreen();
    gameWinScreen = new GameOverScreen();
    gameOver = false;
    gameWon = false;
    collectedBottles = 0;
    collectedCoins = 0;
    bottle_collect_sound = new Audio('audio/bottle-collect.mp3');
    coin_collect_sound = new Audio('audio/collectcoin.wav');
    throw_bottle_sound = new Audio('audio/trowbottle.mp3');
    game_won_sound = new Audio('audio/youwon.mp3');
    game_lost_sound = new Audio('audio/gamelost.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.game_won_sound.volume = 0.5;
        this.game_lost_sound.volume = 0.5;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    run() {
        let intervalId = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkClouds();
            this.checkBottleCollisions();
            this.checkCoinCollisions();
            this.checkThrowableCollisions();
            this.checkEndbossAlert();
        }, 50); // reduced interval for more reliable collision detection (was 200ms)
        gameIntervals.push(intervalId);
    }

    checkEndbossAlert() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                if (this.character.x > enemy.x - 500) {
                    enemy.alert();
                }
                
                if (this.character.x > enemy.x - 200 && enemy.isAlerted) {
                    enemy.attack();
                } else {
                    enemy.stopAttack();
                }
            }
        });
    }

    checkGameWon() {
        if (!this.gameWon) {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && enemy.isDead && enemy.deadAnimationPlayed) {
                    this.gameWon = true;
                    this.gameWinScreen.showWinScreen();
                    enemy.endboss_music.pause();
                    this.game_won_sound.play();
                    setTimeout(() => {
                        showReplayScreen();
                    }, 3000);
                }
            });
        }
    }

    checkClouds() {
        let cameraRight = -this.camera_x + 720;
        let cameraLeft = -this.camera_x;
        
        this.level.clouds.forEach((cloud) => {
            
            if (cloud.x + cloud.width < cameraLeft - 100) {
                cloud.x = cameraRight + Math.random() * 300;
                cloud.y = 20 + Math.random() * 50;
                let randomImage = cloud.IMAGES_CLOUDS[Math.floor(Math.random() * 2)];
                cloud.loadImage(randomImage);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.THROW && this.collectedBottles > 0 && !this.character.isDead()) {
            let throwableObject = new ThrowableObject(
                this.character.x + 100,
                this.character.y + 100
            );
            this.throwableObjects.push(throwableObject);
            this.collectedBottles--;
            this.statusbarBottle.setPercentage(this.collectedBottles * 20);
            this.throw_bottle_sound.play();
            this.keyboard.THROW = false;
        }
    }

    draw() {
        this._drawClearAndStage();
        this._drawUI();
        this._drawThrowables();
        this._handleGameOverAndWin();
        requestAnimationFrame(() => this.draw());
    }

    _drawClearAndStage() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjecttoMap(this.level.backgroundObject);
        this.addObjecttoMap(this.level.clouds);
        this.addObjecttoMap(this.level.bottles);
        this.addObjecttoMap(this.level.coins);
        this.addObjecttoMap(this.level.enemies);
        this.addtoMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    _drawUI() {
        this.addtoMap(this.statusbar);
        this.addtoMap(this.statusbarBottle);
        this.addtoMap(this.statusbarCoin);
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss && !endboss.isDead && endboss.isAlerted) {
            this.statusbarEndboss.setPercentage(endboss.energy || 100);
            this.statusbarEndboss.draw(this.ctx);
        }
    }

    _drawThrowables() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjecttoMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    _handleGameOverAndWin() {
        if (this.character.isDead() && !this.gameOver) {
            this.gameOver = true;
            this.addtoMap(this.gameOverScreen);
            this.game_lost_sound.play();
            this.level.enemies.forEach((enemy) => { if (enemy instanceof Endboss) enemy.endboss_music.pause(); });
            setTimeout(() => { showReplayScreen(); }, 3000);
        } else if (this.gameOver) {
            this.addtoMap(this.gameOverScreen);
        }
        this.checkGameWon();
        if (this.gameWon) this.addtoMap(this.gameWinScreen);
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
        // ...

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
        if (this.gameWon) return;
        this.level.enemies.forEach((enemy, index) => this._handleEnemyCollision(enemy, index));
    }

    _handleEnemyCollision(enemy, index) {
        if (!this.character.isColliding(enemy)) return;
        if (enemy instanceof Endboss && !enemy.isDead) { this.character.energy = 0; this.statusbar.setPercentage(0); return; }
        if (enemy.isEndbossChicken && !enemy.chickenDead) { this.character.energy = 0; this.statusbar.setPercentage(0); return; }
        if (this.character.isAboveGround() && this.character.speedY < 0 && !enemy.chickenDead) { this._handleStomp(enemy); return; }
        if (!enemy.chickenDead) { this.character.hit(); this.statusbar.setPercentage(this.character.energy); }
    }

    _handleStomp(enemy) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (!enemy.chickenDead) {
                    enemy.die();
                    this.character.speedY = 15;
                    setTimeout(() => {
                        const idx = this.level.enemies.indexOf(enemy);
                        if (idx !== -1) this.level.enemies.splice(idx, 1);
                    }, 50);
                }
            }, i * 30);
        }
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.collectedBottles++;
                if (this.collectedBottles > 5) this.collectedBottles = 5;
                this.statusbarBottle.setPercentage(this.collectedBottles * 20);
                this.bottle_collect_sound.play();
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.collectedCoins++;
                if (this.collectedCoins > 5) this.collectedCoins = 5;
                this.statusbarCoin.setPercentage(this.collectedCoins * 20);
                this.coin_collect_sound.play();
            }
        });
    }

    checkThrowableCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            
            if (bottle.hasHitGround() && !bottle.isSplashing) {
                bottle.splash();
                setTimeout(() => {
                    this.throwableObjects.splice(bottleIndex, 1);
                }, 500);
            }
            
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && bottle.isColliding(enemy) && !bottle.isSplashing) {
                    bottle.splash();
                    enemy.hit();
                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 500);
                }
            });
        });
    }
}