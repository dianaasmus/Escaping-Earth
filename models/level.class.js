class Level {
    enemies;
    backgrounds;
    positions;
    level_end_x = 2260;

    constructor(enemies, backgrounds, positions) {
        this.enemies = enemies;
        this.backgrounds = backgrounds;
        this.positions = positions;
    }
}