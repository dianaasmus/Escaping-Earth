class Level {
    enemies;
    backgrounds;
    positions;
    level_end_x;

    constructor(enemies, backgrounds, positions) {
        this.enemies = enemies;
        this.backgrounds = backgrounds;
        this.positions = positions;
        this.level_end_x = this.positions.pop();
    }
}