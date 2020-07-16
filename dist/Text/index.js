import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import first from 'lodash/first';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import NativeText from './NativeText';
import { withTheme } from '../Theme';
import Link from '../Link';
/* eslint no-use-before-define: 0 */

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  }
});
const linebreakRegex = /\\n/g;
const boldRegex = /\*\*([^*]+)\*\*/g;
const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

const concat = (base, extension) => Array.prototype.push.apply(base, extension);

const parse = ({
  type,
  types,
  regex,
  handler,
  components
}) => {
  const result = {
    types: [],
    components: []
  };
  components.forEach((component, i) => {
    if (!isString(component) || !regex.test(component)) {
      result.types.push(types[i]);
      result.components.push(component);
    } else {
      const params = {
        component,
        parts: [],
        lastIndex: 0
      };
      component.replace(regex, (...args) => {
        result.types.push(types[i]);
        result.types.push(type);
        const index = handler(params, args);
        params.lastIndex = index + first(args).length;
      });
      result.types.push(types[i]);
      params.parts.push(component.substring(params.lastIndex));
      concat(result.components, params.parts);
    }
  });
  return result;
};

const parseLink = (options, {
  theme
}) => parse({ ...options,
  type: 'text',
  regex: linkRegex,
  handler: (params, args) => {
    const {
      parts,
      lastIndex,
      component
    } = params;
    const [match, anchor, to, index] = args;
    parts.push(component.substring(lastIndex, index));
    parts.push( /*#__PURE__*/React.createElement(Link, {
      auto: true,
      key: `link:${match}:${index}`,
      type: theme.colors.primary,
      to: to
    }, anchor));
    return index;
  }
});

const parseBold = (options, props) => parse({ ...options,
  type: 'text',
  regex: boldRegex,
  handler: (params, args) => {
    const {
      type
    } = props;
    const {
      parts,
      lastIndex,
      component
    } = params;
    const [match, text, index] = args;
    parts.push(component.substring(lastIndex, index));
    parts.push( /*#__PURE__*/React.createElement(NativeText, {
      auto: true,
      key: `bold:${match}:${index}`,
      type: type,
      style: styles.bold
    }, normalize(text, props)));
    return index;
  }
});

const renderText = (text, props) => {
  let result = {
    types: ['text'],
    components: [text.replace(linebreakRegex, '\n')]
  };
  result = parseBold(result, props);
  result = parseLink(result, props);

  if (result.components.length === 1 && isString(result.components[0])) {
    return result.components[0];
  }

  return result.components;
};

const normalize = (children, props) => {
  if (!children) {
    return children;
  }

  if (isString(children)) {
    return renderText(children, props);
  }

  if (!isArray(children)) {
    return children;
  }

  return children.map(child => {
    if (!isString(child)) {
      return child;
    }

    return renderText(child, props);
  });
};

const Text = ({
  children,
  ...props
}) => /*#__PURE__*/React.createElement(NativeText, props, normalize(children, props));

Text.propTypes = {
  theme: PropTypes.shape().isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number, PropTypes.array])
};
Text.defaultProps = {
  children: null
};
export default withTheme('Text')(Text);