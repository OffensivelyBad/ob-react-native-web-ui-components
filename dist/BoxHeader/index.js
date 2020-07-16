function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import Row from '../Row';
import StylePropType from '../StylePropType';
const styles = StyleSheet.create({
  empty: {},
  defaults: {
    backgroundColor: '#D4D4D4',
    height: 40,
    alignItems: 'center'
  }
});

const BoxHeader = ({
  style,
  ...props
}) => /*#__PURE__*/React.createElement(Row, _extends({}, props, {
  style: [styles.defaults, style]
}));

BoxHeader.propTypes = {
  style: StylePropType
};
BoxHeader.defaultProps = {
  style: styles.empty
};
export default withTheme('BoxHeader')(BoxHeader);