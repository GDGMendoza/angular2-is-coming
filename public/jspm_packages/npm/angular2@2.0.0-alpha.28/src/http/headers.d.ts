/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class). The only known
 * difference from the spec is the lack of an `entries` method.
 */
export declare class Headers {
    _headersMap: Map<string, List<string>>;
    constructor(headers?: Headers | Object);
    append(name: string, value: string): void;
    delete(name: string): void;
    forEach(fn: Function): void;
    get(header: string): string;
    has(header: string): boolean;
    keys(): List<string>;
    set(header: string, value: string | List<string>): void;
    values(): List<List<string>>;
    getAll(header: string): Array<string>;
    entries(): void;
}
export declare var __esModule: boolean;