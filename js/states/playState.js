import { TileManager } from '../entities/tileManager.js';
import { LEVELS } from '../levels/levelData.js';

export class PlayState {
    constructor() {
        this.tileManager = null;
        this.levelData = null;
        this.levelId = 1;
        this.highestUnlocked = 1;
        this.missFlashTimer = 0;
    }

    enter(params = {}) {
        this.levelId = params.levelId || 1;
        this.highestUnlocked = params.highestUnlocked || 1;
        this.levelData = LEVELS.find(l => l.id === this.levelId);
        this.missFlashTimer = 0;

        if (!this.levelData) {
            // Fallback to level 1 if invalid
            this.levelData = LEVELS[0];
            this.levelId = 1;
        }

        this.tileManager = new TileManager(this.levelData, 800, 600);
    }

    update(dt, input, stateManager) {
        // Handle input
        const keys = input.getKeys();
        for (const key of keys) {
            if (key === 'Escape') {
                stateManager.change('menu', { highestUnlocked: this.highestUnlocked });
                return;
            }

            // Only process printable characters for gameplay
            if (key.length === 1 && key !== 'Escape') {
                const result = this.tileManager.handleKeypress(key);
                if (result === 'miss') {
                    this.missFlashTimer = 0.2;
                }
            }
        }

        // Update miss flash
        if (this.missFlashTimer > 0) {
            this.missFlashTimer -= dt;
        }

        // Update tiles
        this.tileManager.update(dt);

        // Check game over
        if (this.tileManager.checkGameOver()) {
            stateManager.change('lose', {
                levelId: this.levelId,
                highestUnlocked: this.highestUnlocked
            });
            return;
        }

        // Check win
        if (this.tileManager.checkWin()) {
            const newHighest = Math.max(this.highestUnlocked, this.levelId + 1);
            stateManager.change('win', {
                levelId: this.levelId,
                highestUnlocked: newHighest
            });
        }
    }

    draw(renderer) {
        // Danger zone line
        renderer.drawDangerZone(560);

        // Draw all tiles
        const target = this.tileManager.getTargetTile();
        for (const tile of this.tileManager.tiles) {
            if (tile.destroying) {
                renderer.drawTileDestroy(tile);
            } else {
                renderer.drawTile(tile, tile === target);
            }
        }

        // Miss flash overlay
        if (this.missFlashTimer > 0) {
            const alpha = this.missFlashTimer / 0.2 * 0.15;
            renderer.ctx.fillStyle = `rgba(233, 69, 96, ${alpha})`;
            renderer.ctx.fillRect(0, 0, renderer.width, renderer.height);
        }

        // HUD
        renderer.drawHUD(this.levelId, this.tileManager.tilesRemaining, this.levelData.totalTiles);

        // Show active keys
        const keysStr = this.levelData.keys.join(' ').toUpperCase();
        renderer.drawText(keysStr, renderer.width / 2, renderer.height - 15, { size: 12, color: '#333355' });
    }

    exit() {
        this.tileManager = null;
    }
}
