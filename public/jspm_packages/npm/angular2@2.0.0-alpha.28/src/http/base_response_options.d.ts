import { Headers } from './headers';
import { ResponseTypes } from './enums';
import { ResponseOptions } from './interfaces';
export declare class BaseResponseOptions implements ResponseOptions {
    status: number;
    headers: Headers | Object;
    statusText: string;
    type: ResponseTypes;
    url: string;
    constructor({status, statusText, type, headers, url}?: ResponseOptions);
}
export declare var baseResponseOptions: BaseResponseOptions;
export declare var __esModule: boolean;