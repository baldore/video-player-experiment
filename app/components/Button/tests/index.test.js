/**
 * Testing our Button component
 */

import Button from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

const children = (<h1>Test</h1>);
const renderComponent = (props = {}) => mount(
  <Button {...props}>
    {children}
  </Button>
);

describe('<Button />', () => {
  it('should render an <a> tag if href is set', () => {
    const renderedComponent = renderComponent({ href: 'http://foo.com' });
    expect(renderedComponent.find('a').length).toEqual(1);
  });

  it('should render a <button> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('button').length).toEqual(1);
  });

  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should handle click events', () => {
    const onClickSpy = expect.createSpy();
    const renderedComponent = renderComponent({ onClick: onClickSpy });
    renderedComponent.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should have a className attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('button').prop('className')).toExist();
  });
});
