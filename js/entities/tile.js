export class Tile {
    constructor(text, column, x, y, speed, color) {
        this.text = text;
        this.column = column;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = Math.max(50, text.length * 28);
        this.height = 40;
        this.color = color;
        this.typed = '';
        this.alive = true;
        this.destroying = false;
        this.destroyTimer = 0;
    }

    update(dt) {
        if (this.destroying) {
            this.destroyTimer -= dt;
            if (this.destroyTimer <= 0) {
                this.alive = false;
            }
            return;
        }
        this.y += this.speed * dt;
    }

    hasReachedBottom(canvasHeight) {
        return this.y + this.height >= canvasHeight - 40;
    }

    typeChar(char) {
        const nextExpected = this.text[this.typed.length];
        if (char === nextExpected) {
            this.typed += char;
            if (this.typed === this.text) {
                this.destroying = true;
                this.destroyTimer = 0.15;
                return 'completed';
            }
            return 'hit';
        }
        return 'miss';
    }

    get remainingText() {
        return this.text.slice(this.typed.length);
    }
}
