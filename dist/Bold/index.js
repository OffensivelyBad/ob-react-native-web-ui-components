function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
import Text from '../Text';
const styles = StyleSheet.create({
  empty: {},
  defaults: {
    fontWeight: 'bold'
  }
});

const Bold = ({
  style,
  ...props
}) => {
  let currentStyle = styles.defaults;

  if (style !== styles.empty) {
    currentStyle = [styles.defaults, style];
  }

  return /*#__PURE__*/React.createElement(Text, _extends({}, props, {
    style: currentStyle
  }));
};

Bold.propTypes = {
  style: StylePropType
};
Bold.defaultProps = {
  style: styles.empty
};
export default withTheme('Bold')(Bold);