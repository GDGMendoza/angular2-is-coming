/* */ 
"format cjs";
import { ListWrapper, MapWrapper } from 'angular2/src/facade/collection';
import { DOM } from 'angular2/src/dom/dom_adapter';
import { isPresent, isString, RegExpWrapper, StringWrapper } from 'angular2/src/facade/lang';
import { resolveInternalDomView } from 'angular2/src/render/dom/view/view';
export class Log {
    constructor() {
        this._result = [];
    }
    add(value) { this._result.push(value); }
    fn(value) {
        return (a1 = null, a2 = null, a3 = null, a4 = null, a5 = null) => { this._result.push(value); };
    }
    result() { return ListWrapper.join(this._result, "; "); }
}
export function viewRootNodes(view) {
    return resolveInternalDomView(view.render).rootNodes;
}
export function queryView(view, selector) {
    var rootNodes = viewRootNodes(view);
    for (var i = 0; i < rootNodes.length; ++i) {
        var res = DOM.querySelector(rootNodes[i], selector);
        if (isPresent(res)) {
            return res;
        }
    }
    return null;
}
export function dispatchEvent(element, eventType) {
    DOM.dispatchEvent(element, DOM.createEvent(eventType));
}
export function el(html) {
    return DOM.firstChild(DOM.content(DOM.createTemplate(html)));
}
var _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
var _ESCAPE_RE = RegExpWrapper.create(`[\\${_RE_SPECIAL_CHARS.join('\\')}]`);
export function containsRegexp(input) {
    return RegExpWrapper.create(StringWrapper.replaceAllMapped(input, _ESCAPE_RE, (match) => `\\${match[0]}`));
}
export function normalizeCSS(css) {
    css = StringWrapper.replaceAll(css, RegExpWrapper.create('\\s+'), ' ');
    css = StringWrapper.replaceAll(css, RegExpWrapper.create(':\\s'), ':');
    css = StringWrapper.replaceAll(css, RegExpWrapper.create("\\'"), '"');
    css = StringWrapper.replaceAllMapped(css, RegExpWrapper.create('url\\(\\"(.+)\\"\\)'), (match) => `url(${match[1]})`);
    css = StringWrapper.replaceAllMapped(css, RegExpWrapper.create('\\[(.+)=([^"\\]]+)\\]'), (match) => `[${match[1]}="${match[2]}"]`);
    return css;
}
var _singleTagWhitelist = ['br', 'hr', 'input'];
export function stringifyElement(el) {
    var result = '';
    if (DOM.isElementNode(el)) {
        var tagName = StringWrapper.toLowerCase(DOM.tagName(el));
        // Opening tag
        result += `<${tagName}`;
        // Attributes in an ordered way
        var attributeMap = DOM.attributeMap(el);
        var keys = [];
        MapWrapper.forEach(attributeMap, (v, k) => { keys.push(k); });
        ListWrapper.sort(keys);
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            var attValue = attributeMap.get(key);
            if (!isString(attValue)) {
                result += ` ${key}`;
            }
            else {
                result += ` ${key}="${attValue}"`;
            }
        }
        result += '>';
        // Children
        var children = DOM.childNodes(DOM.templateAwareRoot(el));
        for (let j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (!ListWrapper.contains(_singleTagWhitelist, tagName)) {
            result += `</${tagName}>`;
        }
    }
    else {
        result += DOM.getText(el);
    }
    return result;
}
//# sourceMappingURL=utils.js.map