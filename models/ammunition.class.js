class Ammunition extends CollectableObject {
    width = 60;
    y = 280;

    shift = -1; // Startverschiebung
    minY = this.y - 10; // Untere Grenze des Bewegungsbereichs
    maxY = this.y + 10; // Obere Grenze des Bewegungsbereichs

    offset = {
        top : 15,
        right : 15,
        bottom: 15,
        left: 15,
        color: 'green' // Neue color-Eigenschaft hinzugefügt
    }


    constructor() {
        super().loadImage('img/ammunition/13.png');
        this.x = 200 + Math.random() * 2060;
        this.setStoppableInterval(this.floatingObject, 1000 / 15);
        // setInterval( () => {
        //     this.floatingObject(this.y);
        // }, 1000 / 15 );
    }

    floatingObject() {
        this.y += this.shift; // Verschiebung hinzufügen 
        // += : this.y wird um shift(-1) erhöht und gleichzeitig das Ergebnis als Wert erhalten

        if (this.y <= this.minY || this.y >= this.maxY) {
            this.shift *= -1; // Ändere die Richtung der Verschiebung (-1 * (-1)) => shift ≠ -1 => shift = 1;
        }
    }
}