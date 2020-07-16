function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import BoxItem from '../BoxItem';
import StylePropType from '../StylePropType';
const styles = StyleSheet.create({
  empty: {},
  defaults: {
    alignItems: 'center'
  }
});

const BoxButtonRow = ({
  style,
  ...props
}) => /*#__PURE__*/React.createElement(BoxItem, _extends({}, props, {
  style: [styles.defaults, style]
}));

BoxButtonRow.propTypes = {
  style: StylePropType
};
BoxButtonRow.defaultProps = {
  style: styles.empty
};
export default withTheme('BoxButtonRow')(BoxButtonRow);