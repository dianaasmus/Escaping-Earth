class CollectableObject extends MovableObject {
    world;
    height = 60;
    width = 50;
    y = 390; 
    shift = -1; // Startverschiebung
    minY = 375; // Untere Grenze des Bewegungsbereichs
    maxY = 400; // Obere Grenze des Bewegungsbereichs

    
    constructor() {
        super();
    }


    float() {
        this.setStoppableInterval(this.floatingObject, 1000 / 15);
    }


    floatingObject() {
        this.y += this.shift; // Verschiebung hinzufügen 
        // += : y wird um shift(-1) erhöht und gleichzeitig das Ergebnis als Wert erhalten

        if (this.y <= this.minY || this.y >= this.maxY) {
            this.shift *= -1; // Ändere die Richtung der Verschiebung (-1 * (-1)) => shift ≠ -1 => shift = 1;
        }
    }
}