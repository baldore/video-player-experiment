import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import Media from '../Media';

describe('<Media />', () => {
  it('should return null if the type was not defined', () => {
    const renderedComponent = shallow(
      <Media type={undefined} src="foo" />
    );
    expect(renderedComponent.get(0)).toBe(null);
  });

  it('should return null if the src was not defined', () => {
    const renderedComponent = shallow(
      <Media type="audio/mp3" src={undefined} />
    );
    expect(renderedComponent.get(0)).toBe(null);
  });

  it('should create an audio element if the type is audio', () => {
    const renderedComponent = shallow(
      <Media
        type="audio/mp3"
        src="foo"
      />
    );
    const expected = (
      <audio controls>
        <source src="foo" type="audio/mp3" />
      </audio>
    );
    expect(renderedComponent.contains(expected)).toBe(true);
  });

  it('should create an video element if the type is video', () => {
    const renderedComponent = shallow(
      <Media type="video/mpg" src="foo" />
    );
    expect(renderedComponent.contains(<video />)).toBe(true);
  });
});
