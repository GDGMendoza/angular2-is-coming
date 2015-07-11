/* */ 
"format cjs";
import { PromiseWrapper } from 'angular2/src/facade/async';
/**
 * Responsible for performing each step of navigation.
 * "Steps" are conceptually similar to "middleware"
 */
export class Pipeline {
    constructor() {
        this.steps = [instruction => instruction.router.activateOutlets(instruction)];
    }
    process(instruction) {
        var steps = this.steps, currentStep = 0;
        function processOne(result = true) {
            if (currentStep >= steps.length) {
                return PromiseWrapper.resolve(result);
            }
            var step = steps[currentStep];
            currentStep += 1;
            return PromiseWrapper.resolve(step(instruction)).then(processOne);
        }
        return processOne();
    }
}
//# sourceMappingURL=pipeline.js.map