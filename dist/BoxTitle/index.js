function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
import Text from '../Text';
const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    lineHeight: 40,
    height: 40,
    paddingLeft: 15
  }
});

const BoxTitle = ({
  style,
  ...props
}) => /*#__PURE__*/React.createElement(Text, _extends({}, props, {
  style: [styles.title, style]
}));

BoxTitle.propTypes = {
  style: StylePropType
};
BoxTitle.defaultProps = {
  style: null
};
export default withTheme('BoxTitle')(BoxTitle);