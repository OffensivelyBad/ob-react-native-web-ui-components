function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import StylePropType from '../StylePropType';
import { pick } from '../utils';
import { withTheme } from '../Theme';
import { Helmet, style } from '../Helmet';
import Text from '../Text';
/* eslint react/destructuring-assignment: 0 */

const styles = StyleSheet.create({
  empty: {},
  defaults: {
    textAlign: 'center'
  }
});

const Title = ({
  id,
  level,
  xs,
  sm,
  md,
  lg,
  className,
  ...props
}) => {
  let defaultFontSize;

  switch (level) {
    case 1:
      defaultFontSize = 32;
      break;

    case 2:
      defaultFontSize = 24;
      break;

    case 3:
      defaultFontSize = 20;
      break;

    case 4:
      defaultFontSize = 16;
      break;

    default:
      defaultFontSize = 13;
  }

  const classNames = [className, id];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("style", null, `
            [data-class~="${id}"] {
              font-size: ${pick(xs, defaultFontSize)}px;
              line-height: ${parseFloat(pick(xs, defaultFontSize)) * 1.1}px;
            }
            @media (min-width: 768px) {
              [data-class~="${id}"] {
                font-size: ${pick(sm, xs, defaultFontSize)}px;
                line-height: ${parseFloat(pick(sm, xs, defaultFontSize)) * 1.1}px;
              }
            }
            @media (min-width: 992px) {
              [data-class~="${id}"] {
                font-size: ${pick(md, sm, xs, defaultFontSize)}px;
                line-height: ${parseFloat(pick(md, sm, xs, defaultFontSize)) * 1.1}px;
              }
            }
            @media (min-width: 1200px) {
              [data-class~="${id}"] {
                font-size: ${pick(lg, md, sm, xs, defaultFontSize)}px;
                line-height: ${parseFloat(pick(lg, md, sm, xs, defaultFontSize)) * 1.1}px;
              }
            }
          `)), /*#__PURE__*/React.createElement(Text, _extends({}, props, {
    className: classNames.join(' '),
    accessibilityRole: "heading",
    "aria-level": level,
    style: [styles.defaults, props.style]
  })));
};

Title.propTypes = {
  id: PropTypes.string.isRequired,
  style: StylePropType,
  level: PropTypes.number,
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
Title.defaultProps = {
  style: styles.empty,
  level: 1,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  className: ''
};
export default withTheme('Title')(Title);