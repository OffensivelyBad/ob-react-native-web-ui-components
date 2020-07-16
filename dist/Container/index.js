function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import { useScreen } from '../Screen';
import View from '../View';
import StylePropType from '../StylePropType';
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
};
const styles = StyleSheet.create({
  empty: {},
  row: { ...rowStyle
  },
  outerRow: { ...rowStyle,
    justifyContent: 'center'
  },
  innerRow: { ...rowStyle,
    width: 960
  },
  innerRowXs: { ...rowStyle,
    width: '95%'
  }
});

const Container = props => {
  const screen = useScreen();
  const {
    type,
    style
  } = props;

  if (type === 'full') {
    return /*#__PURE__*/React.createElement(View, _extends({}, props, {
      style: [styles.row, style]
    }));
  }

  if (screen.type === 'md' || screen.type === 'lg') {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.outerRow
    }, /*#__PURE__*/React.createElement(View, _extends({
      className: type
    }, props, {
      style: [styles.innerRow, style]
    })));
  }

  return /*#__PURE__*/React.createElement(View, {
    style: styles.outerRow
  }, /*#__PURE__*/React.createElement(View, _extends({
    className: type
  }, props, {
    style: [styles.innerRowXs, style]
  })));
};

Container.propTypes = {
  type: PropTypes.oneOf(['limited', 'full']),
  children: PropTypes.node,
  style: StylePropType
};
Container.defaultProps = {
  type: 'full',
  children: null,
  style: styles.empty
};
export default withTheme('Container')(Container);