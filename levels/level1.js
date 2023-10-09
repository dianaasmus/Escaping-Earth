let level1;


/**
 * Initializes level1 with the necessary elements and arrays for the game's first level.
 * The level1 variable will hold an instance of the Level class with all the required entities and backgrounds.
 * This function should be called when setting up the first level of the game.
 */
function initLevel() {
    // Create instances of various classes and store them in arrays.
    const livesArray = Array(3).fill().map(() => new Lives());
    const ammunitionArray = Array(3).fill().map(() => new Ammunition());
    const runningZombieArray = Array(17).fill().map((_, index) => new RunningZombie(index + 1));
    const endbossArray = Array(3).fill().map((_, index) => new Endboss(index + 1));
    const zombieArray = Array(10).fill().map((_, index) => new Zombie(index + 18));
    const buildings = ['img/background/building-1.png', 'img/background/building-2.png', 'img/background/building-3.png'];

    // Create the level1 instance with the entities and backgrounds.
    level1 = new Level(
        [...runningZombieArray, ...zombieArray],
        [...endbossArray],
        [...livesArray],
        [...ammunitionArray],
        [
            'img/background/sky.png',
            'img/background/buildings-bg.png',
            buildings,
            'img/background/street-lamp.png'
        ],
        [0, 720, 1440, 2160, 2880, 3600, 4320]
    );
}