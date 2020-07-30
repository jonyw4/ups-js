import axios from 'axios';
import UPS from './index';

jest.mock('axios');
// @ts-ignore
axios.request.mockResolvedValue();

const data = {
  ShipmentRequest: {
    Shipment: {
      Description: '1206 PTR',
      Shipper: {
        Name: 'ShipperName',
        AttentionName: 'AttentionName',
        TaxIdentificationNumber: 'TaxID',
        Phone: {
          Number: '1234567890'
        },
        ShipperNumber: 'ShipperNumber',
        Address: {
          AddressLine: 'AddressLine',
          City: 'City',
          StateProvinceCode: 'StateProvince',
          PostalCode: 'PostalCode',
          CountryCode: 'CountryCode'
        }
      },
      ShipTo: {
        Name: 'ShipToName',
        AttentionName: 'AttentionName',
        Phone: {
          Number: '1234567890'
        },
        FaxNumber: '1234567999',
        TaxIdentificationNumber: '456999',
        Address: {
          AddressLine: 'AddressLine',
          City: 'City',
          StateProvinceCode: 'StateProvince',
          PostalCode: 'PostalCode',
          CountryCode: 'CountryCode'
        }
      },
      ShipFrom: {
        Name: 'ShipperName',
        AttentionName: 'AttentionName',
        Phone: {
          Number: '1234567890'
        },
        FaxNumber: '1234567999',
        TaxIdentificationNumber: '456999',
        Address: {
          AddressLine: 'AddressLine',
          City: 'City',
          StateProvinceCode: 'StateProvince',
          PostalCode: 'PsotalCode',
          CountryCode: 'CountryCode'
        }
      },
      PaymentInformation: {
        ShipmentCharge: {
          Type: '01' as const,
          BillShipper: {
            AccountNumber: 'AccountNumber'
          }
        }
      },
      Service: {
        Code: '01' as const,
        Description: 'Expedited'
      },

      Package: [
        {
          Description: 'International Goods',
          Packaging: {
            Code: '02' as const
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: 'LBS' as const
            },
            Weight: '10'
          },
          PackageServiceOptions: ''
        },

        {
          Description: 'International Goods',
          Packaging: {
            Code: '02' as const
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: 'LBS' as const
            },
            Weight: '20'
          },
          PackageServiceOptions: ''
        }
      ],
      ItemizedChargesRequestedIndicator: '',
      RatingMethodRequestedIndicator: '',
      TaxInformationIndicator: '',
      ShipmentRatingOptions: {
        NegotiatedRatesIndicator: ''
      }
    },
    LabelSpecification: {
      LabelImageFormat: {
        Code: 'GIF' as const
      }
    }
  }
};

describe('UPS.createShipment()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call createShipment with package with success', async () => {
    // @ts-ignore
    axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: [{}]
      })
    );

    const ups = new UPS('u', 'p', 'l', true);
    const response = await ups.createShipment(data);
    expect(response).toEqual([{}]);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://wwwcie.ups.com/ship/v1801',
      url: '/shipments',
      method: 'POST',
      data: data,
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
});
