/**
 * Endboss
 * Boss enemy that can alert, attack and spawn smaller chickens.
 * @extends MovableObject
 */
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
    isAttacking = false;
    isWalking = false;
    hitCount = 0;
    deadAnimationPlayed = false;
    speed = 2;

    constructor() {
        /**
         * Initialize the endboss, preload images and start AI/animations.
         * @returns {void}
         */
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
    }

    startChickenSpawn() {
        /**
         * Periodically spawn small chickens when the endboss is alerted.
         * @returns {void}
         */
        let spawnChicken = () => {
            if (this.isDead) return;
            if (this.world && this.world.level && this.world.level.enemies && this.isAlerted) {
                let chicken = new Chicken();
                chicken.x = this.x + 50 + Math.random() * 100;
                chicken.y = 365;
                chicken.speed = 8;
                chicken.isEndbossChicken = true;
                this.world.level.enemies.push(chicken);
            }
            let next = 2000 + Math.random() * 0.0001;
            this._chickenSpawnTimeout = setTimeout(spawnChicken, next);
        };
        spawnChicken();
    }

    startMovement() {
        /**
         * Start AI movement timers for walking behavior and position updates.
         * @returns {void}
         */
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
        /**
         * Start the animation interval which updates sprite state.
         * @returns {void}
         */
        let animInterval = setInterval(() => this._updateAnim(), 200);
        gameIntervals.push(animInterval);
    }

    _updateAnim() {
        /**
         * Per-tick animation update, handling death, hurt and action states.
         * @returns {void}
         */
        if (this._handleDeath()) return;
        if (this.isHurt) { this.playAnimation(this.IMAGES_HURT); return; }
        if (this._handleActionAnimations()) return;
        this.loadImage(this.IMAGES_ALERT[0]);
    }

    _handleDeath() {
        /**
         * Play death animation once and return whether death handling occurred.
         * @returns {boolean}
         */
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
        /**
         * Handle attack/walk/alert animations and return whether any applied.
         * @returns {boolean}
         */
        if (this.isAttacking) { this.playAnimation(this.IMAGES_ATTACK); return true; }
        if (this.isWalking && this.isAlerted) { this.playAnimation(this.IMAGES_WALKING); return true; }
        if (this.isAlerted) { this.playAnimation(this.IMAGES_ALERT); return true; }
        return false;
    }

    alert() {
        /**
         * Set the endboss into alerted state and start boss music.
         * @returns {void}
         */
        if (!this.isAlerted) {
            this.isAlerted = true;
            this.endboss_music.play();
            if (typeof backgroundMusic !== 'undefined') {
                backgroundMusic.pause();
            }
        }
    }

    attack() {
        /**
         * Begin attack state if conditions allow.
         * @returns {void}
         */
        if (!this.isDead && !this.isHurt && this.isAlerted) {
            this.isAttacking = true;
        }
    }

    stopAttack() {
        /**
         * Stop attacking.
         * @returns {void}
         */
        this.isAttacking = false;
    }

    hit() {
        /**
         * Apply a hit to the endboss, update energy and handle death conditions.
         * @returns {void}
         */
        if (this.isDead) return;
        this.isHurt = true;
        this.hitCount++;
        // 3 Treffer = tot, 1 Treffer = 80%, 2 Treffer = 20%
        if (this.hitCount >= 3) {
            this.energy = 0;
            this.isDead = true;
            this.endboss_music.pause();
            if (this._chickenSpawnTimeout) clearTimeout(this._chickenSpawnTimeout);
        } else if (this.hitCount === 2) {
            this.energy = 20;
        } else if (this.hitCount === 1) {
            this.energy = 80;
        }
        setTimeout(() => {
            this.isHurt = false;
        }, 500);
    }
}
    
