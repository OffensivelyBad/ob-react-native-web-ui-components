function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import View from '../View';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
import DefaultItem from './Item';
import DefaultSpinner from './Spinner';
import DefaultEmptyResult from './EmptyResult';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    zIndex: 1
  },
  noSuggestions: {
    padding: 5,
    height: 30,
    opacity: 0.7
  }
});

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onRef", ref => {
      this.scrollView = ref;
    });

    _defineProperty(this, "onScroll", event => {
      this.y = event.nativeEvent.contentOffset.y;
    });

    this.y = 0;
  }

  render() {
    const {
      style,
      loading,
      items,
      Item,
      itemStyle,
      itemActiveStyle,
      itemProps,
      itemHeight,
      highlightedIndex,
      onSelect,
      getItemValue,
      getItemLabel,
      theme,
      Spinner,
      EmptyResult,
      highlightMatches
    } = this.props;
    const themeInputStyle = theme.input.regular;
    const containerStyle = [styles.container, themeInputStyle.border, themeInputStyle.background, themeInputStyle.opacity, style];
    const {
      maxHeight,
      height
    } = StyleSheet.flatten(containerStyle);
    const fy = itemHeight * highlightedIndex;
    const currentHeight = Math.max(0, Math.min(maxHeight, height));
    const self = this;

    if (self.scrollView) {
      if (fy < this.y) {
        setTimeout(() => self.scrollView && self.scrollView.scrollTo({
          x: 0,
          y: fy
        }));
      } else if (fy + itemHeight > this.y + currentHeight) {
        setTimeout(() => self.scrollView && self.scrollView.scrollTo({
          x: 0,
          y: fy + itemHeight - currentHeight
        }));
      }
    }

    return /*#__PURE__*/React.createElement(View, {
      className: "Autocomplete__Menu",
      style: containerStyle
    }, /*#__PURE__*/React.createElement(ScrollView, {
      style: themeInputStyle.background,
      scrollEventThrottle: 1,
      onScroll: this.onScroll,
      ref: this.onRef
    }, loading ? /*#__PURE__*/React.createElement(Spinner, {
      key: "spinner"
    }) : null, items.map((item, i) => {
      const key = `${i}-${getItemValue(item)}`; // eslint-disable-line

      return /*#__PURE__*/React.createElement(Item, _extends({}, this.props, {
        item: item,
        index: i,
        key: key,
        text: `${getItemLabel(item)}`,
        active: highlightedIndex === i,
        onPress: onSelect,
        style: itemStyle,
        activeStyle: itemActiveStyle,
        highlightMatches: highlightMatches
      }, itemProps));
    }), !items.length && !loading ? /*#__PURE__*/React.createElement(EmptyResult, {
      key: "emptyResult"
    }) : null));
  }

}

_defineProperty(Menu, "propTypes", {
  highlightMatches: PropTypes.bool.isRequired,
  theme: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  getItemValue: PropTypes.func.isRequired,
  getItemLabel: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  Item: PropTypes.elementType,
  style: StylePropType,
  itemStyle: StylePropType,
  itemActiveStyle: StylePropType,
  itemHeight: PropTypes.number,
  itemProps: PropTypes.shape(),
  Spinner: PropTypes.elementType,
  EmptyResult: PropTypes.elementType
});

_defineProperty(Menu, "defaultProps", {
  Item: DefaultItem,
  itemHeight: 30,
  Spinner: DefaultSpinner,
  EmptyResult: DefaultEmptyResult,
  style: null,
  itemStyle: null,
  itemActiveStyle: null,
  itemProps: {}
});

export default withTheme('AutocompleteMenu')(Menu);