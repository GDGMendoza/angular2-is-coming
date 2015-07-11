import { Headers } from './headers';
import { URLSearchParams } from './url_search_params';
import { RequestModesOpts, RequestMethods, RequestCacheOpts, RequestCredentialsOpts } from './enums';
import { IRequestOptions } from './interfaces';
/**
 * Creates a request options object with default properties as described in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit) to be optionally provided when instantiating a
 * {@link Request}. This class is used implicitly by {@link Http} to merge in provided request
 * options with the default options specified here. These same default options are injectable via
 * the {@link BaseRequestOptions} class.
 */
export declare class RequestOptions implements IRequestOptions {
    /**
     * Http method with which to execute the request.
     *
     * Defaults to "GET".
     */
    method: RequestMethods;
    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class).
     */
    headers: Headers;
    /**
     * Body to be used when creating the request.
     */
    body: URLSearchParams | FormData | Blob | string;
    mode: RequestModesOpts;
    credentials: RequestCredentialsOpts;
    cache: RequestCacheOpts;
    constructor({method, headers, body, mode, credentials, cache}?: IRequestOptions);
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values.
     */
    merge(opts?: IRequestOptions): RequestOptions;
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
export declare class BaseRequestOptions extends RequestOptions {
    constructor();
}
