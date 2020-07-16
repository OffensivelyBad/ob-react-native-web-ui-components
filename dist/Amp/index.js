function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext } from 'react';
const AMP = React.createContext('amp');
export const {
  Provider
} = AMP;
export const {
  Consumer
} = AMP;
export const withAmp = () => Component => props => /*#__PURE__*/React.createElement(AMP.Consumer, null, amp => /*#__PURE__*/React.createElement(Component, _extends({}, props, {
  amp: amp
})));
export const useAmp = () => useContext(AMP);
export default {
  Provider,
  Consumer,
  useAmp,
  withAmp
};