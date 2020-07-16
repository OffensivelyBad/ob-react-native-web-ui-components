function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import Row from '../Row';
import StylePropType from '../StylePropType';
const styles = StyleSheet.create({
  empty: {},
  defaults: {
    justifyContent: 'center'
  }
});

const Center = ({
  style,
  ...props
}) => /*#__PURE__*/React.createElement(Row, _extends({
  style: [styles.defaults, style]
}, props));

Center.propTypes = {
  style: StylePropType,
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
Center.defaultProps = {
  style: styles.empty,
  xs: 12
};
export default withTheme('Center')(Center);