import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';

import { MediaPlayerPage, actionsProps } from '../index';
import messages from '../messages';
import { toggleRecording } from '../actions';

describe('<MediaPlayerPage />', () => {
  it('should have a video element', () => {
    const renderedComponent = shallow(
      <MediaPlayerPage />
    );
    const videoComponent = renderedComponent.find('video');
    expect(videoComponent.length).toBe(1);
    expect(videoComponent.prop('controls')).toBe(true);
  });

  it('should have a button with a initial label', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <MediaPlayerPage />
      </IntlProvider>
    );
    const buttonComponent = renderedComponent.find('button');
    expect(buttonComponent.length).toBe(1);
    expect(buttonComponent.contains(
      <FormattedMessage {...messages.recordButtonStart} />
    )).toBe(true);
  });

  it('should change the button label if it is recording', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <MediaPlayerPage isRecording />
      </IntlProvider>
    );
    const buttonComponent = renderedComponent.find('button');
    expect(buttonComponent.length).toBe(1);
    expect(buttonComponent.contains(
      <FormattedMessage {...messages.recordButtonRecording} />
    )).toBe(true);
  });

  it('should call onRecordingButtonClick prop when he button is clicked', () => {
    const onButtonClickSpy = expect.createSpy();
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <MediaPlayerPage onRecordingButtonClick={onButtonClickSpy} />
      </IntlProvider>
    );
    renderedComponent.find('button').simulate('click');
    expect(onButtonClickSpy).toHaveBeenCalled();
  });

  describe('actionsProps', () => {
    it('should return toggleRecording action when onRecordingButtonClick is called', () => {
      expect(actionsProps.onRecordingButtonClick()).toEqual(toggleRecording());
    });
  });
});
