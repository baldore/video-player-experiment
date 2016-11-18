import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';

import {
  MediaPlayerPage,
  actionsProps,
} from '../index';
import {
  processFile,
} from '../actions';

import messages from '../messages';
import Media from '../Media';

describe('<MediaPlayerPage />', () => {
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

  describe('Media component', () => {
    it('should have a media element', () => {
      const renderedComponent = shallow(
        <MediaPlayerPage />
      );
      const mediaElement = renderedComponent.find('Media');
      expect(mediaElement.length).toBe(1);
    });

    it('should spread the props from the media parent prop', () => {
      const mediaProps = { foo: 'bar', bar: 'baz' };
      const renderedComponent = shallow(
        <MediaPlayerPage media={mediaProps} />
      );
      expect(renderedComponent.contains(<Media foo="bar" bar="baz" />)).toBe(true);
    });
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

    it('should call onRecordingButtonClick prop when the button is clicked', () => {
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
    it('should return a processFile action on input file change', () => {
      const file = { foo: 'bar' };
      const event = {
        target: {
          files: [file],
        },
      };
      expect(actionsProps.onFileInputChange(event)).toEqual(processFile(file));
    });
  });
});
