function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StylePropType from '../StylePropType';
import { toDescription } from '../utils';
import { withTheme } from '../Theme';
import Text from '../Text';
import ReadMoreLessLink from '../ReadMoreLessLink';
import { useAmp } from '../Amp';

const HideShowText = ({
  visible,
  threshold,
  children,
  buttonStyle,
  showLabel,
  hideLabel,
  ending,
  auto,
  ...props
}) => {
  const amp = useAmp();
  const [isVisible, setVisible] = useState(visible);

  const toggle = () => setVisible(!isVisible);

  if (amp) {
    return /*#__PURE__*/React.createElement(Text, props, children);
  }

  const visibleText = toDescription(children, threshold, ending);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, _extends({
    auto: auto
  }, props), isVisible ? children : visibleText, auto && visibleText !== children ? /*#__PURE__*/React.createElement(React.Fragment, null, ' ', /*#__PURE__*/React.createElement(ReadMoreLessLink, {
    auto: true,
    showLabel: showLabel,
    hideLabel: hideLabel,
    style: buttonStyle,
    type: "pink",
    onChange: toggle,
    visible: isVisible
  })) : null), !auto && visibleText !== children ? /*#__PURE__*/React.createElement(ReadMoreLessLink, {
    showLabel: showLabel,
    hideLabel: hideLabel,
    style: buttonStyle,
    type: "pink",
    onChange: toggle,
    visible: isVisible
  }) : null);
};

HideShowText.propTypes = {
  children: PropTypes.string.isRequired,
  auto: PropTypes.bool,
  visible: PropTypes.bool,
  threshold: PropTypes.number,
  buttonStyle: StylePropType,
  ending: PropTypes.string,
  showLabel: PropTypes.string,
  hideLabel: PropTypes.string
};
HideShowText.defaultProps = {
  auto: false,
  visible: false,
  threshold: 200,
  buttonStyle: null,
  ending: '...',
  showLabel: 'show more...',
  hideLabel: 'show less...'
};
export default withTheme('HideShowText')(HideShowText);