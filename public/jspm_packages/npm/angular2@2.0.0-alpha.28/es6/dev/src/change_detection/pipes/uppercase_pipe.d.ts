import { Pipe } from './pipe';
/**
 * Implements uppercase transforms to text.
 *
 * # Example
 *
 * In this example we transform the user text uppercase.
 *
 *  ```
 * @Component({
 *   selector: "username-cmp"
 * })
 * @View({
 *   template: "Username: {{ user | uppercase }}"
 * })
 * class Username {
 *   user:string;
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export declare class UpperCasePipe implements Pipe {
    _latestValue: string;
    supports(str: any): boolean;
    onDestroy(): void;
    transform(value: string): string;
}
/**
 * @exportedAs angular2/pipes
 */
export declare class UpperCaseFactory {
    supports(str: any): boolean;
    create(): Pipe;
}
