let level1;

function initLevel() {
    const livesArray = Array(3).fill().map(() => new Lives());
    const ammunitionArray = Array(3).fill().map(() => new Ammunition());
    const runningZombieArray = Array(17).fill().map(() => new RunningZombie());
    const endbossArray = Array(3).fill().map((_, index) => new Endboss(index + 1));
    const zombieArray = Array(10).fill().map(() => new Zombie());
    const buildings = ['img/background/building-1.png', 'img/background/building-2.png', 'img/background/building-3.png'];


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
        [
            0,
            720,
            1440,
            2160,
            2880,
            3600,
            4320
        ]
    );

}