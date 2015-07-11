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
import { onAllChangesDone } from 'angular2/src/core/annotations/annotations';
import { Directive } from 'angular2/src/core/annotations/decorators';
import { ElementRef } from 'angular2/core';
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { isPresent } from 'angular2/src/facade/lang';
import { Router } from './router';
import { Location } from './location';
import { Renderer } from 'angular2/src/render/api';
/**
 * The RouterLink directive lets you link to specific parts of your app.
 *
 *
 * Consider the following route configuration:

 * ```
 * @RouteConfig({
 *   path: '/user', component: UserCmp, as: 'user'
 * });
 * class MyComp {}
 * ```
 *
 * When linking to a route, you can write:
 *
 * ```
 * <a router-link="user">link to user component</a>
 * ```
 *
 * @exportedAs angular2/router
 */
export let RouterLink = class {
    constructor(_elementRef, _router, _location, _renderer) {
        this._elementRef = _elementRef;
        this._router = _router;
        this._location = _location;
        this._renderer = _renderer;
        this._params = StringMapWrapper.create();
    }
    set route(changes) { this._route = changes; }
    set params(changes) { this._params = changes; }
    onClick() {
        this._router.navigate(this._navigationHref);
        return false;
    }
    onAllChangesDone() {
        if (isPresent(this._route) && isPresent(this._params)) {
            this._navigationHref = this._router.generate(this._route, this._params);
            this._visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
            // Keeping the link on the element to support contextual menu `copy link`
            // and other in-browser affordances.
            this._renderer.setElementAttribute(this._elementRef, 'href', this._visibleHref);
        }
    }
};
RouterLink = __decorate([
    Directive({
        selector: '[router-link]',
        properties: ['route: routerLink', 'params: routerParams'],
        lifecycle: [onAllChangesDone],
        host: { '(^click)': 'onClick()' }
    }), 
    __metadata('design:paramtypes', [ElementRef, Router, Location, Renderer])
], RouterLink);
//# sourceMappingURL=router_link.js.map