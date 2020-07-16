function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, Text } from 'react-native';
import styles from './style';
import Icon from '../../Icon';
import ScrollView from '../../ScrollView';
import TouchableOpacity from '../../TouchableOpacity';
import TouchableWithoutFeedback from '../../TouchableWithoutFeedback';
import StylePropType from '../../StylePropType';
/* Code copied from react-native-modal-selector and adapted for our needs */

/* eslint react/forbid-prop-types:0 */

/* eslint react/no-did-update-set-state: 0 */

/* eslint react/forbid-foreign-prop-types: 0 */

/* eslint react/destructuring-assignment: 0 */

let componentIndex = 0;

const blankOr = str => {
  if (str === null || str === undefined) {
    return '';
  }

  return `${str}`;
};

const propTypes = {
  icon: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
  keyExtractor: PropTypes.func,
  labelExtractor: PropTypes.func,
  visible: PropTypes.bool,
  initValue: PropTypes.node,
  animationType: PropTypes.string,
  style: StylePropType,
  selectStyle: StylePropType,
  selectTextStyle: Text.propTypes.style,
  optionStyle: StylePropType,
  optionTextStyle: Text.propTypes.style,
  optionContainerStyle: StylePropType,
  sectionStyle: StylePropType,
  childrenContainerStyle: StylePropType,
  touchableStyle: StylePropType,
  touchableActiveOpacity: PropTypes.number,
  sectionTextStyle: Text.propTypes.style,
  cancelContainerStyle: StylePropType,
  cancelStyle: StylePropType,
  cancelTextStyle: Text.propTypes.style,
  overlayStyle: StylePropType,
  cancelText: PropTypes.string,
  disabled: PropTypes.bool,
  supportedOrientations: PropTypes.arrayOf(PropTypes.string),
  keyboardShouldPersistTaps: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  backdropPressToClose: PropTypes.bool,
  accessible: PropTypes.bool,
  scrollViewAccessibilityLabel: PropTypes.string,
  cancelButtonAccessibilityLabel: PropTypes.string,
  passThruProps: PropTypes.object,
  modalOpenerHitSlop: PropTypes.object,
  children: PropTypes.node
};
const defaultProps = {
  icon: 'align-justify',
  data: [],
  onChange: () => {},
  onModalOpen: () => {},
  onModalClose: () => {},
  keyExtractor: item => item.key,
  labelExtractor: item => blankOr(item.label),
  visible: false,
  initValue: 'Select me!',
  animationType: 'slide',
  style: {},
  selectStyle: {},
  selectTextStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  optionContainerStyle: {},
  sectionStyle: {},
  childrenContainerStyle: {},
  touchableStyle: {},
  touchableActiveOpacity: 0.2,
  sectionTextStyle: {},
  cancelContainerStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'cancel',
  disabled: false,
  supportedOrientations: ['portrait', 'landscape'],
  keyboardShouldPersistTaps: 'always',
  backdropPressToClose: false,
  accessible: false,
  scrollViewAccessibilityLabel: undefined,
  cancelButtonAccessibilityLabel: undefined,
  passThruProps: {},
  modalOpenerHitSlop: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  children: null
};
export default class ModalSelector extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", item => {
      if (this.props.onChange(item) !== false) {
        this.setState({
          selected: this.props.labelExtractor(item),
          modalVisible: false
        });
        this.close(false);
        return;
      }

      this.close();
    });

    _defineProperty(this, "close", (updateState = true) => {
      this.props.onModalClose();

      if (updateState) {
        this.setState({
          modalVisible: false
        });
      }
    });

    _defineProperty(this, "open", () => {
      this.props.onModalOpen();
      this.setState({
        modalVisible: true
      });
    });

    _defineProperty(this, "renderSection", section => /*#__PURE__*/React.createElement(View, {
      key: this.props.keyExtractor(section),
      style: [styles.sectionStyle, this.props.sectionStyle]
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.sectionTextStyle, this.props.sectionTextStyle]
    }, this.props.labelExtractor(section))));

    _defineProperty(this, "renderOption", (option, isLastItem) => /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
      key: this.props.keyExtractor(option),
      onPress: () => this.onChange(option),
      activeOpacity: this.props.touchableActiveOpacity,
      accessible: this.props.accessible,
      accessibilityLabel: option.accessibilityLabel || undefined
    }, this.props.passThruProps), /*#__PURE__*/React.createElement(View, {
      style: [styles.optionStyle, this.props.optionStyle, isLastItem && {
        borderBottomWidth: 0
      }]
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.optionTextStyle, this.props.optionTextStyle]
    }, this.props.labelExtractor(option)))));

    _defineProperty(this, "renderOptionList", () => {
      const options = this.props.data.map((item, index) => {
        if (item.section) {
          return this.renderSection(item);
        }

        return this.renderOption(item, index === this.props.data.length - 1);
      });
      const closeOverlay = this.props.backdropPressToClose;
      componentIndex += 1;
      return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
        key: `modalSelector${componentIndex}`,
        onPress: () => closeOverlay && this.close()
      }, /*#__PURE__*/React.createElement(View, {
        style: [styles.overlayStyle, this.props.overlayStyle]
      }, /*#__PURE__*/React.createElement(View, {
        style: [styles.optionContainer, this.props.optionContainerStyle]
      }, /*#__PURE__*/React.createElement(ScrollView, {
        style: styles.optionScrollView,
        keyboardShouldPersistTaps: this.props.keyboardShouldPersistTaps,
        accessible: this.props.accessible,
        accessibilityLabel: this.props.scrollViewAccessibilityLabel
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          paddingHorizontal: 10
        }
      }, options))), /*#__PURE__*/React.createElement(View, {
        style: [styles.cancelContainer, this.props.cancelContainerStyle]
      }, /*#__PURE__*/React.createElement(TouchableOpacity, {
        onPress: this.close,
        activeOpacity: this.props.touchableActiveOpacity,
        accessible: this.props.accessible,
        accessibilityLabel: this.props.cancelButtonAccessibilityLabel
      }, /*#__PURE__*/React.createElement(View, {
        style: [styles.cancelStyle, this.props.cancelStyle]
      }, /*#__PURE__*/React.createElement(Text, {
        style: [styles.cancelTextStyle, this.props.cancelTextStyle]
      }, this.props.cancelText))))));
    });

    _defineProperty(this, "renderChildren", () => {
      if (this.props.children) {
        return this.props.children;
      }

      return /*#__PURE__*/React.createElement(View, {
        style: [styles.selectStyle, this.props.selectStyle]
      }, /*#__PURE__*/React.createElement(Text, {
        style: [styles.selectTextStyle, this.props.selectTextStyle]
      }, blankOr(this.state.selected), "\xA0"), /*#__PURE__*/React.createElement(Icon, {
        name: this.props.icon,
        style: [styles.selectTextIconStyle, this.props.selectTextStyle]
      }));
    });

    this.state = {
      modalVisible: props.visible,
      selected: props.initValue
    };
  }

  componentDidUpdate(prevProps) {
    const newState = {};
    let doUpdate = false;

    if (prevProps.initValue !== this.props.initValue) {
      newState.selected = this.props.initValue;
      doUpdate = true;
    }

    if (prevProps.visible !== this.props.visible) {
      newState.modalVisible = this.props.visible;
      doUpdate = true;
    }

    if (doUpdate) {
      this.setState(newState);
    }
  }

  render() {
    const dp = /*#__PURE__*/React.createElement(Modal, {
      transparent: true,
      ref: element => {
        this.model = element;
      },
      supportedOrientations: this.props.supportedOrientations,
      visible: this.state.modalVisible,
      onRequestClose: this.close,
      animationType: this.props.animationType
    }, this.renderOptionList());
    return /*#__PURE__*/React.createElement(React.Fragment, null, dp, /*#__PURE__*/React.createElement(TouchableOpacity, {
      hitSlop: this.props.modalOpenerHitSlop,
      activeOpacity: this.props.touchableActiveOpacity,
      style: this.props.style,
      onPress: this.open,
      disabled: this.props.disabled
    }, this.renderChildren()));
  }

}
ModalSelector.propTypes = propTypes;
ModalSelector.defaultProps = defaultProps;