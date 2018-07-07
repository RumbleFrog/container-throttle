interface ThrottleOption {
    container: string,
    id: string,
    duration?: number,
    usages?: number
}

interface Throttler {
    start: number,
    usages: number,
    timeout: NodeJS.Timer,
}

export class Throttle {

    public Whitelist: Array<string>;
    private _throttles: Map<string, Map<string, Throttler>>;

    constructor(whitelist?: Array<string>) {
        this.Whitelist = whitelist || [];
        this._throttles = new Map();
    }

    public throttle(options: ThrottleOption): boolean {
        if (this.Whitelist.includes(options.id)) return true;

        let container = this._throttles.get(options.container);

        if (!container) {
            container = new Map();
            this._throttles.set(options.container, container);
        }

        let throttle = container.get(options.id);

        if (!throttle) {
            throttle = {
                start: Date.now(),
                usages: 1,
                timeout: setTimeout(() => {
                    container.delete(options.id)
                }, options.duration * 1000)
            }

            container.set(options.id, throttle);

            return true;
        }

        if (throttle.usages + 1 > options.usages) {
            return false;
        }

        throttle.usages++;

        container.set(options.id, throttle);

        return true;
    }

    public getThrottler(options: ThrottleOption) {
        return this._throttles.get(options.container).get(options.id);
    }
}