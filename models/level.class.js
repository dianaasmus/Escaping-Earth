class Level {
    enemies;
    endboss;
    lives;
    ammunition;
    backgrounds;
    buildings;
    positions;
    level_end_x;

    constructor(enemies, endboss, lives, ammunition, backgrounds, buildings, positions) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.lives = lives;
        this.ammunition = ammunition;
        this.backgrounds = backgrounds;
        this.buildings = buildings;
        this.positions = positions;
        this.level_end_x = this.positions.pop();
    }
}