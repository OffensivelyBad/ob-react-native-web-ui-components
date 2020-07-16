function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, Animated } from 'react-native';
import noop from 'lodash/noop';
import StylePropType from '../StylePropType';
/* eslint react/destructuring-assignment: 0 */

class Draggable extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "changeDisableStatus", () => {
      this.state.disabled = !this.state.disabled;
    });

    this.state = {
      pan: new Animated.ValueXY(),
      disabled: props.disabled,
      xOffset: 0,
      yOffset: 0
    };
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => !this.state.disabled,
      onMoveShouldSetPanResponderCapture: () => !this.state.disabled,
      onPanResponderGrant: () => {
        if (this.props.scroller) {
          this.props.scroller.setNativeProps({
            scrollEnabled: false
          });
        }

        this.state.pan.setOffset({
          x: this.state.xOffset,
          y: this.state.yOffset
        });
        this.props.onDragStart({
          x: this.state.xOffset,
          y: this.state.yOffset
        });
      },
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }], {
        useNativeDriver: true
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (this.props.scroller) {
          this.props.scroller.setNativeProps({
            scrollEnabled: true
          });
        }

        const xOffset = this.state.xOffset + gestureState.dx; // eslint-disable-line

        const yOffset = this.state.yOffset + gestureState.dy; // eslint-disable-line

        this.setState({
          xOffset,
          yOffset
        });
        this.props.onDragEnd({
          x: xOffset,
          y: yOffset
        });
      }
    });
  }

  componentDidMount() {
    if (typeof this.props.onMove === 'function') {
      this.state.pan.addListener(values => this.props.onMove(values));
    }
  }

  componentWillUnmount() {
    this.state.pan.removeAllListeners();
  }

  render() {
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: [this.props.style, this.state.pan.getLayout()]
    }, this.props.children({
      panHandlers: this.panResponder.panHandlers
    }));
  }

}

_defineProperty(Draggable, "propTypes", {
  children: PropTypes.func.isRequired,
  style: StylePropType,
  scroller: PropTypes.shape(),
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onMove: PropTypes.func,
  disabled: PropTypes.bool
});

_defineProperty(Draggable, "defaultProps", {
  style: null,
  scroller: null,
  onDragStart: noop,
  onDragEnd: noop,
  onMove: null,
  disabled: false
});

export default Draggable;