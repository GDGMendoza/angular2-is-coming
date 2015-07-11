import { Request } from 'angular2/src/http/static_request';
import { Response } from 'angular2/src/http/static_response';
import { ReadyStates } from 'angular2/src/http/enums';
import { Connection, ConnectionBackend } from 'angular2/src/http/interfaces';
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
export declare class MockConnection implements Connection {
    /**
     * Describes the state of the connection, based on `XMLHttpRequest.readyState`, but with
     * additional states. For example, state 5 indicates an aborted connection.
     */
    readyState: ReadyStates;
    /**
     * {@link Request} instance used to create the connection.
     */
    request: Request;
    /**
     * [RxJS
     * Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)
     * of {@link Response}. Can be subscribed to in order to be notified when a response is available.
     */
    response: Rx.Subject<Response>;
    constructor(req: Request);
    /**
     * Changes the `readyState` of the connection to a custom state of 5 (cancelled).
     */
    dispose(): void;
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
    mockRespond(res: Response): void;
    /**
     * Not yet implemented!
     *
     * Sends the provided {@link Response} to the `downloadObserver` of the `Request`
     * associated with this connection.
     */
    mockDownload(res: Response): void;
    /**
     * Emits the provided error object as an error to the {@link Response} observable returned
     * from {@link Http}.
     */
    mockError(err?: any): void;
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
export declare class MockBackend implements ConnectionBackend {
    /**
     * [RxJS
     * Subject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/subject.md)
     * of {@link MockConnection} instances that have been created by this backend. Can be subscribed
     * to in order to respond to connections.
     *
     * #Example
     *
     * ```
     * import {MockBackend, Http, BaseRequestOptions} from 'angular2/http';
     * import {Injector} from 'angular2/di';
     *
     * it('should get a response', () => {
     *   var connection; //this will be set when a new connection is emitted from the backend.
     *   var text; //this will be set from mock response
     *   var injector = Injector.resolveAndCreate([
     *     MockBackend,
     *     bind(Http).toFactory(backend, options) {
     *       return new Http(backend, options);
     *     }, [MockBackend, BaseRequestOptions]]);
     *   var backend = injector.get(MockBackend);
     *   var http = injector.get(Http);
     *   backend.connections.subscribe(c => connection = c);
     *   http.request('something.json').subscribe(res => {
     *     text = res.text();
     *   });
     *   connection.mockRespond(new Response('Something'));
     *   expect(text).toBe('Something');
     * });
     * ```
     *
     * This property only exists in the mock implementation, not in real Backends.
     */
    connections: Rx.Subject<MockConnection>;
    /**
     * An array representation of `connections`. This array will be updated with each connection that
     * is created by this backend.
     *
     * This property only exists in the mock implementation, not in real Backends.
     */
    connectionsArray: Array<MockConnection>;
    /**
     * [Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)
     * of {@link MockConnection} instances that haven't yet been resolved (i.e. with a `readyState`
     * less than 4). Used internally to verify that no connections are pending via the
     * `verifyNoPendingRequests` method.
     *
     * This property only exists in the mock implementation, not in real Backends.
     */
    pendingConnections: Rx.Observable<MockConnection>;
    constructor();
    /**
     * Checks all connections, and raises an exception if any connection has not received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    verifyNoPendingRequests(): void;
    /**
     * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
     * connections, if it's expected that there are connections that have not yet received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    resolveAllConnections(): void;
    /**
     * Creates a new {@link MockConnection}. This is equivalent to calling `new
     * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
     * observable of this `MockBackend` instance. This method will usually only be used by tests
     * against the framework itself, not by end-users.
     */
    createConnection(req: Request): MockConnection;
}
export declare var __esModule: boolean;
