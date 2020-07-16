function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform } from 'react-native';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
import View from '../View';
import Icon from '../Icon';
/* eslint react/no-array-index-key: 0 */

const styles = StyleSheet.create({
  default: {},
  container: {
    flexDirection: 'row'
  },
  empty: {
    marginRight: 1,
    color: '#C0C0C0',
    fontSize: 18
  },
  full: {
    marginRight: 1,
    color: '#FEC430',
    fontSize: 18
  },
  half: {
    marginRight: 1
  },
  halfLeft: {
    position: 'absolute'
  },
  halfRight: {
    position: 'absolute',
    overflow: 'hidden'
  }
});

const Item = ({
  index,
  style,
  leftStyle,
  rightStyle,
  iconName
}) => /*#__PURE__*/React.createElement(View, {
  className: `Rating__group Rating__group-${index}`,
  style: style
}, /*#__PURE__*/React.createElement(Icon, {
  name: iconName,
  className: `Rating Rating__${2 * index + 1}`,
  style: leftStyle
}), /*#__PURE__*/React.createElement(Icon, {
  name: iconName,
  className: `Rating Rating__${2 * index}`,
  style: rightStyle
}));

Item.propTypes = {
  index: PropTypes.number.isRequired,
  style: StylePropType.isRequired,
  leftStyle: StylePropType.isRequired,
  rightStyle: StylePropType.isRequired,
  iconName: PropTypes.string.isRequired
};

const Rating = ({
  style,
  emptyStyle,
  fullStyle,
  halfStyle,
  halfLeftStyle,
  halfRightStyle,
  rating,
  iconName,
  ...props
}) => {
  const r = rating || 0;
  const full = parseInt(r, 10);
  const half = parseInt((r - full) / 0.5, 10);
  const empty = 5 - full - half;
  const css = StyleSheet.flatten([styles.full, styles.halfLeft, fullStyle, halfLeftStyle]);
  let width = css.fontSize / 2;
  let size = css.fontSize;

  if (Platform.OS !== 'web') {
    width += 0.5;
    size += 1;
  }

  const subContainerStyle = [styles.half, {
    width: size,
    height: size
  }];
  const iconFullLeftStyle = [styles.full, styles.halfLeft, fullStyle];
  const iconFullRightStyle = [styles.full, styles.halfRight, fullStyle, {
    width
  }];
  const iconHalfEmptyStyle = [styles.empty, styles.halfLeft, emptyStyle, halfRightStyle];
  const iconHalfFullStyle = [styles.full, styles.halfRight, fullStyle, halfRightStyle, {
    width
  }];
  const iconEmptyLeftStyle = [styles.empty, styles.halfLeft, emptyStyle];
  const iconEmptyRightStyle = [styles.empty, styles.halfRight, emptyStyle, {
    width
  }];
  return /*#__PURE__*/React.createElement(View, _extends({}, props, {
    style: [styles.container, style]
  }), Array(full).fill(0).map((v, i) => /*#__PURE__*/React.createElement(Item, {
    key: `star-${i}`,
    index: i,
    style: subContainerStyle,
    leftStyle: iconFullLeftStyle,
    rightStyle: iconFullRightStyle,
    iconName: iconName
  })), half > 0 ? /*#__PURE__*/React.createElement(Item, {
    key: `star-${full}`,
    index: full,
    style: subContainerStyle,
    leftStyle: iconHalfEmptyStyle,
    rightStyle: iconHalfFullStyle,
    iconName: iconName
  }) : null, Array(empty).fill(0).map((v, i) => /*#__PURE__*/React.createElement(Item, {
    key: `star-${full + half + i}`,
    index: full + half + i,
    style: subContainerStyle,
    leftStyle: iconEmptyLeftStyle,
    rightStyle: iconEmptyRightStyle,
    iconName: iconName
  })));
};

Rating.propTypes = {
  style: StylePropType,
  emptyStyle: StylePropType,
  fullStyle: StylePropType,
  halfStyle: StylePropType,
  halfLeftStyle: StylePropType,
  halfRightStyle: StylePropType,
  rating: PropTypes.number,
  iconName: PropTypes.string
};
Rating.defaultProps = {
  style: styles.default,
  emptyStyle: styles.default,
  fullStyle: styles.default,
  halfStyle: styles.default,
  halfLeftStyle: styles.default,
  halfRightStyle: styles.default,
  rating: 0,
  iconName: 'star'
};
export default withTheme('Rating')(Rating);