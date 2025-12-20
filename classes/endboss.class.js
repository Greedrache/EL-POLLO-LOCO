class Endboss extends MovableObject {
    y = 60;
    height = 400;
    width = 350;
    isAlerted = false;
    endboss_music = new Audio('audio/Endboss-Musik.mp3');
    energy = 100;
    hitCount = 0;
    
    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];
    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];
    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    isHurt = false;
    isDead = false;
    isPhase2 = false;
    phase2Music = null;
    phase2Lives = 5;
    phase2CurrentLives = 0;
    isAttacking = false;
    isWalking = false;
    hitCount = 0;
    deadAnimationPlayed = false;
    speed = 2;

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3800;
        this.endboss_music.loop = true;
        this.endboss_music.volume = 0.5;
        this.animate();
        this.startMovement();
        this.startChickenSpawn();
        this.startBottleSpawn();
    }

    startBottleSpawn() {
        let spawnBottle = () => {
            if (this.isDead) return;
            if (this.world && this.world.level && this.world.level.bottles && this.isAlerted) {
                // prevent too many bottles
                if (this.world.level.bottles.length < 12) {
                        // Spawn bottles to the left of the boss so the player can reach them
                        // spawn between 100 and 500 px left of boss
                        let bx = this.x - (100 + Math.random() * 400);
                        if (bx < 0) bx = 50; // keep inside level
                        let bottle = new Bottle(bx);
                    this.world.level.bottles.push(bottle);
                }
            }
                // next spawn between 1s and 3s (more frequent)
                let next = 1000 + Math.random() * 2000;
            this._bottleSpawnTimeout = setTimeout(spawnBottle, next);
        };
        spawnBottle();
    }

    startChickenSpawn() {
        let spawnChicken = () => {
            if (this.isDead) return;
            if (this.world && this.world.level && this.world.level.enemies && this.isAlerted) {
                let baby = new BabyChicken();
                baby.x = this.x + 50 + Math.random() * 100;
                baby.y = 365;
                baby.speed = 8;
                baby.isEndbossChicken = true;
                this.world.level.enemies.push(baby);
            }
            let next = 2000 + Math.random() * 0.0001;
            this._chickenSpawnTimeout = setTimeout(spawnChicken, next);
        };
        spawnChicken();
    }

    startMovement() {
        
        let walkInterval = setInterval(() => {
            if (this.isAlerted && !this.isDead && !this.isHurt) {
                this.isWalking = Math.random() > 0.3;
            }
        }, 1000);
        gameIntervals.push(walkInterval);

        let moveInterval = setInterval(() => {
            if (this.isWalking && this.isAlerted && !this.isDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
        gameIntervals.push(moveInterval);
    }

    animate() {
        let animInterval = setInterval(() => this._updateAnim(), 200);
        gameIntervals.push(animInterval);
    }

    _updateAnim() {
        if (this._handleDeath()) return;
        if (this.isHurt) { this.playAnimation(this.IMAGES_HURT); return; }
        if (this._handleActionAnimations()) return;
        this.loadImage(this.IMAGES_ALERT[0]);
    }

    _handleDeath() {
        if (!this.isDead) return false;
        if (!this.deadAnimationPlayed) {
            this.playAnimation(this.IMAGES_DEAD);
            if (this.currentImage >= this.IMAGES_DEAD.length) {
                this.deadAnimationPlayed = true;
                this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
            }
        }
        return true;
    }

    _handleActionAnimations() {
        if (this.isAttacking) { this.playAnimation(this.IMAGES_ATTACK); return true; }
        if (this.isWalking && this.isAlerted) { this.playAnimation(this.IMAGES_WALKING); return true; }
        if (this.isAlerted) { this.playAnimation(this.IMAGES_ALERT); return true; }
        return false;
    }

    alert() {
        if (!this.isAlerted) {
            this.isAlerted = true;
            this.endboss_music.play();
            if (typeof backgroundMusic !== 'undefined') {
                backgroundMusic.pause();
            }
        }
    }

    attack() {
        if (!this.isDead && !this.isHurt && this.isAlerted) {
            this.isAttacking = true;
        }
    }

    stopAttack() {
        this.isAttacking = false;
    }

    hit() {
        if (this.isDead) return;
        this.isHurt = true;
        this.hitCount++;
        // Enter phase 2 on 3 hits (instead of dying). In phase2 another 3 hits will kill the boss.
        if (!this.isPhase2) {
            if (this.hitCount >= 3) {
                // start phase 2
                this.isPhase2 = true;
                this.hitCount = 0; // reset
                this.phase2CurrentLives = this.phase2Lives; // set lives (5)
                this.energy = 100;
                // stop first music and play a single phase-2 signal sound
                try { this.endboss_music.pause(); } catch (e) {}
                this.phase2Music = new Audio('audio/bossphase2.mp3');
                this.phase2Music.loop = false; // play only once to signal phase 2 start
                this.phase2Music.volume = 0.7;
                this.phase2Music.play();
                // make boss stronger in phase2
                this.speed += 1.5;
            } else if (this.hitCount === 2) {
                this.energy = 20;
            } else if (this.hitCount === 1) {
                this.energy = 80;
            }
        } else {
            // phase2: use discrete lives (5)
            this.phase2CurrentLives--;
            if (this.phase2CurrentLives < 0) this.phase2CurrentLives = 0;
            // update energy so existing statusbar code reflects remaining lives
            this.energy = Math.round((this.phase2CurrentLives / this.phase2Lives) * 100);
            if (this.phase2CurrentLives <= 0) {
                this.energy = 0;
                this.isDead = true;
                try { this.phase2Music.pause(); } catch (e) {}
                if (this._chickenSpawnTimeout) clearTimeout(this._chickenSpawnTimeout);
                if (this._bottleSpawnTimeout) clearTimeout(this._bottleSpawnTimeout);
            }
        }

        setTimeout(() => {
            this.isHurt = false;
        }, 500);
    }
}
    
