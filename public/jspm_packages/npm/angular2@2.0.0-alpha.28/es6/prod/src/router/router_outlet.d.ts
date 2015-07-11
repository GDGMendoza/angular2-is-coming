import { DynamicComponentLoader, ElementRef } from 'angular2/core';
import { Injector } from 'angular2/di';
import * as routerMod from './router';
import { Instruction } from './instruction';
/**
 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
 *
 * ## Use
 *
 * ```
 * <router-outlet></router-outlet>
 * ```
 */
export declare class RouterOutlet {
    private _loader;
    private _parentRouter;
    private _injector;
    private _childRouter;
    private _componentRef;
    private _elementRef;
    private _currentInstruction;
    constructor(elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: routerMod.Router, _injector: Injector, nameAttr: string);
    /**
     * Given an instruction, update the contents of this outlet.
     */
    activate(instruction: Instruction): Promise<any>;
    deactivate(): Promise<any>;
    canDeactivate(instruction: Instruction): Promise<boolean>;
}