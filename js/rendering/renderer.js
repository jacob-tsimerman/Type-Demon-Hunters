export class Renderer {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawText(text, x, y, { color = '#ffffff', size = 24, align = 'center', font = 'monospace' } = {}) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px ${font}`;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, x, y);
    }

    drawTile(tile, isTarget) {
        const { x, y, width, height, text, typed, color } = tile;

        // Tile background
        this.ctx.fillStyle = isTarget ? color : this.dimColor(color);
        this.ctx.globalAlpha = isTarget ? 1.0 : 0.5;
        this.ctx.fillRect(x, y, width, height);

        // Border
        this.ctx.strokeStyle = isTarget ? '#ffffff' : '#666666';
        this.ctx.lineWidth = isTarget ? 2 : 1;
        this.ctx.strokeRect(x, y, width, height);

        this.ctx.globalAlpha = 1.0;

        // Letter(s)
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        const fontSize = Math.min(24, width / text.length * 1.2);
        this.ctx.font = `bold ${fontSize}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        if (typed.length > 0) {
            // Draw typed portion in green
            const fullWidth = this.ctx.measureText(text).width;
            const typedText = text.slice(0, typed.length);
            const remainText = text.slice(typed.length);
            const typedWidth = this.ctx.measureText(typedText).width;
            const remainWidth = this.ctx.measureText(remainText).width;
            const startX = centerX - fullWidth / 2;

            this.ctx.textAlign = 'left';
            this.ctx.fillStyle = '#4ade80';
            this.ctx.fillText(typedText, startX, centerY);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(remainText, startX + typedWidth, centerY);
        } else {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(text, centerX, centerY);
        }
    }

    drawTileDestroy(tile) {
        const { x, y, width, height } = tile;
        const progress = 1 - (tile.destroyTimer / 0.15);
        const expand = progress * 10;

        this.ctx.globalAlpha = 1 - progress;
        this.ctx.fillStyle = '#4ade80';
        this.ctx.fillRect(
            x - expand, y - expand,
            width + expand * 2, height + expand * 2
        );
        this.ctx.globalAlpha = 1.0;
    }

    drawDangerZone(groundY) {
        this.ctx.strokeStyle = '#e94560';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([8, 4]);
        this.ctx.beginPath();
        this.ctx.moveTo(0, groundY);
        this.ctx.lineTo(this.width, groundY);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    drawHUD(levelNumber, tilesRemaining, totalTiles) {
        this.drawText(`Level ${levelNumber}`, 70, 25, { size: 16, color: '#888888' });
        this.drawText(`${tilesRemaining} left`, this.width - 70, 25, { size: 16, color: '#888888' });
    }

    dimColor(hex) {
        // Simple dim: blend toward dark
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const dr = Math.floor(r * 0.4);
        const dg = Math.floor(g * 0.4);
        const db = Math.floor(b * 0.4);
        return `rgb(${dr},${dg},${db})`;
    }
}
