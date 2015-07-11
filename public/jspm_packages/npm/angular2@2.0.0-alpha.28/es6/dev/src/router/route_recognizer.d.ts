import { PathRecognizer } from './path_recognizer';
/**
 * `RouteRecognizer` is responsible for recognizing routes for a single component.
 * It is consumed by `RouteRegistry`, which knows how to recognize an entire hierarchy of
 * components.
 */
export declare class RouteRecognizer {
    names: Map<string, PathRecognizer>;
    redirects: Map<string, string>;
    matchers: Map<RegExp, PathRecognizer>;
    constructor();
    addRedirect(path: string, target: string): void;
    addConfig(path: string, handler: any, alias?: string): boolean;
    /**
     * Given a URL, returns a list of `RouteMatch`es, which are partial recognitions for some route.
     *
     */
    recognize(url: string): List<RouteMatch>;
    hasRoute(name: string): boolean;
    generate(name: string, params: any): string;
}
export declare class RouteMatch {
    specificity: number;
    handler: StringMap<string, any>;
    params: StringMap<string, string>;
    matchedUrl: string;
    unmatchedUrl: string;
    constructor({specificity, handler, params, matchedUrl, unmatchedUrl}?: {
        specificity?: number;
        handler?: StringMap<string, any>;
        params?: StringMap<string, string>;
        matchedUrl?: string;
        unmatchedUrl?: string;
    });
}
