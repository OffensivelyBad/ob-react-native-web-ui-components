import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import View from '../View';
import { withTheme } from '../Theme';
import { pick } from '../utils';
import StylePropType from '../StylePropType';
const styles = StyleSheet.create({
  empty: {}
});

const Column = ({
  lg,
  md,
  sm,
  xs,
  absolute,
  children,
  ...props
}) => {
  const smVal = pick(sm, xs);
  const mdVal = pick(md, sm, xs);
  const lgVal = pick(lg, md, sm, xs);
  let {
    className
  } = props;

  if (xs !== null) {
    className += ` col-xs-${xs}`;
  }

  if (smVal !== null) {
    className += ` col-sm-${smVal}`;
  }

  if (mdVal !== null) {
    className += ` col-md-${mdVal}`;
  }

  if (lgVal !== null) {
    className += ` col-lg-${lgVal}`;
  }

  let {
    style
  } = props;

  if (absolute) {
    style = [style, {
      width: xs
    }];
  }

  return /*#__PURE__*/React.createElement(View, {
    className: className,
    style: style
  }, children);
};

Column.propTypes = {
  children: PropTypes.node,
  style: StylePropType,
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  absolute: PropTypes.bool,
  className: PropTypes.string
};
Column.defaultProps = {
  children: null,
  style: styles.empty,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  absolute: false,
  className: ''
};
export default withTheme('Column')(Column);