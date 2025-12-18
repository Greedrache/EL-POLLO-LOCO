let level1;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud(0),
            new Cloud(600),
            new Cloud(1200),
            new Cloud(1800),
            new Cloud(2400)
        ],
        [new BackgroundObject("img/5_background/layers/air.png", -720),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720),

        new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

        new BackgroundObject("img/5_background/layers/air.png", 720),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),

        new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 2),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 2),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 2),

        new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720 * 3),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720 * 3),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720 * 3),

        new BackgroundObject("img/5_background/layers/air.png", 720 * 4),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 4),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 4),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 4),

        new BackgroundObject("img/5_background/layers/air.png", 720 * 5),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720 * 5),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720 * 5),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720 * 5),

        new BackgroundObject("img/5_background/layers/air.png", 720 * 6),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 6),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 6),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 6),
        ],
        [
            new Bottle(300),
            new Bottle(600),
            new Bottle(900),
            new Bottle(1300),
            new Bottle(1700),
            new Bottle(2000)
        ],
        [
            new Coin(400, 350),
            new Coin(800, 200),
            new Coin(1200, 280),
            new Coin(1800, 150),
            new Coin(2500, 320)
        ]
    );
}