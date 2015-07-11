/* */ 
"format cjs";
import { RequestMethods, RequestModesOpts, RequestCredentialsOpts } from './enums';
import { Headers } from './headers';
// TODO(jeffbcross): properly implement body accessors
/**
 * Creates `Request` instances with default values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 */
export class Request {
    constructor(/** Url of the remote resource */ url, { body, method = RequestMethods.GET, mode = RequestModesOpts.Cors, credentials = RequestCredentialsOpts.Omit, headers = new Headers() } = {}) {
        this.url = url;
        this._body = body;
        this.method = method;
        // Defaults to 'cors', consistent with browser
        // TODO(jeffbcross): implement behavior
        this.mode = mode;
        // Defaults to 'omit', consistent with browser
        // TODO(jeffbcross): implement behavior
        this.credentials = credentials;
        this.headers = headers;
    }
    /**
     * Returns the request's body as string, assuming that body exists. If body is undefined, return
     * empty
     * string.
     */
    text() { return this._body ? this._body.toString() : ''; }
}
//# sourceMappingURL=static_request.js.map