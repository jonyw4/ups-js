import axios from 'axios';
import UPS from './index';
import {
  AxiosTestError,
  UPSFetchServerError,
  UPSFetchClientError,
  UPSFetchOtherError
} from '../errors';

jest.mock('axios');
// @ts-ignore
axios.request.mockResolvedValue();

describe('UPS.fetch()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch a GET request successfully from UPS API', async () => {
    // @ts-ignore
    axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: { test: 'test' }
      })
    );

    const ups = new UPS('u', 'p', 'l', true);
    const response = await ups.fetch('/token', 'GET', {}, {});

    expect(response).toEqual({ test: 'test' });
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://wwwcie.ups.com/ship/v1',
      url: '/token',
      method: 'GET',
      data: {},
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*',
        AccessLicenseNumber: 'l',
        'Content-Type': 'application/json',
        Password: 'p',
        Username: 'u',
        transId: '',
        transactionSrc: 'ups-js-client'
      },
      params: {},
      timeout: 10000
    });
  });

  it('should fetch an UPSOtherError from UPS API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(new AxiosTestError({}));
    const me = new UPS('u', 'p', 'l', true);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(UPSFetchOtherError);
  });

  it('should fetch an UPSFetchClientError from UPS API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(new AxiosTestError({ request: {} }));
    const me = new UPS('u', 'p', 'l', true);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(UPSFetchClientError);
  });

  it('should fetch an UPSFetchServerError from UPS API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(
      new AxiosTestError({ response: { status: '404' } })
    );
    const me = new UPS('u', 'p', 'l', true);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(UPSFetchServerError);
  });
});
