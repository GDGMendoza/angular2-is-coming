import { ConnectionBackend, Connection } from '../interfaces';
import { ReadyStates } from '../enums';
import { Request } from '../static_request';
import { Response } from '../static_response';
import { BrowserXHR } from './browser_xhr';
import * as Rx from 'rx';
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {@link MockConnection} may be interacted with in tests.
 */
export declare class XHRConnection implements Connection {
    request: Request;
    /**
     * Response
     * [Subject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/subject.md)
     * which emits a single {@link Response} value on load event of `XMLHttpRequest`.
     */
    response: Rx.Subject<Response>;
    readyState: ReadyStates;
    private _xhr;
    constructor(req: Request, NativeConstruct: any);
    /**
     * Calls abort on the underlying XMLHttpRequest.
     */
    dispose(): void;
}
/**
 * Creates {@link XHRConnection} instances.
 *
 * This class would typically not be used by end users, but could be
 * overridden if a different backend implementation should be used,
 * such as in a node backend.
 *
 * #Example
 *
 * ```
 * import {Http, MyNodeBackend, httpInjectables, BaseRequestOptions} from 'angular2/http';
 * @Component({
 *   appInjector: [
 *     httpInjectables,
 *     bind(Http).toFactory((backend, options) => {
 *       return new Http(backend, options);
 *     }, [MyNodeBackend, BaseRequestOptions])]
 * })
 * class MyComponent {
 *   constructor(http:Http) {
 *     http('people.json').subscribe(res => this.people = res.json());
 *   }
 * }
 * ```
 *
 **/
export declare class XHRBackend implements ConnectionBackend {
    private _NativeConstruct;
    constructor(_NativeConstruct: BrowserXHR);
    createConnection(request: Request): XHRConnection;
}
export declare var __esModule: boolean;
