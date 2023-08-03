class Keyboard {
    KEY_LEFT = false;
    KEY_RIGHT = false;
    KEY_UP = false;
    KEY_TAB = false;
    world;


    /**
     * Constructor of the Keyboard class.
     * Initializes the keyboard controls and binds the event listeners for keyboard and touch events.
     */
    constructor() {
        this.isKeyDown();
        this.isKeyUp();
    }


    /**
     * Event listener for key presses.
     * Sets the corresponding flags based on the pressed keys.
     */
    isKeyDown() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) {
                keyboard.KEY_RIGHT = true;
            }
            if (e.keyCode == 37) {
                keyboard.KEY_LEFT = true;
            }
            if (e.keyCode == 38) {
                keyboard.KEY_UP = true;
            }
            if (e.keyCode == 32) {
                keyboard.KEY_TAB = true;
            }
        });
    }


    /**
     * Event listener for keys released.
     * Resets the corresponding flags when the keys are released.
     */
    isKeyUp() {
        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 39) {
                keyboard.KEY_RIGHT = false;
            }
            if (e.keyCode == 37) {
                keyboard.KEY_LEFT = false;
            }
            if (e.keyCode == 38) {
                keyboard.KEY_UP = false;
            }
            if (e.keyCode == 32) {
                keyboard.KEY_TAB = false;
            }
        });
    }


    /**
     * Binds the event listeners for the button buttons in the game.
     */
    bindBtnsPressEvents() {
        this.jumpBtn();
        this.shootBtn();
        this.leftBtn();
        this.rightBtn();
    }


    /**
     * Event listener for the jump button touch event.
     * Sets the corresponding flag based on the button touch.
     */
    jumpBtn() {
        document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_UP = true;
        });
        document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_UP = false;
        });
    }


    /**
     * Event listener for the shoot button touch event.
     * Sets the corresponding flag based on the touch of the button.
     */
    shootBtn() {
        document.getElementById('shootBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_TAB = true;
        });
        document.getElementById('shootBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_TAB = false;
        });
    }


    /**
     * Event listener for the left button touch event.
     * Sets the corresponding flag based on the touch of the button.
     */
    leftBtn() {
        document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_LEFT = true;
        });
        document.getElementById('leftBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_LEFT = false;
        });
    }


    /**
     * Event listener for the right button touch event.
     * Sets the corresponding flag based on the touch of the button.
     */
    rightBtn() {
        document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_RIGHT = true;
        });
        document.getElementById('rightBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_RIGHT = false;
        });
    }
}