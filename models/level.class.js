class Level {
    enemies;
    collection;
    backgrounds;
    positions;
    level_end_x;

    constructor(enemies, collection, backgrounds, positions) {
        this.enemies = enemies;
        this.collection = collection;
        this.backgrounds = backgrounds;
        this.positions = positions;
        this.level_end_x = this.positions.pop();
    }
}