/* */ 
"format cjs";
import { Json } from 'angular2/src/facade/lang';
import { BasePipe } from './pipe';
/**
 * Implements json transforms to any object.
 *
 * # Example
 *
 * In this example we transform the user object to json.
 *
 *  ```
 * @Component({
 *   selector: "user-cmp"
 * })
 * @View({
 *   template: "User: {{ user | json }}"
 * })
 * class Username {
 *  user:Object
 *  constructor() {
 *    this.user = { name: "PatrickJS" };
 *  }
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export class JsonPipe extends BasePipe {
    transform(value) { return Json.stringify(value); }
    create(cdRef) { return this; }
}
//# sourceMappingURL=json_pipe.js.map