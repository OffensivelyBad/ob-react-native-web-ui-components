function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import Row from '../Row';
import StylePropType from '../StylePropType';
const styles = StyleSheet.create({
  empty: {},
  defaults: {
    padding: 15,
    borderTopColor: '#D3D6D6',
    borderTopWidth: 1,
    borderStyle: 'solid'
  }
});

const BoxItem = ({
  style,
  ...props
}) => /*#__PURE__*/React.createElement(Row, _extends({}, props, {
  style: [styles.defaults, style]
}));

BoxItem.propTypes = {
  style: StylePropType
};
BoxItem.defaultProps = {
  style: styles.empty
};
export default withTheme('BoxItem')(BoxItem);