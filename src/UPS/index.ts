import axios, { Method, AxiosRequestConfig, AxiosError } from 'axios';
import {
  UPSFetchOtherError,
  UPSFetchClientError,
  UPSFetchServerError
} from '../errors';
import { Response, Request } from '../types';

const DEFAULT_VERSION = '1';
const ENDPOINT_TEST = (v: string) => `https://wwwcie.ups.com/ship/${v}`;
const ENDPOINT_PRODUCTION = (v: string) =>
  `https://onlinetools.ups.com/ship/${v}`;

class UPS {
  private isSandbox: boolean;
  private timeout: number;
  private username: string;
  private password: string;
  private licenseNumber: string;

  constructor(
    username: string,
    password: string,
    licenseNumber: string,
    isSandbox: boolean,
    timeout = 10000
  ) {
    this.isSandbox = isSandbox;
    this.timeout = timeout;
    this.username = username;
    this.password = password;
    this.licenseNumber = licenseNumber;
  }

  public async fetch<T = any>(
    url: string,
    method: Method = 'POST',
    params: AxiosRequestConfig['params'] = {},
    data: AxiosRequestConfig['data'] = {},
    version = 'v1'
  ) {
    return axios
      .request<any, Response.Server<T>>({
        baseURL: this.isSandbox
          ? ENDPOINT_TEST(version)
          : ENDPOINT_PRODUCTION(version),
        method,
        url,
        timeout: this.timeout,
        headers: {
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          transId: '',
          transactionSrc: 'ups-js-client',
          Accept: 'application/json',
          AccessLicenseNumber: this.licenseNumber,
          Username: this.username,
          Password: this.password
        },
        params,
        data
      })
      .then((response) => response.data)
      .catch((error: AxiosError<Response.ServerError>) => {
        if (error.response) {
          throw new UPSFetchServerError(
            error.message,
            error.config,
            error.code,
            error.request,
            error.response
          );
        } else if (error.request) {
          throw new UPSFetchClientError(
            error.message,
            error.config,
            error.code,
            error.request
          );
        } else {
          throw new UPSFetchOtherError(error.message, error.config);
        }
      });
  }
  /**
   * @param data Shipment info
   * @param addressValidation Validation will include a city
   */
  public async createShipment(
    data: Request.CreateShipment,
    addressValidation = false
  ) {
    return this.fetch<Response.CreateShipment>(
      '/shipments',
      'POST',
      data,
      addressValidation ? { additionaladdressvalidation: 'city' } : {},
      'v1801'
    );
  }
}

export default UPS;
