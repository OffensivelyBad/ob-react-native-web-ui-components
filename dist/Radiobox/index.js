function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { withTheme } from '../Theme';
import BaseCheckbox from '../Checkbox/BaseCheckbox';

const Radiobox = props => /*#__PURE__*/React.createElement(BaseCheckbox, _extends({
  type: "Radiobox",
  iconChecked: "dot-circle-o",
  iconUnchecked: "circle-o",
  iconUncheckedContent: "\\f192"
}, props));

export default withTheme('Radiobox')(Radiobox);