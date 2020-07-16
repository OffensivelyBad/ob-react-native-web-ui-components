function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isArray from 'lodash/isArray';
import { Helmet as ReactHelmet } from 'react-helmet';
import { withRouter } from 'react-router';
/* eslint no-script-url: 0 */

/* eslint no-param-reassign: 0 */

const parseTags = (children, tags) => {
  let script;
  const list = isArray(children) ? children : [children];
  list.forEach(tag => {
    if (tag !== null && tag !== undefined) {
      if (isArray(tag)) {
        parseTags(tag, tags);
      } else if (tag.type === React.Fragment) {
        parseTags(tag.props.children, tags);
      } else {
        switch (tag.type) {
          case 'title':
            tags.title = tag.props.children || '';
            break;

          case 'style':
            tags.style.push(Object.assign({
              cssText: tag.props.children,
              'amp-custom': ''
            }));
            break;

          case 'meta':
            tags.meta.push(pick(tag.props, 'name', 'property', 'content'));
            break;

          case 'link':
            tags.link.push(pick(tag.props, 'rel', 'href', 'type', 'as', 'crossorigin', 'media'));
            break;

          case 'script':
            script = omit(tag.props, 'children');

            if (tag.props.type === 'application/ld+json') {
              script.innerHTML = tag.props.children;
            }

            tags.script.push(script);
            break;

          default:
            break;
        }
      }
    }
  });
};

export const Helmet = withRouter(({
  children,
  history
}) => {
  const tags = {
    title: undefined,
    link: [],
    meta: [],
    style: [],
    script: []
  };

  if (children) {
    parseTags(children, tags);
  }

  if (tags.title === undefined) {
    delete tags.title;
  }

  return /*#__PURE__*/React.createElement(ReactHelmet, _extends({}, tags, {
    key: history.location.pathname
  }));
});
Helmet.propTypes = {
  children: PropTypes.node
};
Helmet.defaultProps = {
  children: null
};
export const link = props => /*#__PURE__*/React.createElement("link", props);
export const meta = props => /*#__PURE__*/React.createElement("meta", props);
export const title = props => /*#__PURE__*/React.createElement("title", props);
export const style = props => /*#__PURE__*/React.createElement("style", _extends({
  "amp-custom": "javascript:undefined"
}, props));
export const script = props => /*#__PURE__*/React.createElement("script", props);
export default {
  Helmet,
  link,
  meta,
  title,
  style,
  script
};