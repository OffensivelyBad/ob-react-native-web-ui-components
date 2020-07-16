import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme } from '../Theme';
import Text from '../Text';
const styles = StyleSheet.create({
  text: {
    padding: 5,
    height: 30,
    opacity: 0.7
  }
});

const EmptyResult = () => /*#__PURE__*/React.createElement(Text, {
  style: styles.text
}, "No suggestions...");

export default withTheme('AutocompleteEmptyResult')(EmptyResult);