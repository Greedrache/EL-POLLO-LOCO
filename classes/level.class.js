class Level {
    enemies;
    clouds;
    backgroundObject;
    bottles;
    coins;
    level_end_x = 4400;

    constructor(enemies, clouds, backgroundObject, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.bottles = bottles || [];
        this.coins = coins || [];
    }
}