export { MockConnection, MockBackend } from 'angular2/src/http/backends/mock_backend';
export { Request } from 'angular2/src/http/static_request';
export { Response } from 'angular2/src/http/static_response';
export { Http, XHRBackend, XHRConnection, BaseRequestOptions, RequestOptions, HttpFactory };
export { IHttp, IRequestOptions, IRequest, IResponse, Connection, ConnectionBackend } from 'angular2/src/http/interfaces';
export { Headers } from 'angular2/src/http/headers';
export * from 'angular2/src/http/enums';
export { URLSearchParams } from 'angular2/src/http/url_search_params';
/**
 * Provides a basic set of injectables to use the {@link Http} service in any application.
 *
 * #Example
 *
 * ```
 * import {httpInjectables, Http} from 'angular2/http';
 * @Component({selector: 'http-app', appInjector: [httpInjectables]})
 * @View({template: '{{data}}'})
 * class MyApp {
 *   constructor(http:Http) {
 *     http.request('data.txt').subscribe(res => this.data = res.text());
 *   }
 * }
 * ```
 *
 */
export declare var httpInjectables: List<any>;