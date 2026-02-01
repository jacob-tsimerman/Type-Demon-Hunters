import { LEVELS } from '../levels/levelData.js';

export class WinState {
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
            if (key === 'Enter' || key === 'n') {
                // Next level
                const nextId = this.levelId + 1;
                if (nextId <= LEVELS.length) {
                    stateManager.change('play', {
                        levelId: nextId,
                        highestUnlocked: this.highestUnlocked
                    });
                } else {
                    stateManager.change('menu', {
                        highestUnlocked: this.highestUnlocked
                    });
                }
                return;
            } else if (key === 'm') {
                stateManager.change('menu', {
                    highestUnlocked: this.highestUnlocked
                });
                return;
            } else if (key === 'r') {
                stateManager.change('play', {
                    levelId: this.levelId,
                    highestUnlocked: this.highestUnlocked
                });
                return;
            }
        }
    }

    draw(renderer) {
        renderer.drawText('LEVEL COMPLETE!', renderer.width / 2, renderer.height / 2 - 60, { size: 36, color: '#4ade80' });

        const levelName = LEVELS.find(l => l.id === this.levelId)?.name || '';
        renderer.drawText(`Level ${this.levelId}: ${levelName}`, renderer.width / 2, renderer.height / 2 - 15, { size: 18, color: '#888888' });

        renderer.drawText('Press Enter or N for next level', renderer.width / 2, renderer.height / 2 + 40, { size: 16, color: '#aaaaaa' });
        renderer.drawText('Press R to replay', renderer.width / 2, renderer.height / 2 + 65, { size: 16, color: '#aaaaaa' });
        renderer.drawText('Press M for menu', renderer.width / 2, renderer.height / 2 + 90, { size: 16, color: '#aaaaaa' });
    }

    exit() {}
}
