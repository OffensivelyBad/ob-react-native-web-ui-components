import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { StyleSheet } from 'react-native';
import StylePropType from '../StylePropType';
import { Helmet, style } from '../Helmet';
import Icon from '../Icon';
import Text from '../Text';
import View from '../View';
import TouchableWithoutFeedback from '../TouchableWithoutFeedback';
const styles = StyleSheet.create({
  empty: {},
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 23,
    lineHeight: 23
  },
  iconContainer: {
    minWidth: 23,
    flexShrink: 1
  },
  text: {
    fontSize: 13,
    lineHeight: 23,
    textAlignVertical: 'center'
  },
  textContainer: {
    flexShrink: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 10
  }
});

const BaseCheckbox = ({
  onBlur,
  onFocus,
  text,
  type,
  themeTextStyle,
  themeInputStyle,
  disabled,
  readonly,
  onPress,
  value,
  checked,
  iconChecked,
  iconUnchecked,
  styleChecked,
  styleUnchecked,
  styleCheckedText,
  styleUncheckedText,
  iconUncheckedContent,
  ...props
}) => {
  const press = () => {
    if (!disabled && !readonly) {
      onPress(checked, value);
    }
  };

  const className = `${type} ${!checked ? `${type}__unchecked` : ''}`;
  const viewStyle = [styles.container, themeInputStyle.opacity, props.style]; // eslint-disable-line

  const iconName = checked ? iconChecked : iconUnchecked;
  const iconStyle = [styles.icon, checked ? [themeInputStyle.selected, styleChecked] : [themeInputStyle.unselected, styleUnchecked]];
  const textStyle = [styles.text, checked ? [themeInputStyle.selected, styleCheckedText] : [themeTextStyle.text, styleUncheckedText]];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("style", null, `
            [data-class~="${type}"] {
              cursor: pointer;
            }
            ${!disabled && !readonly ? `
              [data-class~="${type}__unchecked"]:hover .fa:before {
                content: "${iconUncheckedContent}";
              }
            ` : ''}
          `)), /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    className: className,
    onPress: press,
    onFocus: onFocus,
    onBlur: onBlur
  }, /*#__PURE__*/React.createElement(View, {
    style: viewStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    name: iconName,
    style: iconStyle
  })), text !== null ? /*#__PURE__*/React.createElement(View, {
    style: styles.textContainer
  }, /*#__PURE__*/React.createElement(Text, {
    auto: true,
    style: textStyle
  }, text)) : null)));
};

BaseCheckbox.propTypes = {
  themeTextStyle: PropTypes.shape().isRequired,
  themeInputStyle: PropTypes.shape().isRequired,
  text: PropTypes.string,
  value: PropTypes.any,
  // eslint-disable-line
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  onPress: PropTypes.func,
  style: StylePropType,
  styleChecked: StylePropType,
  styleUnchecked: StylePropType,
  styleCheckedText: StylePropType,
  styleUncheckedText: StylePropType,
  iconChecked: PropTypes.string,
  iconUnchecked: PropTypes.string,
  iconUncheckedContent: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};
BaseCheckbox.defaultProps = {
  text: null,
  value: true,
  checked: false,
  disabled: false,
  readonly: false,
  onPress: noop,
  style: styles.empty,
  styleChecked: styles.empty,
  styleUnchecked: styles.empty,
  styleCheckedText: styles.empty,
  styleUncheckedText: styles.empty,
  iconChecked: 'check-square',
  iconUnchecked: 'square',
  iconUncheckedContent: '\\f14a',
  type: 'Checkbox',
  onBlur: noop,
  onFocus: noop
};
export default BaseCheckbox;