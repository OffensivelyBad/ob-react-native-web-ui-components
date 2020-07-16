import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { withRouter } from 'react-router';
import NativeSidebar from './NativeSidebar';
import { withTheme } from '../Theme';
import { useScreen } from '../Screen';
import { useDerivedState, isSSR } from '../utils';
import Row from '../Row';

const Sidebar = ({
  location,
  leftOpen,
  rightOpen,
  leftOnChange,
  rightOnChange,
  leftComponent,
  rightComponent,
  edgeHitWidth,
  disabled,
  children
}) => {
  const screen = useScreen();
  useDerivedState(location.pathname, () => {
    setTimeout(() => {
      if (leftOnChange) {
        leftOnChange(false);
      }

      if (rightOnChange) {
        rightOnChange(false);
      }
    });
  });

  if (isSSR()) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        width: '100%'
      }
    }, children);
  }

  if (screen.type === 'xs' || screen.type === 'sm') {
    const styles = {
      sidebar: {
        width: Math.min(screen.width * 0.8, 400)
      }
    };

    if (leftComponent && rightComponent) {
      return /*#__PURE__*/React.createElement(NativeSidebar, {
        styles: styles,
        open: leftOpen,
        bounceBackOnOverdraw: false,
        sidebar: leftComponent,
        onSetOpen: leftOnChange,
        touchHandleWidth: edgeHitWidth,
        touch: !(disabled || rightOpen)
      }, /*#__PURE__*/React.createElement(NativeSidebar, {
        styles: styles,
        open: rightOpen,
        bounceBackOnOverdraw: false,
        sidebar: rightComponent,
        pullRight: true,
        onSetOpen: rightOnChange,
        touchHandleWidth: edgeHitWidth,
        touch: !disabled
      }, children));
    }

    if (leftComponent) {
      return /*#__PURE__*/React.createElement(NativeSidebar, {
        styles: styles,
        open: leftOpen,
        bounceBackOnOverdraw: false,
        sidebar: leftComponent,
        onSetOpen: leftOnChange,
        touchHandleWidth: edgeHitWidth,
        touch: !disabled
      }, children);
    }

    if (rightComponent) {
      return /*#__PURE__*/React.createElement(NativeSidebar, {
        open: rightOpen,
        bounceBackOnOverdraw: false,
        sidebar: rightComponent,
        pullRight: true,
        onSetOpen: rightOnChange,
        touchHandleWidth: edgeHitWidth,
        touch: !disabled
      }, children);
    }
  }

  return /*#__PURE__*/React.createElement(Row, null, children);
};

Sidebar.propTypes = {
  location: PropTypes.shape().isRequired,
  leftOpen: PropTypes.bool,
  leftOnChange: PropTypes.func,
  leftComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  rightOpen: PropTypes.bool,
  rightOnChange: PropTypes.func,
  rightComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  edgeHitWidth: PropTypes.number,
  children: PropTypes.node,
  disabled: PropTypes.bool
};
Sidebar.defaultProps = {
  leftOpen: false,
  leftOnChange: noop,
  leftComponent: null,
  rightOpen: false,
  rightOnChange: noop,
  rightComponent: null,
  edgeHitWidth: 120,
  children: null,
  disabled: false
};
export default withTheme('Sidebar')(withRouter(Sidebar));