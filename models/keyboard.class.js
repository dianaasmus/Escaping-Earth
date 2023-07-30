class Keyboard {
    KEY_LEFT = false;
    KEY_RIGHT = false;
    KEY_UP = false;
    KEY_TAB = false;


    constructor() {
        this.isKeyDown();
        this.isKeyUp();
    }

    
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
    

    bindBtnsPressEvents() {
        this.jumpBtn();
        this.shootBtn();
        this.leftBtn();
        this.rightBtn();
    }


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