function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useContext } from 'react';
import { StyleSheet, Platform } from 'react-native';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
const Theme = React.createContext('theme');
const themeProps = ['fontFamily', 'theme', 'themeTextStyle', 'themeInputStyle', 'themePrimaryStyle'];
const defaults = {
  canonical: uri => uri.replace('/amp'),
  resource: uri => uri,
  omit: props => omit(props, themeProps),
  '*': {
    fontFamily: {
      regular: 'system font',
      bold: 'system font'
    }
  },
  Link: {
    basepath: 'localhost'
  },
  Datepicker: {
    selectedDateColor: '#337AB7'
  },
  input: {
    regular: StyleSheet.create({
      background: {
        backgroundColor: '#FFFFFF'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#D3D6D6',
        borderRadius: 2
      },
      text: {
        color: '#545454'
      },
      placeholder: {
        color: '#D3D6D6'
      },
      opacity: {
        opacity: 1
      },
      selected: {
        color: '#0E73CA'
      },
      unselected: {
        color: '#BDC3C7'
      }
    }),
    readonly: StyleSheet.create({
      background: {
        backgroundColor: '#F4F6F6'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#D5DBDB',
        borderRadius: 2
      },
      text: {
        color: '#545454'
      },
      placeholder: {
        color: '#D3D6D6'
      },
      opacity: {
        opacity: 0.7
      },
      selected: {
        color: '#0E73CA'
      },
      unselected: {
        color: '#BDC3C7'
      }
    }),
    disabled: StyleSheet.create({
      background: {
        backgroundColor: '#F4F6F6'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#D5DBDB',
        borderRadius: 2
      },
      text: {
        color: '#545454'
      },
      placeholder: {
        color: '#D3D6D6'
      },
      opacity: {
        opacity: 0.7
      },
      selected: {
        color: '#0E73CA'
      },
      unselected: {
        color: '#BDC3C7'
      }
    }),
    focused: StyleSheet.create({
      background: {
        backgroundColor: '#FFFFFF'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#6CB3FF',
        borderRadius: 2
      },
      text: {
        color: '#545454'
      },
      placeholder: {
        color: '#D3D6D6'
      },
      opacity: {
        opacity: 1
      },
      selected: {
        color: '#0E73CA'
      },
      unselected: {
        color: '#BDC3C7'
      }
    }),
    error: StyleSheet.create({
      background: {
        backgroundColor: '#FFFFFF'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EE2D68',
        borderRadius: 2
      },
      text: {
        color: '#545454'
      },
      placeholder: {
        color: '#EE2D68'
      },
      opacity: {
        opacity: 1
      },
      selected: {
        color: '#0E73CA'
      },
      unselected: {
        color: '#BDC3C7'
      }
    })
  },
  colors: {
    text: 'gray',
    primary: 'navy',
    pink: StyleSheet.create({
      background: {
        backgroundColor: '#F15786'
      },
      border: {
        borderColor: '#BF4E71'
      },
      text: {
        color: '#F15786'
      }
    }),
    yellow: StyleSheet.create({
      background: {
        backgroundColor: '#FEB715'
      },
      border: {
        borderColor: '#D99D14'
      },
      text: {
        color: '#FEB715'
      }
    }),
    gray: StyleSheet.create({
      background: {
        backgroundColor: '#D4D4D4'
      },
      border: {
        borderColor: '#BFBFBF'
      },
      text: {
        color: '#545454'
      }
    }),
    lightGray: StyleSheet.create({
      background: {
        backgroundColor: '#BFBFBF'
      },
      border: {
        borderColor: '#BFBFBF'
      },
      text: {
        color: '#BFBFBF'
      }
    }),
    white: StyleSheet.create({
      background: {
        backgroundColor: '#FFFFFF'
      },
      border: {
        borderColor: '#BFBFBF'
      },
      text: {
        color: '#FFFFFF'
      }
    }),
    navy: StyleSheet.create({
      background: {
        backgroundColor: '#0E73CA'
      },
      border: {
        borderColor: '#055396'
      },
      text: {
        color: '#0E73CA'
      }
    }),
    teal: StyleSheet.create({
      background: {
        backgroundColor: '#23AAAA'
      },
      border: {
        borderColor: '#23AAAA'
      },
      text: {
        color: '#23AAAA'
      }
    }),
    black: StyleSheet.create({
      background: {
        backgroundColor: '#000000'
      },
      border: {
        borderColor: '#000000'
      },
      text: {
        color: '#000000'
      }
    })
  },
  platform: {
    web: {
      '*': {
        fontFamily: {
          regular: '"Lucida Sans Unicode","Lucida Grande",Arial,Helvetica,clean,sans-serif',
          bold: '"Lucida Grande", "Lucida Sans Unicode","Lucida Grande",Arial,Helvetica,clean,sans-serif'
        }
      }
    }
  }
};

const getInputStyle = (theme, {
  disabled,
  readonly,
  hasError,
  autoFocus
}) => {
  let label = 'regular';

  if (hasError) {
    label = 'error';
  } else if (disabled) {
    label = 'disabled';
  } else if (readonly) {
    label = 'readonly';
  } else if (autoFocus) {
    label = 'focused';
  }

  return theme.input[label];
};

export class Provider extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return {
        value: merge({}, defaults, nextProps.value)
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const {
      value
    } = props;
    this.state = {
      value: merge({}, defaults, value)
    };
  }

  render() {
    const {
      value
    } = this.state;
    return /*#__PURE__*/React.createElement(Theme.Provider, _extends({}, this.props, {
      value: value
    }));
  }

}

_defineProperty(Provider, "propTypes", {
  value: PropTypes.shape()
});

_defineProperty(Provider, "defaultProps", {
  value: {}
});

export const {
  Consumer
} = Theme;
export const useTheme = (type, {
  style,
  ...props
}) => {
  const theme = useContext(Theme);
  return { ...(theme['*'] || {}),
    ...(theme.platform[Platform.OS] && theme.platform[Platform.OS]['*'] || {}),
    ...(theme[type] || {}),
    ...(theme.platform[Platform.OS] && theme.platform[Platform.OS][type] || {}),
    ...props,
    style: [theme[type] && theme[type].style, style],
    theme,
    themeTextStyle: theme.colors[theme.colors.text],
    themePrimaryStyle: theme.colors[theme.colors.primary],
    themeInputStyle: getInputStyle(theme, props)
  };
};
export const withTheme = type => Component => ({
  style,
  ...props
}) => {
  // eslint-disable-line
  Component.displayName = type; // eslint-disable-line

  return /*#__PURE__*/React.createElement(Theme.Consumer, null, theme => {
    const currentProps = Object.assign({}, theme['*'] || {}, theme.platform[Platform.OS] && theme.platform[Platform.OS]['*'] || {}, theme[type] || {}, theme.platform[Platform.OS] && theme.platform[Platform.OS][type] || {});
    const {
      Component: Replacement
    } = currentProps;
    const Renderer = Replacement || Component;
    return /*#__PURE__*/React.createElement(Renderer, _extends({}, currentProps, props, {
      style: [theme[type] && theme[type].style, style],
      theme: theme,
      themeTextStyle: theme.colors[theme.colors.text],
      themePrimaryStyle: theme.colors[theme.colors.primary],
      themeInputStyle: getInputStyle(theme, props)
    }));
  });
};
export default {
  withTheme,
  Provider,
  Consumer
};