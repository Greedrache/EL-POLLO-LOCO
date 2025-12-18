class Level {
    enemies;
    clouds;
    backgroundObject;
    bottles;
    level_end_x = 2500;

    constructor(enemies, clouds, backgroundObject, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.bottles = bottles || [];
    }
}