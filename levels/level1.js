

let level1;

function initLevel() {
    const livesArray = Array(5).fill().map(() => new Lives());
    const ammunitionArray = Array(5).fill().map(() => new Ammunition());
    const runningZombieArray = Array(5).fill().map(() => new RunningZombie());
    const endbossArray = Array(3).fill().map((_, index) => new Endboss(index + 1));
    const zombieArray = Array(5).fill().map(() => new Zombie());
    // const backgroundsArray = new BackgroundObject();

    level1 = new Level(
        [...runningZombieArray, ...zombieArray],
        [...endbossArray],
        [...livesArray],
        [...ammunitionArray],
        [
            'img/background/Sky.png',
            'img/background/Background.png',
            // new BackgroundObject(),
            // 'img/background/Foreground-1.png',
            'img/background/Ground.png'
        ],
        [
            0,
            720,
            (720 * 2),
            2160,
            2260
        ]
    );

}