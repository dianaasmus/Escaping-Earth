class BatteryStatusBar extends DrawableObject {
    percentage = 10;
    

    IMAGES_BATTERY = [ //Versalien = Konstante
        'img/battery/battery-0.png',
        'img/battery/battery-20.png',
        'img/battery/battery-40.png',
        'img/battery/battery-60.png',
        'img/battery/battery-80.png',
        'img/battery/battery-100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_BATTERY);
        this.x = 500;
        this.y = 30;
        this.width = 180;
        this.height = 30;
        this.setPercentage(10);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BATTERY[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}