function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, Platform, StyleSheet, ScrollView as RNScrollView } from 'react-native';
import noop from 'lodash/noop';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
const styles = StyleSheet.create({
  empty: {},
  defaults: {
    backgroundColor: '#23AAAA'
  }
});
const defaultScrollProps = {};

if (Platform.OS === 'android') {
  defaultScrollProps.onScroll = Keyboard.dismiss;
}

const ScrollView = ({
  children,
  style,
  theme,
  onRef,
  ...props
}) => /*#__PURE__*/React.createElement(RNScrollView, _extends({
  ref: onRef,
  keyboardShouldPersistTaps: "always",
  keyboardDismissMode: "on-drag"
}, defaultScrollProps, theme.omit(props), {
  style: [styles.defaults, style]
}), children);

ScrollView.propTypes = {
  theme: PropTypes.shape().isRequired,
  children: PropTypes.node,
  style: StylePropType,
  onRef: PropTypes.func
};
ScrollView.defaultProps = {
  children: null,
  style: styles.empty,
  onRef: noop
};
export default withTheme('ScrollView')(ScrollView);