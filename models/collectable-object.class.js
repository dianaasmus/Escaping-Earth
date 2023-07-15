class CollectableObject extends MovableObject {
    world;
    height = 60;
    width = 50;
    // shift = -1; // Startverschiebung
    // y;
    
    // shift = -1; // Startverschiebung
    // minY = this.y - 10; // Untere Grenze des Bewegungsbereichs
    // maxY = this.y + 10; // Obere Grenze des Bewegungsbereichs


    constructor() {
        super();
    }


    // floatingObject(y) {
    //     // this.y = y;
    //     let minY = y - 10; // Untere Grenze des Bewegungsbereichs
    //     let maxY = y + 10; // Obere Grenze des Bewegungsbereichs
        
    //     y += this.shift; // Verschiebung hinzufügen 
    //     // += : this.y wird um shift(-1) erhöht und gleichzeitig das Ergebnis als Wert erhalten

    //     if (y <= minY || y >= maxY) {
    //         this.shift *= -1; // Ändere die Richtung der Verschiebung (-1 * (-1)) => shift ≠ -1 => shift = 1;
    //     }

    //     this.y = y;
    //     return this.y;
    // }
}