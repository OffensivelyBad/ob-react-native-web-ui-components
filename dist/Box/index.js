function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import Column from '../Column';
import StylePropType from '../StylePropType';
const styles = StyleSheet.create({
  empty: {},
  defaults: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    borderColor: '#D3D6D6',
    borderWidth: 1,
    borderStyle: 'solid'
  }
});

const Box = ({
  style,
  ...props
}) => /*#__PURE__*/React.createElement(Column, _extends({
  xs: 12
}, props, {
  style: [styles.defaults, style]
}));

Box.propTypes = {
  style: StylePropType
};
Box.defaultProps = {
  style: styles.empty
};
export default withTheme('Box')(Box);