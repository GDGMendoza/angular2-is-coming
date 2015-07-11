/* */ 
"format cjs";
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { isPresent, normalizeBlank } from 'angular2/src/facade/lang';
export class RouteParams {
    constructor(params) {
        this.params = params;
    }
    get(param) { return normalizeBlank(StringMapWrapper.get(this.params, param)); }
}
/**
 * An `Instruction` represents the component hierarchy of the application based on a given route
 */
export class Instruction {
    constructor({ params, component, child, matchedUrl, parentSpecificity } = {}) {
        this.reuse = false;
        this.capturedUrl = matchedUrl;
        this.accumulatedUrl = matchedUrl;
        this.specificity = parentSpecificity;
        if (isPresent(child)) {
            this.child = child;
            this.specificity += child.specificity;
            var childUrl = child.accumulatedUrl;
            if (isPresent(childUrl)) {
                this.accumulatedUrl += childUrl;
            }
        }
        else {
            this.child = null;
        }
        this.component = component;
        this.params = params;
    }
    hasChild() { return isPresent(this.child); }
    /**
     * Takes a currently active instruction and sets a reuse flag on each of this instruction's
     * children
     */
    reuseComponentsFrom(oldInstruction) {
        var nextInstruction = this;
        while (nextInstruction.reuse = shouldReuseComponent(nextInstruction, oldInstruction) &&
            isPresent(oldInstruction = oldInstruction.child) &&
            isPresent(nextInstruction = nextInstruction.child))
            ;
    }
}
function shouldReuseComponent(instr1, instr2) {
    return instr1.component == instr2.component &&
        StringMapWrapper.equals(instr1.params, instr2.params);
}
//# sourceMappingURL=instruction.js.map