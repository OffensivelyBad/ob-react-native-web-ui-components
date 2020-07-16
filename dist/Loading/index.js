function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import Popup from '../Popup';
import View from '../View';
import DefaultSpinner from '../Spinner';
const styles = StyleSheet.create({
  popup: {
    width: 120,
    backgroundColor: '#FFFFFF'
  }
});

const Loading = ({
  children,
  Spinner,
  ...props
}) => /*#__PURE__*/React.createElement(Popup, _extends({}, props, {
  className: "NoAdjustment",
  followKeyboard: true,
  header: false,
  width: 150,
  shouldCloseOnEsc: false
}), children, /*#__PURE__*/React.createElement(View, {
  style: styles.popup
}, /*#__PURE__*/React.createElement(Spinner, null)));

Loading.propTypes = {
  children: PropTypes.node,
  Spinner: PropTypes.func
};
Loading.defaultProps = {
  children: null,
  Spinner: DefaultSpinner
};
export default withTheme('Loading')(Loading);