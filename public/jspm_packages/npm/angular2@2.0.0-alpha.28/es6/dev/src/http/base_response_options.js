/* */ 
"format cjs";
import { Headers } from './headers';
import { ResponseTypes } from './enums';
export class BaseResponseOptions {
    constructor({ status = 200, statusText = 'Ok', type = ResponseTypes.Default, headers = new Headers(), url = '' } = {}) {
        this.status = status;
        this.statusText = statusText;
        this.type = type;
        this.headers = headers;
        this.url = url;
    }
}
;
export var baseResponseOptions = Object.freeze(new BaseResponseOptions());
//# sourceMappingURL=base_response_options.js.map