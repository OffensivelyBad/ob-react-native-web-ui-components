import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import WebFontAwesome from 'react-fontawesome';
import StylePropType from '../StylePropType';
import { withTheme } from '../Theme';
import { Helmet, link } from '../Helmet';
const styles = StyleSheet.create({
  empty: {},
  defaults: {}
});

const Icon = ({
  name,
  style,
  className
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("link", {
  rel: "stylesheet",
  type: "text/css",
  href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
})), /*#__PURE__*/React.createElement(Text, {
  style: [styles.defaults, style],
  dataSet: {
    class: className
  },
  "data-class": className
}, /*#__PURE__*/React.createElement(WebFontAwesome, {
  name: name
})));

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  style: StylePropType,
  className: PropTypes.string
};
Icon.defaultProps = {
  style: styles.empty,
  className: ''
};
export default withTheme('Icon')(Icon);