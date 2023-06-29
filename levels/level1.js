const livesArray = Array(5).fill().map(() => new Lives());
const ammunitionArray = Array(5).fill().map(() => new Ammunition());
const runningZombieArray = Array(5).fill().map(() => new RunningZombie());
const endbossArray = Array(3).fill().map(() => new Endboss());
const zombieArray = Array(5).fill().map(() => new Zombie());

const level1 = new Level(
    [...runningZombieArray, ...endbossArray, ...zombieArray],
    [...livesArray],
    [...ammunitionArray],
    [
       'img/background/Sky.png',
       'img/background/Background.png',
       'img/background/Foreground.png',
       'img/background/Ground.png',
    //    'img/background/Design_ohne_Titel-removebg-preview.png'
    //    new BackgroundObject()
    ],
    [
        0,
        720, 
        1440, 
        2160,
        2260
    ]
);