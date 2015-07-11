/* */ 
"format cjs";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CONST, isBlank } from 'angular2/src/facade/lang';
import { DependencyAnnotation } from 'angular2/src/di/annotations_impl';
export let Visibility = class extends DependencyAnnotation {
    constructor(depth, crossComponentBoundaries, _includeSelf) {
        super();
        this.depth = depth;
        this.crossComponentBoundaries = crossComponentBoundaries;
        this._includeSelf = _includeSelf;
    }
    get includeSelf() { return isBlank(this._includeSelf) ? false : this._includeSelf; }
    toString() {
        return `@Visibility(depth: ${this.depth}, crossComponentBoundaries: ${this.crossComponentBoundaries}, includeSelf: ${this.includeSelf}})`;
    }
};
Visibility = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [Number, Boolean, Boolean])
], Visibility);
/**
 * Specifies that an injector should retrieve a dependency from its element.
 *
 * ## Example
 *
 * Here is a simple directive that retrieves a dependency from its element.
 *
 * ```
 * @Directive({
 *   selector: '[dependency]',
 *   properties: [
 *     'id: dependency'
 *   ]
 * })
 * class Dependency {
 *   id:string;
 * }
 *
 *
 * @Directive({
 *   selector: '[my-directive]'
 * })
 * class Dependency {
 *   constructor(@Self() dependency:Dependency) {
 *     expect(dependency.id).toEqual(1);
 *   };
 * }
 * ```
 *
 * We use this with the following HTML template:
 *
 * ```
 *<div dependency="1" my-directive></div>
 * ```
 *
 * @exportedAs angular2/annotations
 */
export let Self = class extends Visibility {
    constructor() {
        super(0, false, true);
    }
    toString() { return `@Self()`; }
};
Self = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], Self);
// make constants after switching to ts2dart
export var self = new Self();
/**
 * Specifies that an injector should retrieve a dependency from the direct parent.
 *
 * ## Example
 *
 * Here is a simple directive that retrieves a dependency from its parent element.
 *
 * ```
 * @Directive({
 *   selector: '[dependency]',
 *   properties: [
 *     'id: dependency'
 *   ]
 * })
 * class Dependency {
 *   id:string;
 * }
 *
 *
 * @Directive({
 *   selector: '[my-directive]'
 * })
 * class Dependency {
 *   constructor(@Parent() dependency:Dependency) {
 *     expect(dependency.id).toEqual(1);
 *   };
 * }
 * ```
 *
 * We use this with the following HTML template:
 *
 * ```
 * <div dependency="1">
 *   <div dependency="2" my-directive></div>
 * </div>
 * ```
 * The `@Parent()` annotation in our constructor forces the injector to retrieve the dependency from
 * the
 * parent element (even thought the current element could resolve it): Angular injects
 * `dependency=1`.
 *
 * @exportedAs angular2/annotations
 */
export let Parent = class extends Visibility {
    constructor({ self } = {}) {
        super(1, false, self);
    }
    toString() { return `@Parent(self: ${this.includeSelf}})`; }
};
Parent = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [Object])
], Parent);
/**
 * Specifies that an injector should retrieve a dependency from any ancestor element within the same
 * shadow boundary.
 *
 * An ancestor is any element between the parent element and the shadow root.
 *
 * Use {@link Unbounded} if you need to cross upper shadow boundaries.
 *
 * ## Example
 *
 * Here is a simple directive that retrieves a dependency from an ancestor element.
 *
 * ```
 * @Directive({
 *   selector: '[dependency]',
 *   properties: [
 *     'id: dependency'
 *   ]
 * })
 * class Dependency {
 *   id:string;
 * }
 *
 *
 * @Directive({
 *   selector: '[my-directive]'
 * })
 * class Dependency {
 *   constructor(@Ancestor() dependency:Dependency) {
 *     expect(dependency.id).toEqual(2);
 *   };
 * }
 * ```
 *
 *  We use this with the following HTML template:
 *
 * ```
 * <div dependency="1">
 *   <div dependency="2">
 *     <div>
 *       <div dependency="3" my-directive></div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * The `@Ancestor()` annotation in our constructor forces the injector to retrieve the dependency
 * from the
 * nearest ancestor element:
 * - The current element `dependency="3"` is skipped because it is not an ancestor.
 * - Next parent has no directives `<div>`
 * - Next parent has the `Dependency` directive and so the dependency is satisfied.
 *
 * Angular injects `dependency=2`.
 *
 * @exportedAs angular2/annotations
 */
export let Ancestor = class extends Visibility {
    constructor({ self } = {}) {
        super(999999, false, self);
    }
    toString() { return `@Ancestor(self: ${this.includeSelf}})`; }
};
Ancestor = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [Object])
], Ancestor);
/**
 * Specifies that an injector should retrieve a dependency from any ancestor element, crossing
 * component boundaries.
 *
 * Use {@link Ancestor} to look for ancestors within the current shadow boundary only.
 *
 * ## Example
 *
 * Here is a simple directive that retrieves a dependency from an ancestor element.
 *
 * ```
 * @Directive({
 *   selector: '[dependency]',
 *   properties: [
 *     'id: dependency'
 *   ]
 * })
 * class Dependency {
 *   id:string;
 * }
 *
 *
 * @Directive({
 *   selector: '[my-directive]'
 * })
 * class Dependency {
 *   constructor(@Unbounded() dependency:Dependency) {
 *     expect(dependency.id).toEqual(2);
 *   };
 * }
 * ```
 *
 * @exportedAs angular2/annotations
 */
export let Unbounded = class extends Visibility {
    constructor({ self } = {}) {
        super(999999, true, self);
    }
    toString() { return `@Unbounded(self: ${this.includeSelf}})`; }
};
Unbounded = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [Object])
], Unbounded);
//# sourceMappingURL=visibility.js.map