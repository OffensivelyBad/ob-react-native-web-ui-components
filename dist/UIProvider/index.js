import React from 'react';
import PropTypes from 'prop-types';
import { Provider as AmpProvider } from '../Amp';
import { Provider as ThemeProvider } from '../Theme';
import { ScreenContext, KeyboardContext, calculateScreen, calculateKeyboard } from '../Screen';
import { Helmet, style } from '../Helmet';
import baseCss from './style';

const UIProvider = ({
  amp,
  theme,
  children,
  keyboard,
  screen
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("style", null, baseCss)), /*#__PURE__*/React.createElement(AmpProvider, {
  value: amp
}, /*#__PURE__*/React.createElement(ThemeProvider, {
  value: theme
}, /*#__PURE__*/React.createElement(KeyboardContext.Provider, {
  value: keyboard
}, /*#__PURE__*/React.createElement(ScreenContext.Provider, {
  value: screen
}, children)))));

UIProvider.propTypes = {
  keyboard: PropTypes.number.isRequired,
  screen: PropTypes.shape().isRequired,
  amp: PropTypes.bool,
  theme: PropTypes.shape(),
  children: PropTypes.node
};
UIProvider.defaultProps = {
  amp: false,
  theme: {},
  children: null
};
export default calculateKeyboard()(calculateScreen()(UIProvider));