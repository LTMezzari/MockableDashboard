export const LOADING = 'LOADING/RESOURCE';
export const SUCCESSFUL = 'SUCCESSFUL/RESOURCE';
export const FAILED = 'FAILED/RESOURCE';

export default class Resource {
    constructor(state = LOADING) {
        this.state = state;
        this.listeners = [];
    }

    observe(listener) {
        if (listener && typeof listener !== 'function')
            throw Error('The listener should be a function');
        this.listeners.push(listener);
        listener(this.state, this.data)
    }

    postState(state, data) {
        this.state = state;
        this.data = data;
        this.listeners.forEach((listener) => listener?.(state, data));
    }
}