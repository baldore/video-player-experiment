import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';

import {
  MediaPlayerPage,
  actionsProps,
  getVideoSourceFromFile,
} from '../index';
import messages from '../messages';
import { toggleRecording } from '../actions';

describe('<MediaPlayerPage />', () => {
  describe('getVideoSourceFromFile', () => {
    const originalFileReader = FileReader;
    function FileReaderMock() { }

    FileReaderMock.prototype = {
      readAsDataURL(file) {
        return file.error ?
          this.onerror(file.error) :
          this.onload({ target: { result: file.srcUrl } });
      },
    };

    before(() => {
      window.FileReader = FileReaderMock;
    });

    it('should return a promise', () => {
      expect(getVideoSourceFromFile()).toBeA(Promise);
    });

    it('should resolve with the resource url if successful', function* () { // eslint-disable-line
      const srcUrl = 'video/aaabbbccc';
      const file = { srcUrl };
      const result = yield getVideoSourceFromFile(file);

      expect(result).toBe(srcUrl);
    });

    it('should be rejected if the resource cannot be loaded', function* () { // eslint-disable-line
      const error = new Error('Resource not found');
      const file = { error };

      try {
        yield getVideoSourceFromFile(file);
      } catch (e) {
        expect(e).toEqual(error);
      }
    });

    after(() => {
      window.FileReader = originalFileReader;
    });
  });

  it('should have a form to upload files', () => {
    const renderedComponent = shallow(
      <MediaPlayerPage />
    );

    const form = renderedComponent.find('form');
    expect(form.length).toBe(1);

    const fileInput = form.find('input[type="file"]');
    expect(fileInput.length).toBe(1);
    expect(fileInput.prop('accept')).toBe('audio/*,video/*');
  });

  it('should have a video element', () => {
    const renderedComponent = shallow(
      <MediaPlayerPage />
    );
    const videoComponent = renderedComponent.find('video');
    expect(videoComponent.length).toBe(1);
    expect(videoComponent.prop('controls')).toBe(true);
  });

  describe('recording button', () => {
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
  });

  describe('actionsProps', () => {
    it('should return toggleRecording action when onRecordingButtonClick is called', () => {
      expect(actionsProps.onRecordingButtonClick()).toEqual(toggleRecording());
    });
  });
});
