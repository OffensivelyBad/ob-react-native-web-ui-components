function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import StylePropType from '../StylePropType';
import Autocomplete from '../Autocomplete';
const styles = StyleSheet.create({
  input: {
    borderColor: 'transparent',
    paddingLeft: 0,
    flex: 1
  },
  container: {
    flex: 1
  },
  menu: {
    width: '100%'
  }
});

const Input = ({
  style,
  menuStyle,
  containerStyle,
  ...props
}) => /*#__PURE__*/React.createElement(Autocomplete, _extends({}, props, {
  allowEmpty: false,
  style: [styles.input, style],
  menuStyle: [styles.menu, menuStyle],
  containerStyle: [styles.container, containerStyle]
}));

Input.propTypes = {
  style: StylePropType,
  menuStyle: StylePropType,
  containerStyle: StylePropType
};
Input.defaultProps = {
  style: null,
  menuStyle: null,
  containerStyle: null
};
export default withTheme('TagInputInput')(Input);