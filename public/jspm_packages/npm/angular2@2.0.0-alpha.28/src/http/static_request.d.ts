import { RequestMethods, RequestModesOpts, RequestCredentialsOpts } from './enums';
import { IRequestOptions, IRequest } from './interfaces';
import { Headers } from './headers';
/**
 * Creates `Request` instances with default values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 */
export declare class Request implements IRequest {
    /** Url of the remote resource */ url: string;
    /**
     * Http method with which to perform the request.
     *
     * Defaults to GET.
     */
    method: RequestMethods;
    mode: RequestModesOpts;
    credentials: RequestCredentialsOpts;
    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class). {@link Headers} class reference.
     */
    headers: Headers;
    private _body;
    constructor(/** Url of the remote resource */ url: string, {body, method, mode, credentials, headers}?: IRequestOptions);
    /**
     * Returns the request's body as string, assuming that body exists. If body is undefined, return
     * empty
     * string.
     */
    text(): String;
}
export declare var __esModule: boolean;