let level1;


/**
 * Initializes level1 with the necessary elements and arrays for the game's first level.
 */
function initLevel() {
    const livesArray = Array(3).fill().map(() => new Lives());
    const ammunitionArray = Array(3).fill().map(() => new Ammunition());
    const runningZombieArray = Array(17).fill().map((_, index) => new RunningZombie(index + 1));
    const endbossArray = Array(3).fill().map((_, index) => new Endboss(index + 1));
    const zombieArray = Array(10).fill().map((_, index) => new Zombie(index + 18));
    const buildings = ['assets/img/background/building-1.png', 'assets/img/background/building-2.png', 'assets/img/background/building-3.png'];

    level1 = new Level(
        [...runningZombieArray, ...zombieArray],
        [...endbossArray],
        [...livesArray],
        [...ammunitionArray],
        [
            'assets/img/background/sky.png',
            'assets/img/background/buildings-bg.png',
            buildings,
            'assets/img/background/street-lamp.png'
        ],
        [0, 720, 1440, 2160, 2880, 3600, 4320]
    );
}