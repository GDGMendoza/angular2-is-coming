/* */ 
"format cjs";
/// <reference path="../../typings/rx/rx.all.d.ts" />
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
import { Injectable } from 'angular2/src/di/decorators';
import { Request } from './static_request';
import { XHRBackend } from './backends/xhr_backend';
import { BaseRequestOptions } from './base_request_options';
import { RequestMethods } from './enums';
import * as Rx from 'rx';
function httpRequest(backend, request) {
    return (Observable.create(observer => {
        var connection = backend.createConnection(request);
        var internalSubscription = connection.response.subscribe(observer);
        return () => {
            internalSubscription.dispose();
            connection.dispose();
        };
    }));
}
/**
 * Performs http requests using `XMLHttpRequest` as the default backend.
 *
 * `Http` is available as an injectable class, with methods to perform http requests. Calling
 * `request` returns an
 * [Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md),
 * which will emit a single {@link Response} when a response is
 * received.
 *
 * #Example
 *
 * ```
 * import {Http, httpInjectables} from 'angular2/http';
 * @Component({selector: 'http-app', appInjector: [httpInjectables]})
 * @View({templateUrl: 'people.html'})
 * class PeopleComponent {
 *   constructor(http: Http) {
 *     http('people.json')
 *       // Call map on the response observable to get the parsed people object
 *       .map(res => res.json())
 *       // Subscribe to the observable to get the parsed people object and attach it to the
 *       // component
 *       .subscribe(people => this.people = people);
 *   }
 * }
 * ```
 *
 * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
 * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
 * the {@link XHRBackend} binding, as in the following example:
 *
 * #Example
 *
 * ```
 * import {MockBackend, BaseRequestOptions, Http} from 'angular2/http';
 * var injector = Injector.resolveAndCreate([
 *   BaseRequestOptions,
 *   MockBackend,
 *   bind(Http).toFactory(
 *       function(backend, defaultOptions) {
 *         return new Http(backend, defaultOptions);
 *       },
 *       [MockBackend, BaseRequestOptions])
 * ]);
 * var http = injector.get(Http);
 * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
 * ```
 *
 **/
export let Http = class {
    constructor(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    request(url, options) {
        if (typeof url === 'string') {
            return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options)));
        }
        else if (url instanceof Request) {
            return httpRequest(this._backend, url);
        }
    }
    /**
     * Performs a request with `get` http method.
     */
    get(url, options) {
        return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options)
            .merge({ method: RequestMethods.GET })));
    }
    /**
     * Performs a request with `post` http method.
     */
    post(url, body, options) {
        return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options)
            .merge({ body: body, method: RequestMethods.POST })));
    }
    /**
     * Performs a request with `put` http method.
     */
    put(url, body, options) {
        return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options)
            .merge({ body: body, method: RequestMethods.PUT })));
    }
    /**
     * Performs a request with `delete` http method.
     */
    delete(url, options) {
        return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options).merge({ method: RequestMethods.DELETE })));
    }
    /**
     * Performs a request with `patch` http method.
     */
    patch(url, body, options) {
        return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options)
            .merge({ body: body, method: RequestMethods.PATCH })));
    }
    /**
     * Performs a request with `head` http method.
     */
    head(url, options) {
        return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options)
            .merge({ method: RequestMethods.HEAD })));
    }
};
Http = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [XHRBackend, BaseRequestOptions])
], Http);
var Observable;
if (Rx.hasOwnProperty('default')) {
    Observable = Rx.default.Rx.Observable;
}
else {
    Observable = Rx.Observable;
}
/**
 *
 * Alias to the `request` method of {@link Http}, for those who'd prefer a simple function instead
 * of an object. In order to get TypeScript type information about the `HttpFactory`, the {@link
 * IHttp} interface can be used as shown in the following example.
 *
 * #Example
 *
 * ```
 * import {httpInjectables, HttpFactory, IHttp} from 'angular2/http';
 * @Component({
 *   appInjector: [httpInjectables]
 * })
 * @View({
 *   templateUrl: 'people.html'
 * })
 * class MyComponent {
 *  constructor(@Inject(HttpFactory) http:IHttp) {
 *    http('people.json').subscribe(res => this.people = res.json());
 *  }
 * }
 * ```
 **/
export function HttpFactory(backend, defaultOptions) {
    return function (url, options) {
        if (typeof url === 'string') {
            return httpRequest(backend, new Request(url, defaultOptions.merge(options)));
        }
        else if (url instanceof Request) {
            return httpRequest(backend, url);
        }
    };
}
//# sourceMappingURL=http.js.map