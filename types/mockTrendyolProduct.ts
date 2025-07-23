
export interface MockTrendyolProduct {
  barcode: string;
  title: string;
  productMainId: string;
  brandId: number;
  categoryId: number;
  quantity: number;
  stockCode: string;
  dimensionalWeight: number;
  description: string;
  currencyType: string;
  listPrice: number;
  salePrice: number;
  vatRate: number;
  cargoCompanyId: number;
  images: { url: string }[];
  attributes: {
    attributeId: number;
    attributeValueId: number | null;
    customAttributeValue: string | null;
  }[];
  shipmentAddressId: number;
  returningAddressId: number;
}
