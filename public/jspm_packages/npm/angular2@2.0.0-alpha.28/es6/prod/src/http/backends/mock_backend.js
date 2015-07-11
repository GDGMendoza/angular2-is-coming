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
import { Injectable } from 'angular2/di';
import { Request } from 'angular2/src/http/static_request';
import { ReadyStates } from 'angular2/src/http/enums';
import * as Rx from 'rx';
/**
 *
 * Connection class used by MockBackend
 *
 * This class is typically not instantiated directly, but instances can be retrieved by subscribing
 *to the `connections` Observable of
 * {@link MockBackend} in order to mock responses to requests.
 *
 **/
export class MockConnection {
    constructor(req) {
        if (Rx.hasOwnProperty('default')) {
            this.response = new (Rx.default.Rx.Subject)();
        }
        else {
            this.response = new Rx.Subject();
        }
        this.readyState = ReadyStates.OPEN;
        this.request = req;
        this.dispose = this.dispose.bind(this);
    }
    /**
     * Changes the `readyState` of the connection to a custom state of 5 (cancelled).
     */
    dispose() {
        if (this.readyState !== ReadyStates.DONE) {
            this.readyState = ReadyStates.CANCELLED;
        }
    }
    /**
     * Sends a mock response to the connection. This response is the value that is emitted to the
     * `Observable` returned by {@link Http}.
     *
     * #Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => console.log(res.text()));
     * connection.mockRespond(new Response('fake response')); //logs 'fake response'
     * ```
     *
     */
    mockRespond(res) {
        if (this.readyState >= ReadyStates.DONE) {
            throw new Error('Connection has already been resolved');
        }
        this.readyState = ReadyStates.DONE;
        this.response.onNext(res);
        this.response.onCompleted();
    }
    /**
     * Not yet implemented!
     *
     * Sends the provided {@link Response} to the `downloadObserver` of the `Request`
     * associated with this connection.
     */
    mockDownload(res) {
        // this.request.downloadObserver.onNext(res);
        // if (res.bytesLoaded === res.totalBytes) {
        //   this.request.downloadObserver.onCompleted();
        // }
    }
    // TODO(jeffbcross): consider using Response type
    /**
     * Emits the provided error object as an error to the {@link Response} observable returned
     * from {@link Http}.
     */
    mockError(err) {
        // Matches XHR semantics
        this.readyState = ReadyStates.DONE;
        this.response.onError(err);
        this.response.onCompleted();
    }
}
/**
 * A mock backend for testing the {@link Http} service.
 *
 * This class can be injected in tests, and should be used to override bindings
 * to other backends, such as {@link XHRBackend}.
 *
 * #Example
 *
 * ```
 * import {MockBackend, DefaultOptions, Http} from 'angular2/http';
 * it('should get some data', inject([AsyncTestCompleter], (async) => {
 *   var connection;
 *   var injector = Injector.resolveAndCreate([
 *     MockBackend,
 *     bind(Http).toFactory((backend, defaultOptions) => {
 *       return new Http(backend, defaultOptions)
 *     }, [MockBackend, DefaultOptions])]);
 *   var http = injector.get(Http);
 *   var backend = injector.get(MockBackend);
 *   //Assign any newly-created connection to local variable
 *   backend.connections.subscribe(c => connection = c);
 *   http.request('data.json').subscribe((res) => {
 *     expect(res.text()).toBe('awesome');
 *     async.done();
 *   });
 *   connection.mockRespond(new Response('awesome'));
 * }));
 * ```
 *
 * This method only exists in the mock implementation, not in real Backends.
 **/
export let MockBackend = class {
    constructor() {
        var Observable;
        this.connectionsArray = [];
        if (Rx.hasOwnProperty('default')) {
            this.connections = new Rx.default.Rx.Subject();
            Observable = Rx.default.Rx.Observable;
        }
        else {
            this.connections = new Rx.Subject();
            Observable = Rx.Observable;
        }
        this.connections.subscribe(connection => this.connectionsArray.push(connection));
        this.pendingConnections =
            Observable.fromArray(this.connectionsArray).filter((c) => c.readyState < ReadyStates.DONE);
    }
    /**
     * Checks all connections, and raises an exception if any connection has not received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    verifyNoPendingRequests() {
        let pending = 0;
        this.pendingConnections.subscribe((c) => pending++);
        if (pending > 0)
            throw new Error(`${pending} pending connections to be resolved`);
    }
    /**
     * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
     * connections, if it's expected that there are connections that have not yet received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    resolveAllConnections() { this.connections.subscribe((c) => c.readyState = 4); }
    /**
     * Creates a new {@link MockConnection}. This is equivalent to calling `new
     * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
     * observable of this `MockBackend` instance. This method will usually only be used by tests
     * against the framework itself, not by end-users.
     */
    createConnection(req) {
        if (!req || !(req instanceof Request)) {
            throw new Error(`createConnection requires an instance of Request, got ${req}`);
        }
        let connection = new MockConnection(req);
        this.connections.onNext(connection);
        return connection;
    }
};
MockBackend = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], MockBackend);
//# sourceMappingURL=mock_backend.js.map