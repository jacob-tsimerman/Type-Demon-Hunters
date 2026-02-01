import { LEVELS } from '../levels/levelData.js';

export class LoseState {
    constructor() {
        this.levelId = 1;
        this.highestUnlocked = 1;
    }

    enter(params = {}) {
        this.levelId = params.levelId || 1;
        this.highestUnlocked = params.highestUnlocked || 1;
    }

    update(dt, input, stateManager) {
        const keys = input.getKeys();
        for (const key of keys) {
            if (key === 'Enter' || key === 'r') {
                stateManager.change('play', {
                    levelId: this.levelId,
                    highestUnlocked: this.highestUnlocked
                });
                return;
            } else if (key === 'm') {
                stateManager.change('menu', {
                    highestUnlocked: this.highestUnlocked
                });
                return;
            }
        }
    }

    draw(renderer) {
        renderer.drawText('GAME OVER', renderer.width / 2, renderer.height / 2 - 60, { size: 36, color: '#e94560' });

        renderer.drawText('A tile reached the bottom!', renderer.width / 2, renderer.height / 2 - 15, { size: 18, color: '#888888' });

        const levelName = LEVELS.find(l => l.id === this.levelId)?.name || '';
        renderer.drawText(`Level ${this.levelId}: ${levelName}`, renderer.width / 2, renderer.height / 2 + 15, { size: 16, color: '#666666' });

        renderer.drawText('Press Enter or R to retry', renderer.width / 2, renderer.height / 2 + 55, { size: 16, color: '#aaaaaa' });
        renderer.drawText('Press M for menu', renderer.width / 2, renderer.height / 2 + 80, { size: 16, color: '#aaaaaa' });
    }

    exit() {}
}
