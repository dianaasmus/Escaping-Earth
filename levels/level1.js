const livesArray = Array(5).fill().map(() => new Lives());
const runningZombieArray = Array(5).fill().map(() => new RunningZombie());
const endbossArray = Array(3).fill().map(() => new Endboss());
const zombieArray = Array(10).fill().map(() => new Zombie());

const level1 = new Level(
    [...livesArray, ...runningZombieArray, ...endbossArray, ...zombieArray],
    [
        'img/background/Sky.png',
        'img/background/Background.png',
        'img/background/Foreground.png',
        'img/background/Ground.png'
    ],
    [
        0,
        720, 
        1440, 
        2160,
        2260
    ]
);