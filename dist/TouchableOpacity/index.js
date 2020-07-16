import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { withTheme } from '../Theme';

const TouchableOpacity = ({
  theme,
  onRef,
  className,
  ...props
}) => {
  const params = { ...theme.omit(props),
    dataSet: {
      class: className
    },
    'data-class': className,
    ref: undefined
  };

  if (onRef) {
    params.ref = onRef;
  }

  return /*#__PURE__*/React.createElement(RNTouchableOpacity, params);
};

TouchableOpacity.propTypes = {
  theme: PropTypes.shape().isRequired,
  className: PropTypes.string,
  onRef: PropTypes.func
};
TouchableOpacity.defaultProps = {
  className: '',
  onRef: null
};
const TouchableOpacityWithTheme = withTheme('TouchableOpacity')(TouchableOpacity); // eslint-disable-next-line

export default React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(TouchableOpacityWithTheme, props));