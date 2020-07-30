import {
  UPSFetchOtherError,
  UPSFetchClientError,
  UPSFetchServerError
} from '.';

describe('UPSFetchErrors', () => {
  it('should throw Error of type UPSFetchOtherError', () => {
    const t = () => {
      throw new UPSFetchOtherError('Erro', {});
    };
    expect(t).toThrow(UPSFetchOtherError);
  });

  it('should throw Error of type UPSFetchClientError', () => {
    const t = () => {
      throw new UPSFetchClientError('Client error', {}, '400', {});
    };
    expect(t).toThrow(UPSFetchClientError);
  });

  it('should throw Error of type UPSFetchServerError', () => {
    const t = () => {
      throw new UPSFetchServerError(
        'Client error',
        {},
        '400',
        {},
        {
          data: {},
          status: 500,
          statusText: 'Server Error',
          headers: {},
          config: {}
        }
      );
    };
    expect(t).toThrow(UPSFetchServerError);
  });
});
