export class StateManager {
    constructor() {
        this.states = {};
        this.currentState = null;
    }

    register(name, state) {
        this.states[name] = state;
    }

    change(name, params = {}) {
        if (this.currentState && this.currentState.exit) {
            this.currentState.exit();
        }
        this.currentState = this.states[name];
        if (this.currentState.enter) {
            this.currentState.enter(params);
        }
    }
}
