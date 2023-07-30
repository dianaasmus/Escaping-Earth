class Level {
    enemies;
    endboss;
    lives;
    ammunition;
    backgrounds;
    positions;
    level_end_x;

    
    constructor(enemies, endboss, lives, ammunition, backgrounds, positions) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.lives = lives;
        this.ammunition = ammunition;
        this.backgrounds = backgrounds;
        this.positions = positions;
        this.level_end_x = this.positions.pop();
    }
}