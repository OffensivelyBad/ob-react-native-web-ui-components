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

const Confirm = ({
  theme,
  yesText,
  noText,
  children,
  onNo,
  onYes,
  ...props
}) => {
  const [answer, setAnswer] = useState(null);

  const closePress = () => onNo();

  const yesPress = () => {
    setAnswer(true);
    onYes();
  };

  const noPress = () => {
    setAnswer(false);
    onNo();
  };

  return /*#__PURE__*/React.createElement(Popup, _extends({
    shouldCloseOnEsc: true
  }, props, {
    followKeyboard: true,
    onClose: closePress,
    visible: answer === null,
    className: "NoAdjustment"
  }), typeof children === 'string' ? /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, children) : children, /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(Button, {
    auto: true,
    type: theme.colors.primary,
    flat: false,
    onPress: yesPress
  }, yesText), /*#__PURE__*/React.createElement(Button, {
    auto: true,
    type: theme.colors.primary,
    flat: false,
    onPress: noPress
  }, noText)));
};

Confirm.propTypes = {
  theme: PropTypes.shape().isRequired,
  children: PropTypes.node,
  yesText: PropTypes.string,
  noText: PropTypes.string,
  onYes: PropTypes.func,
  onNo: PropTypes.func
};
Confirm.defaultProps = {
  children: null,
  yesText: 'Yes',
  noText: 'No',
  onYes: noop,
  onNo: noop
};
export default withTheme('Confirm')(Confirm);