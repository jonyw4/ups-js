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
  it('should fetch a GET request successfully from ME API', async () => {
    // @ts-ignore
    axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: { access_token: 'token123' }
      })
    );

    const me = new UPS(token, true);
    const response = await me.fetch('/token', 'GET', {}, {});

    expect(response).toEqual({ access_token: 'token123' });
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://sandbox.melhorenvio.com.br',
      url: '/token',
      method: 'GET',
      data: {},
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {},
      timeout: 5000
    });
  });

  it('should fetch an UPSOtherError from ME API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(new AxiosTestError({}));
    const me = new UPS(token);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(UPSFetchOtherError);
  });

  it('should fetch an UPSFetchClientError from ME API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(new AxiosTestError({ request: {} }));
    const me = new UPS(token);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(UPSFetchClientError);
  });

  it('should fetch an UPSFetchServerError from ME API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(
      new AxiosTestError({ response: { status: '404' } })
    );
    const me = new UPS(token);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(UPSFetchServerError);
  });
});
