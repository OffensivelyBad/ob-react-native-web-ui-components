function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import RNDropzone from 'react-dropzone';
import noop from 'lodash/noop';
import { withTheme } from '../Theme';
import StylePropType from '../StylePropType';
const styles = {
  container: {
    borderWidth: 5,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
    width: '100%',
    minHeight: 150
  },
  inner: {}
};

const Dropzone = ({
  theme,
  style,
  accept,
  children,
  onDrop,
  multiple,
  disabled,
  onRef
}) => /*#__PURE__*/React.createElement(RNDropzone, {
  ref: ref => onRef(ref),
  onDrop: onDrop,
  accept: accept[0] === '*/*' ? null : accept,
  multiple: multiple,
  disabled: disabled
}, ({
  getRootProps,
  getInputProps
}) => {
  const currentStyle = [styles.container];

  if (disabled) {
    currentStyle.push(theme.input.disabled.opacity);
  }

  currentStyle.push(style);
  return /*#__PURE__*/React.createElement("div", _extends({}, getRootProps(), {
    style: { ...StyleSheet.flatten(currentStyle)
    }
  }), /*#__PURE__*/React.createElement("input", getInputProps()), /*#__PURE__*/React.createElement("div", {
    style: styles.inner
  }, children));
});

Dropzone.propTypes = {
  theme: PropTypes.shape().isRequired,
  accept: PropTypes.arrayOf(PropTypes.string),
  onDrop: PropTypes.func,
  style: StylePropType,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onRef: PropTypes.func
};
Dropzone.defaultProps = {
  accept: ['*/*'],
  onDrop: noop,
  style: null,
  children: null,
  multiple: true,
  disabled: false,
  onRef: noop
};
export default withTheme('Dropzone')(Dropzone);