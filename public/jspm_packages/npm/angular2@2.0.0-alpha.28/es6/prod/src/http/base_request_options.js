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
import { RequestModesOpts, RequestMethods } from './enums';
import { Injectable } from 'angular2/di';
import { StringMapWrapper } from 'angular2/src/facade/collection';
/**
 * Creates a request options object with default properties as described in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit) to be optionally provided when instantiating a
 * {@link Request}. This class is used implicitly by {@link Http} to merge in provided request
 * options with the default options specified here. These same default options are injectable via
 * the {@link BaseRequestOptions} class.
 */
export class RequestOptions {
    constructor({ method, headers, body, mode, credentials, cache } = {
            method: RequestMethods.GET,
            mode: RequestModesOpts.Cors
        }) {
        /**
         * Http method with which to execute the request.
         *
         * Defaults to "GET".
         */
        this.method = RequestMethods.GET;
        this.mode = RequestModesOpts.Cors;
        this.method = method;
        this.headers = headers;
        this.body = body;
        this.mode = mode;
        this.credentials = credentials;
        this.cache = cache;
    }
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values.
     */
    merge(opts = {}) {
        return new RequestOptions(StringMapWrapper.merge(this, opts));
    }
}
/**
 * Injectable version of {@link RequestOptions}.
 *
 * #Example
 *
 * ```
 * import {Http, BaseRequestOptions, Request} from 'angular2/http';
 * ...
 * class MyComponent {
 *   constructor(baseRequestOptions:BaseRequestOptions, http:Http) {
 *     var options = baseRequestOptions.merge({body: 'foobar'});
 *     var request = new Request('https://foo', options);
 *     http.request(request).subscribe(res => this.bars = res.json());
 *   }
 * }
 *
 * ```
 */
export let BaseRequestOptions = class extends RequestOptions {
    constructor() {
        super();
    }
};
BaseRequestOptions = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], BaseRequestOptions);
//# sourceMappingURL=base_request_options.js.map