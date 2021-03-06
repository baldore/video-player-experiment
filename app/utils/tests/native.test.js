import expect from 'expect';

import { getDataFromFile } from '../native';

describe('getVideoSourceFromFile', () => {
  const originalFileReader = FileReader;
  function FileReaderMock() { }

  FileReaderMock.prototype = {
    readAsDataURL(file) {
      return file.error ?
        this.onerror(file.error) :
        this.onload({ target: { result: file.sourceUrl } });
    },
  };

  before(() => {
    window.FileReader = FileReaderMock;
  });

  it('should return a promise', () => {
    expect(getDataFromFile()).toBeA(Promise);
  });

  it('should resolve with the resource url if successful', function* () { // eslint-disable-line
    const sourceUrl = 'video/aaabbbccc';
    const file = { sourceUrl };
    const result = yield getDataFromFile(file);

    expect(result).toEqual({ file, sourceUrl });
  });

  it('should be rejected if the resource cannot be loaded', function* () { // eslint-disable-line
    const error = new Error('Resource not found');
    const file = { error };

    try {
      yield getDataFromFile(file);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  after(() => {
    window.FileReader = originalFileReader;
  });
});
