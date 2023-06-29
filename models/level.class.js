class Level {
    enemies;
    lives;
    ammunition;
    backgrounds;
    positions;
    level_end_x;

    constructor(enemies, lives, ammunition, backgrounds, positions) {
        this.enemies = enemies;
        this.lives = lives;
        this.ammunition = ammunition;
        this.backgrounds = backgrounds;
        this.positions = positions;
        this.level_end_x = this.positions.pop();
    }
}