class Level {
    enemies;
    endboss;
    lives;
    ammunition;
    backgrounds;
    positions;
    level_end_x;


    /**
     * Level class constructor.
     * @param {Array<Enemy>} enemies - An array with the enemies in the level.
     * @param {Array<Endboss>} endboss - An array with the end boss of the level.
     * @param {Array<Lives>} lives - An array with the lives in the level.
     * @param {Array<Ammunition>} ammunition - An array with the ammunition in the level.
     * @param {Array<string>} backgrounds - An array with the paths to the background images in the level.
     * @param {array<number>} positions - An array with the X positions of the background images in the level.
     */
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