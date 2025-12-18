class Endboss extends MovableObject {

    y = 60;
    height = 400;
    width = 350;
    isAlerted = false;
    endboss_music = new Audio('audio/Endboss-Musik.mp3');
    
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

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/3_hurt/G21.png",
        "img/4_enemie_boss_chicken/3_hurt/G22.png",
        "img/4_enemie_boss_chicken/3_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/4_dead/G24.png",
        "img/4_enemie_boss_chicken/4_dead/G25.png",
        "img/4_enemie_boss_chicken/4_dead/G26.png",
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 3800;
        this.endboss_music.loop = true;
        this.endboss_music.volume = 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isAlerted) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
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
}
    
