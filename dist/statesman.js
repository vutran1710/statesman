'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ginger = require('./ginger');

var statesman = {
  createStore: function createStore(defaultProps) {
    if (this.hasOwnProperty('store')) throw 'No re-creating store';
    Object.defineProperties(this, {
      store: { writable: false, value: [] },
      listeners: { writable: false, value: [] }
    });
    if (defaultProps) this.dispatch(defaultProps);

    return Promise.resolve();
  },
  getStore: function getStore(props) {
    if (!this.store) throw 'Store must be created first';
    var latest = this.store.slice(-1)[0];
    if (!latest) return {};
    if (!props) return latest;
    return (0, _ginger._pick)(props)(latest);
  },
  dispatch: function dispatch(obj) {
    var _this = this;

    var lastSet = Object.assign((0, _ginger._deepClone)(this.getStore()), obj);
    Object.freeze(lastSet);
    this.store.push(lastSet);
    this.listeners.forEach(function (_ref) {
      var component = _ref.component,
          props = _ref.props;

      if (props.some(function (p) {
        return obj.hasOwnProperty(p);
      })) {
        component.setState(_this.getStore(props));
      }
    });
    return Promise.resolve();
  },
  subscribe: function subscribe(component) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (this.listeners.find(function (item) {
      return item.component === component;
    })) return;
    this.listeners.push({ component: component, props: props });
  },
  unsubscribe: function unsubscribe(component) {
    var item = this.listeners.find(function (item) {
      return item.component === component;
    });
    if (!item) return;
    var index = this.listeners.findIndex(function (x) {
      return x === item;
    });
    this.listeners.splice(index, 1);
  }
};

exports.default = statesman;