function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { PanResponder, View, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withScreen } from '../Screen';
/* eslint no-underscore-dangle: 0 */
// Copied from https://github.com/react-native-community/react-native-side-menu
// The repository seems to be abandoned.

const absoluteStretch = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  menu: { ...absoluteStretch
  },
  frontView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  overlay: { ...absoluteStretch,
    backgroundColor: 'transparent'
  }
});

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onLayoutChange", e => {
      const {
        width,
        height
      } = e.nativeEvent.layout;
      const {
        openOffsetMenuPercentage,
        hiddenMenuOffsetPercentage
      } = this.state;
      const openMenuOffset = width * openOffsetMenuPercentage;
      const hiddenMenuOffset = width * hiddenMenuOffsetPercentage;
      this.setState({
        width,
        height,
        openMenuOffset,
        hiddenMenuOffset
      });
    });

    _defineProperty(this, "onPanResponderMove", (e, gestureState) => {
      const {
        onMove,
        bounceBackOnOverdraw
      } = this.props;
      const {
        left,
        openMenuOffset
      } = this.state;

      if (left.__getValue() * this.menuPositionMultiplier() >= 0) {
        let newLeft = this.prevLeft + gestureState.dx;

        if (!bounceBackOnOverdraw && Math.abs(newLeft) > openMenuOffset) {
          newLeft = this.menuPositionMultiplier() * openMenuOffset;
        }

        onMove(newLeft);
        left.setValue(newLeft);
      }
    });

    _defineProperty(this, "onPanResponderEnd", (e, gestureState) => {
      const {
        left
      } = this.state;
      const offsetLeft = this.menuPositionMultiplier() * (left.__getValue() + gestureState.dx);
      this.openMenu(this.shouldOpenMenu(offsetLeft));
    });

    _defineProperty(this, "onMoveShouldSetPanResponder", (e, gestureState) => {
      const {
        screen,
        toleranceX,
        toleranceY,
        edgeHitWidth,
        menuPosition
      } = this.props;

      if (this.gesturesAreEnabled()) {
        const x = Math.round(Math.abs(gestureState.dx));
        const y = Math.round(Math.abs(gestureState.dy));
        const touchMoved = x > toleranceX && y < toleranceY;

        if (this.isOpen) {
          return touchMoved;
        }

        const withinEdgeHitWidth = menuPosition === 'right' ? gestureState.moveX > screen.width - edgeHitWidth : gestureState.moveX < edgeHitWidth;
        const swipingToOpen = this.menuPositionMultiplier() * gestureState.dx > 0;
        return withinEdgeHitWidth && touchMoved && swipingToOpen;
      }

      return false;
    });

    this.prevLeft = 0;
    this.isOpen = !!props.isOpen;
    const {
      screen: _screen,
      isOpen,
      menuPosition: _menuPosition,
      openMenuOffset: _openMenuOffset,
      hiddenMenuOffset: _hiddenMenuOffset
    } = props;
    const adjustedOpenMenuOffset = _openMenuOffset === null ? _screen.width * (2 / 3) : _openMenuOffset;
    const initialMenuPositionMultiplier = _menuPosition === 'right' ? -1 : 1;

    const _openOffsetMenuPercentage = adjustedOpenMenuOffset / _screen.width;

    const _hiddenMenuOffsetPercentage = _hiddenMenuOffset / _screen.width;

    const _left = new Animated.Value(isOpen ? adjustedOpenMenuOffset * initialMenuPositionMultiplier : _hiddenMenuOffset);

    const self = this;

    _left.addListener(({
      value
    }) => {
      const {
        onSliding
      } = self.props;
      onSliding(Math.abs((value - self.state.hiddenMenuOffset) / (self.state.openMenuOffset - self.state.hiddenMenuOffset)));
    });

    this.state = {
      left: _left,
      openOffsetMenuPercentage: _openOffsetMenuPercentage,
      hiddenMenuOffsetPercentage: _hiddenMenuOffsetPercentage,
      width: _screen.width,
      height: _screen.height,
      openMenuOffset: _screen.width * _openOffsetMenuPercentage,
      hiddenMenuOffset: _screen.width * _hiddenMenuOffsetPercentage
    };
    this.responder = PanResponder.create({
      onStartShouldSetResponderCapture: this.onStartShouldSetResponderCapture,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderEnd
    });
  }

  componentDidUpdate() {
    const {
      isOpen,
      autoClosing
    } = this.props;

    if (typeof isOpen !== 'undefined' && this.isOpen !== isOpen && (autoClosing || this.isOpen === false)) {
      this.openMenu(isOpen);
    }
  }

  getContentView() {
    const {
      children,
      animationStyle
    } = this.props;
    const {
      left,
      width,
      height
    } = this.state;
    let overlay = null;

    if (this.isOpen) {
      overlay = /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
        onPress: () => this.openMenu(false)
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.overlay
      }));
    }

    const ref = sideMenu => {
      this.sideMenu = sideMenu;
    };

    const style = [styles.frontView, {
      width,
      height
    }, animationStyle(left)];
    return /*#__PURE__*/React.createElement(Animated.View, _extends({
      style: style,
      ref: ref
    }, this.responder.panHandlers), children, overlay);
  }

  moveLeft(offset) {
    const {
      onAnimationComplete
    } = this.props;
    const {
      left
    } = this.state;
    const newOffset = this.menuPositionMultiplier() * offset;
    const {
      animationFunction
    } = this.props;
    animationFunction(left, newOffset).start(onAnimationComplete);
    this.prevLeft = newOffset;
  }

  menuPositionMultiplier() {
    const {
      menuPosition
    } = this.props;
    return menuPosition === 'right' ? -1 : 1;
  }

  openMenu(isOpen) {
    const {
      onChange
    } = this.props;
    const {
      hiddenMenuOffset,
      openMenuOffset
    } = this.state;
    this.moveLeft(isOpen ? openMenuOffset : hiddenMenuOffset);
    this.isOpen = isOpen;
    this.forceUpdate();
    onChange(isOpen);
  }

  shouldOpenMenu(dx) {
    const {
      screen
    } = this.props;
    const barrierForward = screen.width / 4;
    return dx > barrierForward;
  }

  gesturesAreEnabled() {
    const {
      disableGestures
    } = this.props;

    if (typeof disableGestures === 'function') {
      return !disableGestures();
    }

    return !disableGestures;
  }

  render() {
    const {
      menu,
      menuPosition
    } = this.props;
    const {
      width,
      openMenuOffset
    } = this.state;
    const boundryStyle = menuPosition === 'right' ? {
      left: width - openMenuOffset
    } : {
      right: width - openMenuOffset
    };
    const menuElement = /*#__PURE__*/React.createElement(View, {
      style: [styles.menu, boundryStyle]
    }, menu);
    return /*#__PURE__*/React.createElement(View, {
      style: styles.container,
      onLayout: this.onLayoutChange
    }, menuElement, this.getContentView());
  }

}

