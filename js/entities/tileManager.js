import { Tile } from './tile.js';

const TILE_COLORS = ['#e94560', '#0f3460', '#533483', '#e76f51', '#2a9d8f'];

export class TileManager {
    constructor(levelData, canvasWidth, canvasHeight) {
        this.tiles = [];
        this.levelData = levelData;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spawnTimer = 0;
        this.tilesSpawned = 0;
        this.tilesDestroyed = 0;

        // Margins for random x positioning
        this.margin = 60;
        this.tileWidth = 50; // base tile width
    }

    update(dt) {
        // Spawn timer
        this.spawnTimer += dt;
        const activeTiles = this.tiles.filter(t => !t.destroying).length;
        if (this.spawnTimer >= this.levelData.spawnInterval
            && activeTiles < this.levelData.maxActiveTiles
            && this.tilesSpawned < this.levelData.totalTiles) {
            this.spawnTile();
            this.spawnTimer = 0;
        }

        // Update all tiles
        for (const tile of this.tiles) {
            tile.update(dt);
        }

        // Remove dead tiles
        this.tiles = this.tiles.filter(t => t.alive);
    }

    spawnTile() {
        const text = this.generateTileText();
        const tileW = Math.max(50, text.length * 28);
        const minX = this.margin;
        const maxX = this.canvasWidth - this.margin - tileW;
        const x = minX + Math.random() * (maxX - minX);
        const color = TILE_COLORS[Math.floor(Math.random() * TILE_COLORS.length)];
        const tile = new Tile(text, 0, x, -40, this.levelData.tileSpeed, color);
        this.tiles.push(tile);
        this.tilesSpawned++;
    }

    generateTileText() {
        const level = this.levelData;
        const len = level.minWordLength + Math.floor(Math.random() * (level.maxWordLength - level.minWordLength + 1));

        if (len === 1) {
            return level.keys[Math.floor(Math.random() * level.keys.length)];
        }

        // Try to find a real word from the word list
        if (level.wordList && level.wordList.length > 0) {
            const candidates = level.wordList.filter(w => w.length === len);
            if (candidates.length > 0) {
                return candidates[Math.floor(Math.random() * candidates.length)];
            }
        }

        // Fallback: random string from available keys
        let result = '';
        for (let i = 0; i < len; i++) {
            result += level.keys[Math.floor(Math.random() * level.keys.length)];
        }
        return result;
    }

    getTargetTile() {
        let lowest = null;
        for (const tile of this.tiles) {
            if (tile.destroying) continue;
            if (!lowest || (tile.y + tile.height) > (lowest.y + lowest.height)) {
                lowest = tile;
            }
        }
        return lowest;
    }

    handleKeypress(char) {
        const target = this.getTargetTile();
        if (!target) return 'no_target';

        const result = target.typeChar(char);
        if (result === 'completed') {
            this.tilesDestroyed++;
        }
        return result;
    }

    checkGameOver() {
        return this.tiles.some(t => !t.destroying && t.hasReachedBottom(this.canvasHeight));
    }

    checkWin() {
        return this.tilesDestroyed >= this.levelData.totalTiles
            && this.tiles.filter(t => !t.destroying).length === 0;
    }

    get tilesRemaining() {
        return this.levelData.totalTiles - this.tilesDestroyed;
    }
}
