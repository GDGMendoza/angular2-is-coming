/* */ 
'use strict';
var lang_1 = require("../facade/lang");
var collection_1 = require("../facade/collection");
var Headers = (function() {
  function Headers(headers) {
    var _this = this;
    if (lang_1.isBlank(headers)) {
      this._headersMap = new collection_1.Map();
      return;
    }
    if (lang_1.isPresent(headers._headersMap)) {
      this._headersMap = headers._headersMap;
    } else if (lang_1.isJsObject(headers)) {
      this._headersMap = collection_1.MapWrapper.createFromStringMap(headers);
      collection_1.MapWrapper.forEach(this._headersMap, function(v, k) {
        if (!collection_1.isListLikeIterable(v)) {
          var list = [];
          list.push(v);
          _this._headersMap.set(k, list);
        }
      });
    }
  }
  Headers.prototype.append = function(name, value) {
    var list = this._headersMap.get(name) || [];
    list.push(value);
    this._headersMap.set(name, list);
  };
  Headers.prototype.delete = function(name) {
    collection_1.MapWrapper.delete(this._headersMap, name);
  };
  Headers.prototype.forEach = function(fn) {
    return collection_1.MapWrapper.forEach(this._headersMap, fn);
  };
  Headers.prototype.get = function(header) {
    return collection_1.ListWrapper.first(this._headersMap.get(header));
  };
  Headers.prototype.has = function(header) {
    return this._headersMap.has(header);
  };
  Headers.prototype.keys = function() {
    return collection_1.MapWrapper.keys(this._headersMap);
  };
  Headers.prototype.set = function(header, value) {
    var list = [];
    if (!collection_1.isListLikeIterable(value)) {
      list.push(value);
    } else {
      list.push(collection_1.ListWrapper.toString(value));
    }
    this._headersMap.set(header, list);
  };
  Headers.prototype.values = function() {
    return collection_1.MapWrapper.values(this._headersMap);
  };
  Headers.prototype.getAll = function(header) {
    return this._headersMap.get(header) || [];
  };
  Headers.prototype.entries = function() {
    throw new lang_1.BaseException('"entries" method is not implemented on Headers class');
  };
  return Headers;
})();
exports.Headers = Headers;
exports.__esModule = true;
