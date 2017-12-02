'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statesman = require('./statesman');

var _statesman2 = _interopRequireDefault(_statesman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connect = function connect(WrappedComponent, requestedProps) {
  return function (_PureComponent) {
    _inherits(_class2, _PureComponent);

    function _class2() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = _statesman2.default.getStore(requestedProps), _this.componentDidMount = function () {
        return _statesman2.default.subscribe(_this, requestedProps);
      }, _this.componentWillUnmount = function () {
        return _statesman2.default.unsubscribe(_this);
      }, _this.action = function (props) {
        return _statesman2.default.dispatch(props);
      }, _this.render = function () {
        return _react2.default.createElement(WrappedComponent, _extends({}, _this.props, _this.state, { dispatch: _this.action }));
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return _class2;
  }(_react.PureComponent);
};

exports.default = connect;