const zombieArray = Array(10).fill().map(() => new Zombie());
const runningZombieArray = Array(5).fill().map(() => new RunningZombie());
const endbossArray = Array(3).fill().map(() => new Endboss());

const level1 = new Level(
    [...zombieArray, ...runningZombieArray, ...endbossArray],
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