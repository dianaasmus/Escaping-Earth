let level1;

function initLevel() {
    const livesArray = Array(3).fill().map(() => new Lives());
    const ammunitionArray = Array(3).fill().map(() => new Ammunition());
    const runningZombieArray = Array(5).fill().map(() => new RunningZombie());
    const endbossArray = Array(3).fill().map((_, index) => new Endboss(index + 1));
    const zombieArray = Array(5).fill().map(() => new Zombie());
    const buildings = ['img/background/Foreground-1.png', 'img/background/Foreground-2.png', 'img/background/Foreground-3.png'];


    level1 = new Level(
        [...runningZombieArray, ...zombieArray],
        [...endbossArray],
        [...livesArray],
        [...ammunitionArray],
        [
            'img/background/Sky.png',
            'img/background/Background.png',
            'img/background/Foreground-1.png',
            // buildings,
            'img/background/Ground.png'
        ],
        // ['img/background/Foreground-1.png', 'img/background/Foreground-2.png', 'img/background/Foreground-3.png'],
        [
            0,
            720,
            1440,
            2160,
            2280
        ]
    );

}