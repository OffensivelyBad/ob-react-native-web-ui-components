import React from 'react';
import PropTypes from 'prop-types';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
import Icon from '../Icon';
import Text from '../Text';

const IconText = ({
  iconName,
  iconStyle,
  children,
  type,
  theme
}) => /*#__PURE__*/React.createElement(Text, {
  type: type || theme.colors.text
}, /*#__PURE__*/React.createElement(Icon, {
  name: iconName,
  style: iconStyle
}), ' ', children);

IconText.propTypes = {
  theme: PropTypes.shape().isRequired,
  iconName: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  iconStyle: StylePropType
};
IconText.defaultProps = {
  type: null,
  iconStyle: null
};
export default withTheme('IconText')(IconText);