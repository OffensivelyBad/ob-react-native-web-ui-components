function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import View from '../View';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
import { useAmp } from '../Amp';

const Img = ({
  alt,
  fixed,
  source,
  className,
  srcSet,
  sizes,
  css
}) => {
  const imgStyle = fixed ? css : {
    maxWidth: '100%',
    maxHeight: '100%',
    width: css.width,
    height: css.height
  };
  return /*#__PURE__*/React.createElement("img", {
    alt: alt,
    "data-class": `${className} image-${fixed ? 'fixed' : 'responsive'}`,
    src: source.uri,
    style: imgStyle,
    srcSet: srcSet,
    sizes: sizes
  });
};

Img.propTypes = {
  css: PropTypes.shape().isRequired,
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired
  }).isRequired,
  fixed: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string
};
Img.defaultProps = {
  srcSet: undefined,
  sizes: undefined
};

const AmpImg = ({
  alt,
  className,
  fixed,
  cover,
  source,
  srcSet,
  sizes,
  css
}) => {
  let layout;

  if (fixed) {
    layout = 'fixed';
  } else if (cover) {
    layout = 'fill';
  } else {
    layout = 'intrinsic';
  }

  return /*#__PURE__*/React.createElement("amp-img", {
    alt: alt,
    "data-class": `${layout} ${className}`,
    width: `${css.width}`,
    height: `${css.height}`,
    src: source.uri,
    layout: layout,
    srcset: srcSet,
    sizes: sizes
  }, /*#__PURE__*/React.createElement("noscript", null, /*#__PURE__*/React.createElement("img", {
    alt: alt,
    "data-class": className,
    width: css.width,
    height: css.height,
    src: source.uri
  })));
};

AmpImg.propTypes = {
  css: PropTypes.shape().isRequired,
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired
  }).isRequired,
  fixed: PropTypes.bool.isRequired,
  cover: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string
};
AmpImg.defaultProps = {
  srcSet: undefined,
  sizes: undefined
};

const Image = props => {
  const amp = useAmp();
  const {
    style,
    fixed
  } = props;
  const css = StyleSheet.flatten(style || {});

  if (!css.width || !css.height) {
    throw new Error('AMP Image requires `style.width` and `style.height`');
  }

  if (fixed) {
    const dynamicStyles = StyleSheet.create({
      fixedImage: {
        width: css.width,
        height: css.height
      }
    });
    return /*#__PURE__*/React.createElement("div", {
      "data-class": "image-outer-wrapper",
      style: {
        width: css.width,
        height: css.height
      }
    }, /*#__PURE__*/React.createElement(View, {
      className: "image-wrapper",
      style: dynamicStyles.fixedImage
    }, amp ? /*#__PURE__*/React.createElement(AmpImg, _extends({}, props, {
      css: css
    })) : /*#__PURE__*/React.createElement(Img, _extends({}, props, {
      css: css
    }))));
  }

  return /*#__PURE__*/React.createElement("div", {
    "data-class": "image-outer-wrapper"
  }, amp ? /*#__PURE__*/React.createElement(AmpImg, _extends({}, props, {
    css: css
  })) : /*#__PURE__*/React.createElement(Img, _extends({}, props, {
    css: css
  })));
};

Image.propTypes = {
  style: StylePropType.isRequired,
  fixed: PropTypes.bool,
  cover: PropTypes.bool,
  // eslint-disable-line
  className: PropTypes.string,
  // eslint-disable-line
  alt: PropTypes.string // eslint-disable-line

};
Image.defaultProps = {
  fixed: false,
  cover: false,
  className: '',
  alt: ''
};
export default withTheme('Image')(Image);