import { Object } from 'ts-toolbelt';

type DefaultInfoFormat<C, D> = {
  Code: C;
  Description: D;
};
type DefaultInfoFormatGeneric = DefaultInfoFormat<string, string>;
export namespace Response {
  export interface Server<T> {
    data: T;
  }
  export type ServerError = {
    response: {
      errors: Array<{
        code: string;
        message: string;
      }>;
    };
  };
  interface DefaultChargeInfo {
    CurrencyCode: string;
    MonetaryValue: string;
  }
  export interface CreateShipment {
    ShipmentResponse: {
      Response: {
        ResponseStatus: DefaultInfoFormatGeneric;
        Alert: DefaultInfoFormatGeneric;
        TransactionReference: {
          /** The CustomerContext Information which will be echoed during response.  */
          CustomerContext: string;
        };
      };
      ShipmentResults: {
        /**
         * Disclaimer would be used to provide more information to shipper
         * regarding the processed shipment. This would be used to notify
         * shipper about possible taxes and duties that might have been
         * added or might apply to the shipment.
         *
         * This field would be returned only if TaxInformationIndicator is present in a request. */
        Disclaimer: DefaultInfoFormatGeneric;
        // TODO: Finish type
        ShipmentCharges?: any;
        // TODO: Finish type
        NegotiatedRateCharges?: any;
        // TODO: Finish type
        FRSShipmentData?: any;
        /**
         * RatingMethod is to indicate whether the Shipment was rated as
         * shipment level or package level. This information will be returned
         * only if RatingMethodRequestedIndicator is present in the request.
         *
         * Valid values:
         *
         * 01 = Shipment level
         *
         * 02 = Package level
         */
        RatingMethod?: '01' | '02';
        /**
         * BillableWeightCalculationMethod is to indicate whether the billable weight calculation method utilized was - the package level or shipment level. This information will be returned only if RatingMethodRequestedIndicator is present in the request.
         *
         * Valid values:
         * 01 = Shipment Billable Weight
         *
         * 02 = Package Billable Weight
         */
        BillableWeightCalculationMethod?: '01' | '02';
        // TODO: Finish type
        BillingWeight?: any;
        /** Returned UPS shipment ID number.1Z Number of the first package in the shipment.  */
        ShipmentIdentificationNumber: string;
        MIDualReturnShipmentKey?: string;
        ShipmentDigest?: string;
        // TODO: Finish type
        PackageResults: any;
        // TODO: Finish type
        ControlLogReceipt?: any;
        // TODO: Finish type
        Form?: any;
        // TODO: Finish type
        CODTurnInPage?: any;
        // TODO: Finish type
        HighValueReport?: any;
        /**
         * URL will point to a page wherein label, receipt and other documents, if applicable, such as HighValueReport, CustomsInvoice and ImportControl instructions can be requested. LabelURL is returned only if the LabelLinksIndicator is requested for following shipments: 
         * 
         * - Print/Electronic ImportControl shipment 
         * - Print/Electronic Return shipment. 
         * - Forward shipment except for Mail Innovations Forward. 

         */
        LabelURL?: string;
        LocalLanguageLabelURL?: string;
        DGPaperImage?: string;
        MasterCartonID?: string;
      };
    };
  }
}
export namespace Request {
  interface ShipmentAddress {
    /** 35 characters are accepted, but for the first occurrence, only 30 characters will be printed on the label for return shipments.
     */
    AddressLine: string;
    /** For forward Shipment 30 characters are accepted, but only 15 characters will be printed on the label. */
    City: string;
    /** Shipper's state or province code. For forward Shipment 5 characters are accepted, but only 2 characters will be printed on the label.
     * For US, PR and CA accounts, the account must be either a daily pickup account, an occasional account, or a customer B.I.N account.  */
    StateProvinceCode: string;
    PostalCode: string;
    /** ISO Standard 3166. */
    CountryCode: string;
    /** This field is a flag to indicate if the receiver is a residential location. True if ResidentialAddressIndicator tag exists. This is an empty tag, any value inside is ignored.  */
    ResidentialAddressIndicator?: string;
    /** Location ID is a unique identifier referring to a specific shipping/receiving location. */
    LocationID?: string;
    AlternateDeliveryAddress?: ShippingInfo;
  }
  type UnitOfMeasurement<T> = {
    Code: T;
    Description?: string;
  };
  interface PhoneNumber {
    /**
     * Valid values are 0 - 9. If Shipper country or territory is US, PR, CA, and VI, the layout is: area code, 7 digit PhoneNumber or area code, 7 digit PhoneNumber, 4 digit extension number.
     *
     * For other country or territory, the layout is: CountryCode, area code, 7 digit number. A phone number is required if destination is international.
     */
    Number: string;
    /** Shipper’s phone extension.  */
    Extension?: string;
  }
  interface ShippingInfo {
    /**
     * Shippers Attention Name. For forward Shipment 35 characters are accepted, but only 30 characters will be printed on the label.
     *
     * Required if destination is international. Required if Invoice and CO International forms are requested and the ShipFrom address is not present.
     */
    AttentionName?: string;
    Name: string;
    TaxIdentificationNumber: string;
    Phone?: PhoneNumber;
    Address: ShipmentAddress;
    FaxNumber?: string;
  }
  export interface CreateShipment {
    ShipmentRequest: {
      Shipment: {
        /**
         * The Description of Goods for the shipment. Applies to international and domestic shipments. Provide a detailed description of items being shipped for documents and non-documents.
         *
         * Examples: `"annual reports"` and `"9 mm steel screws"`.
         *
         * **Required if all of the listed conditions are true**:
         *
         * - `ShipFrom` and `ShipTo` countries or territories are not the same;
         * - The packaging type is not UPS Letter;
         * - The ShipFrom and or ShipTo countries or territories are not in the European Union or the ShipFrom and ShipTo countries or territories are both in the European Union and the shipments service type is not UPS Standard.
         */
        Description?: string;
        /**
         * Type of Return service. When this container exists, the shipment is a return shipment.
         * */
        ReturnService?: {
          /**
           * Return Service types:
           *
           * 2 = UPS Print and Mail (PNM)
           *
           * 3 = UPS Return Service 1-Attempt (RS1)
           *
           * 5 = UPS Return Service 3-Attempt (RS3)
           *
           * 8 = UPS Electronic Return Label (ERL)
           *
           * 9 = UPS Print Return Label (PRL)
           *
           * 10 = UPS Exchange Print Return Label
           *
           * 11 = UPS Pack & Collect Service 1-Attempt Box 1
           *
           * 12 = UPS Pack & Collect Service 1-Attempt Box 2
           *
           * 13 = UPS Pack & Collect Service 1-Attempt Box 3
           *
           * 14 = UPS Pack & Collect Service 1-Attempt Box 4
           *
           * 15 = UPS Pack & Collect Service 1-Attempt Box 5
           *
           * 16 = UPS Pack & Collect Service 3-Attempt Box 1
           *
           * 17 = UPS Pack & Collect Service 3-Attempt Box 2
           *
           * 18 = UPS Pack & Collect Service 3-Attempt Box 3
           *
           * 19 = UPS Pack & Collect Service 3-Attempt Box 4
           *
           * 20 = UPS Pack & Collect Service 3-Attempt Box 5
           * */
          Code:
            | '2'
            | '3'
            | '5'
            | '8'
            | '9'
            | '10'
            | '11'
            | '12'
            | '13'
            | '14'
            | '15'
            | '16'
            | '17'
            | '18'
            | '19'
            | '20';
        };

        /**
         * Indicates a shipment contains written, typed, or printed communication of no commercial value. If `DocumentsOnly` is not specified then it implies that the shipment contains non documents or documents of commercial value.
         *
         * Default is a shipment contains non- documents or documents of commercial value. This is an empty tag, any value inside is ignored. Valid only for shipments with different origin and destination country or territory. The origin country or territory is not US
         **/
        DocumentsOnlyIndicator?: string;
        Shipper: Object.Optional<ShippingInfo, 'Name'> & {
          /**
           * The CompanyDisplayableName will be displayed in tracking results and notification messages in place of the name associated with the shipper account. The original shipper account name will be displayed for all Return Services and Import Control Shipments.
           *
           * This is available for Shipper accounts enabled by UPS and applies to Forward Shipments.
           */
          CompanyDisplayableName?: string;
          /**
           * Shipper’s Tax Identification Number.
           *
           * Conditionally required if EEI form (International forms) is requested and ship From is not mentioned.
           */
          TaxIdentificationNumber?: string;
          /**
           * Shipper’s six digit alphanumeric account number. Must be associated with the UserId specified in the AccessRequest. The account must be a valid UPS account number that is active. For US, PR and CA accounts, the account must be either a daily pickup account, an occasional account, or a customer B.I.N account. Drop Shipper accounts are valid for return service shipments only if the account is Trade Direct (TD) enabled. All other accounts must be either a daily pickup account or an occasional account.
           */
          ShipperNumber: string;
          /**
           * Shipper’s email address.
           *
           * **Must be associated with the UserId specified in the AccessRequest.**
           */
          EMailAddress?: string;
        };

        ShipFrom: ShippingInfo & {
          /**
           * The CompanyDisplayableName will be displayed in tracking results and notification messages in place of the name associated with the shipper account. The original shipper account name will be displayed for all Return Services and Import Control Shipments.
           *
           * This is available for Shipper accounts enabled by UPS and applies to Forward Shipments.
           */
          CompanyDisplayableName?: string;
          /**
           * Shipper’s Tax Identification Number.
           *
           * Conditionally required if EEI form (International forms) is requested and ship From is not mentioned.
           */
          TaxIdentificationNumber?: string;
          TaxIDType?: {
            Code: string;
          };
          Phone: PhoneNumber;
          /**
           * Shipper’s six digit alphanumeric account number. Must be associated with the UserId specified in the AccessRequest. The account must be a valid UPS account number that is active. For US, PR and CA accounts, the account must be either a daily pickup account, an occasional account, or a customer B.I.N account. Drop Shipper accounts are valid for return service shipments only if the account is Trade Direct (TD) enabled. All other accounts must be either a daily pickup account or an occasional account.
           */
          ShipperNumber: string;
          /**
           * Shipper’s email address.
           *
           * **Must be associated with the UserId specified in the AccessRequest.**
           */
          EMailAddress?: string;
        };
        ShipTo: ShippingInfo;
        /**
         * Payment information container for detailed shipment charges. The two
         * shipment charges that are available for specification are Transportation
         * charges and Duties and Taxes.
         * It is required for non-Ground Freight Pricing shipments only.
         */
        PaymentInformation?: {
          /**
           * Shipment charge container.
           * If Duty and Tax charges are applicable to a shipment and a payer is not specified, the default payer of Duty and Tax charges is Bill to Receiver
           */
          ShipmentCharge: {
            /**
             * Valid values:
             * 01 = Transportation
             * 02 = Duties and Taxes
             * 03 = Broker of Choice
             *
             * A shipment charge type of 01 = Transportation is required. A shipment charge type of 02 = Duties and Taxes is not required; however, this charge type is invalid for Qualified Domestic Shipments. A Qualified Domestic Shipment is any shipment in which one of the following applies:
             *
             * 1. The origin and destination country or territory is the same.
             * 2. US to PR shipment.
             * 3. PR to US shipment.
             * 4. The origin and destination country or territory are both European Union countries and territories and the GoodsNotInFreeCirculation indicator is not present.
             * 5. The origin and destination IATA code is the same. 03 = Broker of Choice
             */
            Type: '01' | '02' | '03';
            // TODO: Complete typing
            BillShipper?: any;
            BillReceiver?: any;
            BillThirdParty?: any;
          };
          // TODO: Complete typing
          SplitDutyVATIndicator?: any;
        };
        // TODO: Complete typing
        FreightShipmentInformation?: any;
        // TODO: Complete typing
        PromotionalDiscountInformation?: any;
        // TODO: Complete typing
        DGSignatoryInfo?: any;
        // TODO: Complete typing
        ShipmentRatingOptions?: any;
        /** Reference Number information container.  */
        ReferenceNumber?: {
          /**
           * If the indicator is present then the reference number’s value will be bar coded on the label. This is an empty tag, any value inside is ignored. Only one shipmentlevel or package-level reference number can be bar coded per shipment. In order to barcode a reference number, its value must be no longer than 14 alphanumeric characters or 24 numeric characters and cannot contain spaces.
           */
          BarCodeIndicator?: string;
          Code?: string;
          /** Customer supplied reference number.  */
          Value: string;
        };
        Service: {
          /**
           * Valid values:
           *
           * 01 = Next Day Air
           *
           * 02 = 2nd Day Air
           *
           * 03 = Ground
           *
           * 07 = Express
           *
           * 08 = Expedited
           *
           * 11 = UPS Standard
           *
           * 12 = 3 Day Select
           *
           * 13 = Next Day Air Saver
           *
           * 14 = UPS Next Day Air® Early
           *
           * 17 = UPS Worldwide Economy DDU
           *
           * 54 = Express Plus
           *
           * 59 = 2nd Day Air A.M.
           *
           * 65 = UPS Saver
           *
           * M2 = First Class Mail
           *
           * M3 = Priority Mail
           *
           * M4 = Expedited MaiI Innovations
           *
           * M5 = Priority Mail Innovations
           *
           * M6 = Economy Mail Innovations
           *
           * M7 = MaiI Innovations (MI) Returns 70 = UPS Access Point™ Economy
           *
           * 71 = UPS Worldwide Express Freight Midday
           *
           * 72 = UPS Worldwide Economy
           *
           * 74 = UPS Express®12:00
           *
           * 82 = UPS Today Standard
           *
           * 83 = UPS Today Dedicated Courier
           *
           * 84 = UPS Today Intercity
           *
           * 85 = UPS Today Express
           *
           * 86 = UPS Today Express Saver
           *
           * 96 = UPS Worldwide Express Freight.
           *
           * Note: Only service code 03 is used for Ground Freight Pricing shipments
           */
          Code:
            | '01'
            | '02'
            | '03'
            | '07'
            | '08'
            | '11'
            | '12'
            | '13'
            | '14'
            | '17'
            | '54'
            | '59'
            | '65'
            | 'M2'
            | 'M3'
            | 'M4'
            | 'M5'
            | 'M6'
            | 'M7'
            | '70'
            | '71'
            | '72'
            | '74'
            | '82'
            | '83'
            | '84'
            | '85'
            | '86'
            | '96';
          /** Description of the service code. Examples are Next Day Air, Worldwide Express, and Ground. */
          Description?: string;
        };
        // TODO: Finish type
        InvoiceLineTotal: any;
        /**
         * USPS endorsement is a Special handling for UPS SurePost shipments
         * delivered by the USPS.
         * Valid values:
         *
         * 1 = Return Service Requested
         *
         * 2 = Forwarding Service Requested
         *
         * 3 = Address Service Requested
         *
         * 4 = Change Service Requested
         *
         * If user does not select a value, UPS system will pass ""Carrier – Leave if No Response”.
         * Note: For International Mail Innovations shipments use No Service Selected. International Mail Innovations shipments are applicable for Priority Mail Innovations and Mail Innovations Economy Mail Innovations services only. Required for Mail Innovations forward and return shipments.  */
        USPSEndorsement?: '1' | '2' | '3' | '4';
        /** Indicates single label with both MI label and CN22 form. International CN22 form is required.  */
        MILabelCN22Indicator?: string;
        /** Valid values: IR = Irregular MA = Machineable SubClass is only required if the customer’s contract have them subclass the package not UPS.
         */
        SubClassification?: 'IR' | 'MA';
        /**
         * Customer assigned identifier for report and billing summarization displays to the right of the Cost Center title.
         *
         * Required for Mail Innovations Return shipments. It is shown on the bottom of the shipping label as reference 2.
         *
         * Cost Center length is alphanumeric with a max length of 30 for Mail Innovations forward shipments.
         *
         * Cost Center length is numeric with a max length of 4 for Mail Innovations Return shipments.
         */
        CostCenter?: string;
        /** Presence/Absence indicator. Presence of this indicator means that the customer is requesting for the CostCenter field to be barcoded at the bottom of the label.  */
        CostCenterBarcodeIndicator?: string;
        /**
         * Customer-assigned unique piece identifier that returns visibility events.
         *
         * Required only for Mail Innovations forward shipments. Alpha numeric values only. It is shown on the bottom of the shipping label as reference 1.  */
        PackageID?: string;
        PackageIDBarcodeIndicator?: string;
        /**
         * Mail classification defined by the USPS.
         *
         * Valid values:
         *
         * 1 = Balloon
         *
         * 2 = Oversize
         *
         * 3 = Not Applicable
         */
        IrregularIndicator?: '1' | '2' | '3';
        // TODO: Complete type
        ShipmentIndicationType?: any;
        MIDualReturnShipmentKey?: string;
        MIDualReturnShipmentIndicator?: string;
        RatingMethodRequestedIndicator?: string;
        // TODO: Complete type
        ShipmentServiceOptions?: any;
        /**
         * For Return Shipments up to and including 20 packages are allowed. US/PR origin return movements are limited to only one package. For Mail Innovations shipments only one package is allowed.*/
        Package: Array<{
          /** Required for shipment with return service. */
          Description?: string;
          /** Description of articles & special marks. Applicable for Air Freight only */
          PalletDescription?: string;
          /** Number of Pieces. Applicable for Air Freight only */
          NumOfPieces?: string;
          /** Unit price of the commodity. Applicable for Air Freight only
           *
           * Limit to 2 digit after the decimal. The maximum length of the field is 12 including ‘.’ and can hold up to 2 decimal place. (e.g. 999999999.99) */
          UnitPrice?: string;
          Packaging: {
            /**
             * Package types. Values are: 01 = UPS Letter
             *
             * 02 = Customer Supplied Package
             *
             * 03 = Tube 04 = PAK
             *
             * 21 = UPS Express Box
             *
             * 24 = UPS 25KG Box
             *
             * 25 = UPS 10KG Box
             *
             * 30 = Pallet
             *
             * 2a = Small Express Box
             *
             * 2b = Medium Express Box 2c = Large Express Box
             *
             * 56 = Flats
             *
             * 57 = Parcels
             *
             * 58 = BPM
             *
             * 59 = First Class
             *
             * 60 = Priority
             *
             * 61 = Machineables
             *
             * 62 = Irregulars
             *
             * 63 = Parcel Post
             *
             * 64 = BPM Parcel
             *
             * 65 = Media Mail
             *
             * 66 = BPM Flat
             *
             * 67 = Standard Flat.
             *
             * Note: Only packaging type code 02 is applicable to Ground Freight Pricing.
             *
             * Package type 24, or 25 is only allowed for shipment without return service. Packaging type must be valid for all the following: ShipTo country or territory, ShipFrom country or territory, a shipment going from ShipTo country or territory to ShipFrom country or territory, all Accessorials at both the shipment and package level, and the shipment service type. UPS will not accept raw wood pallets and please refer the UPS packaging guidelines for pallets on UPS.com.
             */
            Code:
              | '01'
              | '02'
              | '03'
              | '04'
              | '21'
              | '24'
              | '25'
              | '30'
              | '2a'
              | '2b'
              | '2c'
              | '56'
              | '57'
              | '58'
              | '59'
              | '60'
              | '61'
              | '62'
              | '63'
              | '64'
              | '65'
              | '66'
              | '67';
            /** Description of packaging type. Examples are letter, customer supplied, express box. */
            Description?: string;
          };
          /** Dimensions information container.
           *
           * **`Length + 2*(Width + Height)` must be less than or equal to 165 IN or 330 CM.**
           *
           * *Note: Currently dimensions are not applicable to Ground Freight Pricing.*
           *
           * */
          Dimensions?: {
            UnitOfMeasurement: UnitOfMeasurement<'IN' | 'CM' | '00' | '01'>;
            /** Valid values are 0 to 108 IN and 0 to 274 CM.  */
            Length: string;
            Width: string;
            Height: string;
            /** Dimensional weight of shipment. Please visit ups.com for rules on calculating. There is one implied decimal place (e.g. 115 = 11.5).
             *
             * If dimensions are provided, dimensional weight is ignored. For US/PR/CA shipments, dimensional weight is ignored
             */
          };
          DimWeight?: {
            UnitOfMeasurement: UnitOfMeasurement<'LBS' | 'KGS'>;
            Weight: string;
          };
          PackageWeight?: {
            UnitOfMeasurement: UnitOfMeasurement<'LBS' | 'KGS' | 'OZS'>;
            /** Packages weight. Weight accepted for letters/envelopes.
             * Only average package weight is required for Ground Freight Pricing Shipment.
             */
            Weight: string;
          };
          /** Presence of the indicator mentions that the package is Large Package.
           * This is an empty tag, any value inside is ignored.  */
          LargePackageIndicator?: string;
          // TODO: Type
          ReferenceNumber?: any;
          AdditionalHandlingIndicator?: string;
          // TODO: Type
          PackageServiceOptions?: any;
          // TODO: Type
          Commodity: any;
        }>;
        ItemizedChargesRequestedIndicator: string;
        TaxInformationIndicator: string;
        Locale?: string;
        MasterCartonID?: string;
        MasterCartonIndicator?: string;
      };
      LabelSpecification: {
        LabelImageFormat: {
          /**
           * Label print method code determines the format in which Labels are to be generated. For EPL2 formatted Labels use EPL, for SPL formatted Labels use SPL, for ZPL formatted Labels use ZPL and for image formats use GIF, for Star Printer format formatted Labels use STARPL.
           *
           * For shipments without return service the valid value is GIF, ZPL, EPL and SPL. For shipments with PRL return service, the valid values are EPL, ZPL, SPL, STARPL and GIF. For Mail Innovations forward shipments STARPL is not supported.
           */
          Code: 'EPL' | 'SPL' | 'ZPL' | 'GIF' | 'STARPL';
          /** Description of the label image format code. */
          Description?: string;
        };
        /**
         * Browser HTTPUserAgent String.
         *
         * This is the preferred way of identifying GIF image type to be generated. Required if `{“ShipmentRequest”: {LabelSpecificationLabelSpecification/LabelImageFormat/Code = Gif.`
         *
         * Default to Mozilla/4.5 if this field is missing or has invalid value.
         */
        HTTPUserAgent?: string;
        // TODO: Finish type
        LabelStockSize?: any;
        // TODO: Finish type
        Instruction?: any;
        /**
         * Language character set expected on label.
         * Valid values:
         * - dan = Danish (Latin-1)
         * - nld = Dutch (Latin-1)
         * - fin = Finnish (Latin-1)
         * - fra = French (Latin1)
         * - deu = German (Latin-1)
         * - itl = Italian (Latin-1)
         * - nor = Norwegian (Latin1)
         * - pol = Polish (Latin-2)
         * - por = Portuguese (Latin-1)
         * - spa = Spanish (Latin-1)
         * - swe = Swedish (Latin-1)
         * - ces = Czech (Latin-2)
         * - hun = Hungarian (Latin-2)
         * - slk = Slovak (Latin-2)
         * - rus = Russian (Cyrillic)
         * - tur = Turkish (Latin-5)
         * - ron = Romanian (Latin-2)
         * - bul = Bulgarian (Latin-2)
         * - est = Estonian (Latin-2)
         * - ell = Greek (Latin-2)
         * - lav = Latvian (Latin-2)
         * - lit = Lithuanian (Latin-2)
         * - eng = English (Latin-1)
         *
         * Default is English (Latin-1).
         */
        CharacterSet?:
          | 'dan'
          | 'nld'
          | 'fin'
          | 'fra'
          | 'deu'
          | 'itl'
          | 'nor'
          | 'pol'
          | 'por'
          | 'spa'
          | 'swe'
          | 'ces'
          | 'hun'
          | 'slk'
          | 'rus'
          | 'tur'
          | 'ron'
          | 'bul'
          | 'est'
          | 'ell'
          | 'lav'
          | 'lit'
          | 'eng';
      };
    };
    // TODO: Type
    ReceiptSpecification: any;
  }
}
