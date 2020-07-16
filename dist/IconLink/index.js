function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
import Icon from '../Icon';
import Link from '../Link';
import Text from '../Text';

const IconLink = ({
  iconName,
  iconStyle,
  children,
  type,
  theme,
  ...props
}) => /*#__PURE__*/React.createElement(Link, _extends({
  type: type || theme.colors.primary
}, props), /*#__PURE__*/React.createElement(Text, {
  type: type || theme.colors.primary
}, /*#__PURE__*/React.createElement(Icon, {
  name: iconName,
  style: iconStyle
}), ' ', children));

IconLink.propTypes = {
  theme: PropTypes.shape().isRequired,
  iconName: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  iconStyle: StylePropType
};
IconLink.defaultProps = {
  type: null,
  iconStyle: null
};
export default withTheme('IconLink')(IconLink);