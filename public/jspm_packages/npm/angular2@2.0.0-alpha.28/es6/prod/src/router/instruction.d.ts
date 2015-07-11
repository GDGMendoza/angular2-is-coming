export declare class RouteParams {
    params: StringMap<string, string>;
    constructor(params: StringMap<string, string>);
    get(param: string): string;
}
/**
 * An `Instruction` represents the component hierarchy of the application based on a given route
 */
export declare class Instruction {
    component: any;
    child: Instruction;
    capturedUrl: string;
    accumulatedUrl: string;
    params: StringMap<string, string>;
    reuse: boolean;
    specificity: number;
    constructor({params, component, child, matchedUrl, parentSpecificity}?: {
        params?: StringMap<string, any>;
        component?: any;
        child?: Instruction;
        matchedUrl?: string;
        parentSpecificity?: number;
    });
    hasChild(): boolean;
    /**
     * Takes a currently active instruction and sets a reuse flag on each of this instruction's
     * children
     */
    reuseComponentsFrom(oldInstruction: Instruction): void;
}