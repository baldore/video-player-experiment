import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import Media from '../Media';

describe('<Media />', () => {
  it('should return null if the type was not defined', () => {
    const renderedComponent = shallow(
      <Media />
    );
    expect(renderedComponent.get(0)).toBe(null);
  });

  it('should create an audio element if the type is audio', () => {
    const renderedComponent = shallow(
      <Media type="audio" />
    );
    expect(renderedComponent.contains(<audio />)).toBe(true);
  });

  it('should create an video element if the type is video', () => {
    const renderedComponent = shallow(
      <Media type="video" />
    );
    expect(renderedComponent.contains(<video />)).toBe(true);
  });
});