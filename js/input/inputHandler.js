export class InputHandler {
    constructor() {
        this.keysPressed = [];
        this._listen();
    }

    _listen() {
        document.addEventListener('keydown', (e) => {
            if (e.key.length === 1) {
                this.keysPressed.push(e.key.toLowerCase());
            } else if (e.key === 'Enter' || e.key === 'Escape' ||
                       e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
                       e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.keysPressed.push(e.key);
            }
            // Prevent space from scrolling
            if (e.key === ' ') {
                e.preventDefault();
                this.keysPressed.push(' ');
            }
        });
    }

    getKeys() {
        return this.keysPressed;
    }

    flush() {
        this.keysPressed = [];
    }
}