_defineProperty(SideMenu, "propTypes", {
  screen: PropTypes.shape().isRequired,
  edgeHitWidth: PropTypes.number,
  toleranceX: PropTypes.number,
  toleranceY: PropTypes.number,
  menuPosition: PropTypes.oneOf(['left', 'right']),
  onChange: PropTypes.func,
  onSliding: PropTypes.func,
  onMove: PropTypes.func,
  children: PropTypes.node,
  menu: PropTypes.node,
  openMenuOffset: PropTypes.number,
  hiddenMenuOffset: PropTypes.number,
  animationStyle: PropTypes.func,
  disableGestures: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  animationFunction: PropTypes.func,
  onAnimationComplete: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
  isOpen: PropTypes.bool,
  bounceBackOnOverdraw: PropTypes.bool,
  autoClosing: PropTypes.bool
});

_defineProperty(SideMenu, "defaultProps", {
  toleranceY: 10,
  toleranceX: 10,
  edgeHitWidth: 60,
  children: null,
  menu: null,
  openMenuOffset: null,
  disableGestures: false,
  menuPosition: 'left',
  hiddenMenuOffset: 0,
  onMove: () => {},
  onStartShouldSetResponderCapture: () => true,
  onChange: () => {},
  onSliding: () => {},
  animationStyle: value => ({
    transform: [{
      translateX: value
    }]
  }),
  animationFunction: (prop, value) => Animated.spring(prop, {
    toValue: value,
    friction: 8,
    useNativeDriver: true
  }),
  onAnimationComplete: () => {},
  isOpen: false,
  bounceBackOnOverdraw: true,
  autoClosing: true
});

export default withScreen()(SideMenu);