/* */ 
"format cjs";
import { baseResponseOptions } from './base_response_options';
import { BaseException, isJsObject, isString, global } from 'angular2/src/facade/lang';
import { Headers } from './headers';
// TODO: make this injectable so baseResponseOptions can be overridden, mostly for the benefit of
// headers merging.
/**
 * Creates `Response` instances with default values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * #Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 */
export class Response {
    constructor(_body, { status, statusText, headers, type, url } = baseResponseOptions) {
        this._body = _body;
        if (isJsObject(headers)) {
            headers = new Headers(headers);
        }
        this.status = status;
        this.statusText = statusText;
        this.headers = headers;
        this.type = type;
        this.url = url;
    }
    /**
     * Not yet implemented
     */
    blob() {
        throw new BaseException('"blob()" method not implemented on Response superclass');
    }
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    json() {
        if (isJsObject(this._body)) {
            return this._body;
        }
        else if (isString(this._body)) {
            return global.JSON.parse(this._body);
        }
    }
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
    text() { return this._body.toString(); }
    /**
     * Not yet implemented
     */
    arrayBuffer() {
        throw new BaseException('"arrayBuffer()" method not implemented on Response superclass');
    }
}
//# sourceMappingURL=static_response.js.map