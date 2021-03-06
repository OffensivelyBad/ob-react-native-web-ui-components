function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform } from 'react-native';
import noop from 'lodash/noop';
import StylePropType from '../StylePropType';
import { isSSR } from '../utils';
import { Helmet, style } from '../Helmet';
import { withTheme } from '../Theme';
import Box from '../Box';
import BoxHeader from '../BoxHeader';
import BoxItem from '../BoxItem';
import Image from '../Image';
import Text from '../Text';
import View from '../View';
import ScrollView from '../ScrollView';
import Modal from '../Modal';
const styles = StyleSheet.create({
  empty: {},
  overlay: {
    backgroundColor: 'rgba(100, 100, 100, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    padding: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderWidth: 0,
    width: '100%'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E9ECEF',
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    borderWidth: 0,
    borderBottomWidth: 1,
    height: 53,
    minWidth: '100%'
  },
  boxItem: {
    borderTopWidth: 0
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Popup extends React.Component {
  constructor(props) {
    super(props);
    const {
      onRef
    } = props;
    onRef(this);
    this.mounted = false;
    this.onMountHandlers = [];
    this.className = `popup-${Math.random().toString(36).substr(2, 9)}`;
    this.state = {
      firstRender: true
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.onMount();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onMount(handler) {
    if (handler) {
      this.onMountHandlers.push(handler);
    }

    if (this.mounted) {
      const fn = this.onMountHandlers.shift();

      if (fn) {
        fn();
      }
    }
  }

  renderPopupInner() {
    const {
      width,
      title,
      children,
      header,
      followKeyboard,
      logo,
      logoAlt,
      logoStyle,
      headerStyle
    } = this.props;
    const currentStyle = this.props.style; // eslint-disable-line

    let marginTop = {};

    if (!followKeyboard && Platform.OS !== 'web') {
      marginTop = {
        marginTop: 20
      };
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("style", null, `
              .ReactModal__Overlay.${this.className} {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(100, 100, 100, 0.7);
                ${isSSR() ? 'height: 100vh;' : ''}
              }
              .ReactModal__Content.${this.className} {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 10px;
              }
              [data-class~="Popup__logoContainer"] [data-class~="image-responsive"] {
                margin: 0 auto;
              }
              @media (min-width: 768px)  {
                .ReactModal__Content.${this.className} {
                  width: ${typeof width === 'number' ? `${width}px` : width};
                  padding: 0;
                }
              }
              ${isSSR() ? '#root { overflow: hidden; }' : ''}
            `)), /*#__PURE__*/React.createElement(Box, {
      style: [styles.box, marginTop, currentStyle]
    }, header ? /*#__PURE__*/React.createElement(BoxHeader, {
      style: [styles.header, headerStyle]
    }, title === null ? /*#__PURE__*/React.createElement(View, {
      className: "Popup__logoContainer",
      style: styles.logoContainer
    }, logo ? /*#__PURE__*/React.createElement(Image, {
      alt: logoAlt,
      style: logoStyle,
      source: logo
    }) : null) : /*#__PURE__*/React.createElement(Text, null, title)) : null, /*#__PURE__*/React.createElement(BoxItem, {
      style: styles.boxItem
    }, children)));
  }

  renderPopup() {
    const {
      followKeyboard
    } = this.props;

    if (followKeyboard || Platform.OS !== 'web') {
      return this.renderPopupInner();
    }

    return /*#__PURE__*/React.createElement(ScrollView, null, this.renderPopupInner());
  }

  render() {
    const {
      fixed,
      visible,
      followKeyboard,
      onClose,
      shouldCloseOnEsc,
      className
    } = this.props;
    const {
      firstRender
    } = this.state;

    if (visible && isSSR()) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.overlay,
        className: `ReactModal__Overlay ReactModal__Overlay--after-open popup modal-slide NoAdjustment ${className || ''} ${this.className}`
      }, /*#__PURE__*/React.createElement(View, {
        className: `ReactModal__Content ReactModal__Content--after-open popup modal-slide NoAdjustment ${className || ''} ${this.className}`
      }, this.renderPopup()));
    }

    if (visible && fixed && firstRender && Platform.OS === 'web') {
      const self = this;
      setTimeout(() => self.onMount(() => self.setState({
        firstRender: false
      })));
      return /*#__PURE__*/React.createElement(Modal, {
        fixed: fixed,
        animationType: "slide",
        visible: false,
        className: `NoAdjustment ${className || ''} ${this.className}`,
        followKeyboard: followKeyboard,
        shouldCloseOnEsc: shouldCloseOnEsc,
        onRequestClose: onClose
      }, this.renderPopup());
    }

    return /*#__PURE__*/React.createElement(Modal, {
      fixed: fixed,
      animationType: "slide",
      visible: visible,
      className: `NoAdjustment ${className || ''} ${this.className}`,
      followKeyboard: followKeyboard,
      shouldCloseOnEsc: shouldCloseOnEsc,
      onRequestClose: onClose
    }, this.renderPopup());
  }

}

_defineProperty(Popup, "propTypes", {
  fixed: PropTypes.bool,
  followKeyboard: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool,
  header: PropTypes.bool,
  headerStyle: StylePropType,
  onClose: PropTypes.func,
  onRef: PropTypes.func,
  style: StylePropType,
  shouldCloseOnEsc: PropTypes.bool,
  className: PropTypes.string,
  logo: PropTypes.shape(),
  logoStyle: StylePropType,
  logoAlt: PropTypes.string
});

_defineProperty(Popup, "defaultProps", {
  fixed: true,
  followKeyboard: false,
  width: 400,
  title: null,
  children: null,
  visible: true,
  header: true,
  headerStyle: null,
  onClose: noop,
  onRef: noop,
  style: styles.empty,
  shouldCloseOnEsc: true,
  className: '',
  logo: null,
  logoStyle: null,
  logoAlt: 'Logo'
});

export default withTheme('Popup')(Popup);