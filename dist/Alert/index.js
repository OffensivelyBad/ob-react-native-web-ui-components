function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import noop from 'lodash/noop';
import { withTheme } from '../Theme';
import Popup from '../Popup';
import Button from '../Button';
import Center from '../Center';
import Text from '../Text';
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 15
  }
});

const Alert = ({
  theme,
  children,
  visible,
  onOk,
  okLabel,
  ...props
}) => {
  const [isVisible, setVisible] = useState(visible);

  const hide = () => {
    setVisible(false);
    onOk();
  };

  return /*#__PURE__*/React.createElement(Popup, _extends({
    shouldCloseOnEsc: true
  }, props, {
    onClose: onOk,
    followKeyboard: true,
    visible: isVisible,
    className: "NoAdjustment"
  }), typeof children === 'string' ? /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, children) : children, /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(Button, {
    auto: true,
    type: theme.colors.primary,
    flat: false,
    onPress: hide
  }, okLabel)));
};

Alert.propTypes = {
  theme: PropTypes.shape().isRequired,
  visible: PropTypes.bool,
  children: PropTypes.node,
  onOk: PropTypes.func,
  okLabel: PropTypes.string
};
Alert.defaultProps = {
  visible: true,
  children: null,
  onOk: noop,
  okLabel: 'Ok'
};
export default withTheme('Alert')(Alert);