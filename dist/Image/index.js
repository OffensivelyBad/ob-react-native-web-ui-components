function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { Image as CachedImage } from 'react-native-expo-image-cache';
import { withTheme } from '../Theme';

const Image = ({
  source,
  ...props
}) => /*#__PURE__*/React.createElement(CachedImage, _extends({}, props, {
  uri: source.uri,
  tint: "light"
}));

Image.propTypes = {
  source: PropTypes.shape().isRequired
};
export default withTheme('Image')(Image);