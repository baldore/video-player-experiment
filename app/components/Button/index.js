/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { PropTypes, Children } from 'react';

import A from './A';
import StyledButton from './StyledButton';

class Button extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const Element = this.props.href ?
      A :
      StyledButton;

    return (
      <Element {...this.props}>
        {Children.toArray(this.props.children)}
      </Element>
    );
  }
}

Button.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
