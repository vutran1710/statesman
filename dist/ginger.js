"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _deepClone = exports._deepClone = function _deepClone(jsobject) {
  return Object.keys(jsobject).reduce(function (result, key) {
    return Object.defineProperty(result, key, {
      value: jsobject[key],
      writable: true,
      enumerable: true
    });
  }, {});
};

var _pick = exports._pick = function _pick(props) {
  return function (source) {
    return props.reduce(function (result, key) {
      return source.hasOwnProperty(key) ? Object.assign(_defineProperty({}, key, source[key]), result) : result;
    }, {});
  };
};