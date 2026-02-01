import { Renderer } from './rendering/renderer.js';
import { InputHandler } from './input/inputHandler.js';
import { StateManager } from './states/stateManager.js';
import { MenuState } from './states/menuState.js';
import { PlayState } from './states/playState.js';
import { WinState } from './states/winState.js';
import { LoseState } from './states/loseState.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.renderer = new Renderer(this.ctx, canvas.width, canvas.height);
        this.inputHandler = new InputHandler();
        this.stateManager = new StateManager();
        this.previousTime = 0;

        // Register states
        this.stateManager.register('menu', new MenuState());
        this.stateManager.register('play', new PlayState());
        this.stateManager.register('win', new WinState());
        this.stateManager.register('lose', new LoseState());
    }

    start() {
        this.stateManager.change('menu');
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    loop(currentTime) {
        const dt = (currentTime - this.previousTime) / 1000;
        this.previousTime = currentTime;

        // Cap delta time to avoid spiral of death after tab switch
        const cappedDt = Math.min(dt, 0.1);

        // Update current state
        if (this.stateManager.currentState) {
            this.stateManager.currentState.update(cappedDt, this.inputHandler, this.stateManager);
        }

        // Clear and draw
        this.renderer.clear();
        if (this.stateManager.currentState) {
            this.stateManager.currentState.draw(this.renderer);
        }

        // Consume all input for this frame
        this.inputHandler.flush();

        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
}
