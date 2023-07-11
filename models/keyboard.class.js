class Keyboard {
    KEY_LEFT = false;
    KEY_RIGHT = false;
    KEY_UP = false;
    KEY_TAB = false;
    isMobileDevice = 'ontouchstart' in window;

    constructor() {
        this.bindKeyPressEvents();
    }

    bindKeyPressEvents() {
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

    bindBtnsPressEvents() {
        document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_UP = true;
        });
        document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_UP = false;
        });

        document.getElementById('shootBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_TAB = true;
        });
        document.getElementById('shootBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_TAB = false;
        });

        document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_LEFT = true;
        });
        document.getElementById('leftBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_LEFT = false;
        });

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