class Endboss extends MovableObject {

    IMAGES_WALKING = [
        "img/4_enemies_boss_chicken/chicken_normal/1_walk/1_w.png",
        "img/4_enemies_boss_chicken/chicken_normal/1_walk/2_w.png",
        "img/4_enemies_boss_chicken/chicken_normal/1_walk/3_w.png",
        "img/4_enemies_boss_chicken/chicken_normal/1_walk/4_w.png",

        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

       constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 2000;
        this.y = 365;
        this.height = 200;
        this.width = 150;
        this.speed = 0.15;
        }
}