import { LEVELS } from '../levels/levelData.js';

export class MenuState {
    constructor() {
        this.selectedIndex = 0;
        this.highestUnlocked = 1;
    }

    enter(params = {}) {
        if (params.highestUnlocked !== undefined) {
            this.highestUnlocked = Math.max(this.highestUnlocked, params.highestUnlocked);
        }
        // Clamp selection to valid range
        if (this.selectedIndex >= LEVELS.length) {
            this.selectedIndex = LEVELS.length - 1;
        }
    }

    update(dt, input, stateManager) {
        const keys = input.getKeys();
        for (const key of keys) {
            if (key === 'ArrowUp') {
                this.selectedIndex = Math.max(0, this.selectedIndex - 1);
            } else if (key === 'ArrowDown') {
                this.selectedIndex = Math.min(LEVELS.length - 1, this.selectedIndex + 1);
            } else if (key === 'Enter') {
                const level = LEVELS[this.selectedIndex];
                if (level.id <= this.highestUnlocked) {
                    stateManager.change('play', {
                        levelId: level.id,
                        highestUnlocked: this.highestUnlocked
                    });
                }
            }
        }
    }

    draw(renderer) {
        renderer.drawText('TYPE ATTACK', renderer.width / 2, 50, { size: 36, color: '#e94560' });
        renderer.drawText('Select a level with arrow keys, press Enter to start', renderer.width / 2, 90, { size: 14, color: '#666666' });

        const startY = 130;
        const lineHeight = 38;
        const visibleCount = Math.min(LEVELS.length, 12);

        // Scroll offset so selected item is visible
        let scrollOffset = 0;
        if (this.selectedIndex >= visibleCount) {
            scrollOffset = this.selectedIndex - visibleCount + 1;
        }

        for (let i = 0; i < visibleCount && (i + scrollOffset) < LEVELS.length; i++) {
            const levelIdx = i + scrollOffset;
            const level = LEVELS[levelIdx];
            const y = startY + i * lineHeight;
            const isSelected = levelIdx === this.selectedIndex;
            const isLocked = level.id > this.highestUnlocked;

            let color;
            if (isLocked) {
                color = '#333333';
            } else if (isSelected) {
                color = '#ffffff';
            } else {
                color = '#888888';
            }

            const prefix = isSelected ? '> ' : '  ';
            const lock = isLocked ? ' [locked]' : '';
            const text = `${prefix}${level.id}. ${level.name}${lock}`;

            renderer.drawText(text, renderer.width / 2, y, { size: 18, color, align: 'center' });

            // Show description and keys for selected level
            if (isSelected && !isLocked) {
                renderer.drawText(level.description, renderer.width / 2, y + 18, { size: 12, color: '#666666' });
            }
        }

        // Show keys for currently selected level
        const selectedLevel = LEVELS[this.selectedIndex];
        if (selectedLevel && selectedLevel.id <= this.highestUnlocked) {
            const keysStr = selectedLevel.keys.join('  ').toUpperCase();
            renderer.drawText(`Keys: ${keysStr}`, renderer.width / 2, renderer.height - 40, { size: 14, color: '#4a4a6a' });
        }
    }

    exit() {}
}
