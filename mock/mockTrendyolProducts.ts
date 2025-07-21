export const mockTrendyolProducts = [
  {
    barcode: "INTEGRATIONTESTPRODUCT1",
    title: "Integration Test Product 1",
    productMainId: "INTEGRATIONTESTPRODUCT2",
    brandId: 187803,
    categoryId: 91266,
    quantity: 100,
    stockCode: "STK-stokum-100",
    dimensionalWeight: 2,
    description: "Birinci test ürünü açıklaması",
    currencyType: "TRY",
    listPrice: 100,
    salePrice: 99,
    vatRate: 10,
    cargoCompanyId: 10,
    images: [
      { url: "https://mediaqa.store.alshaya.com/urun1.jpg" }
    ],
    attributes: [
      { attributeId: 293, attributeValueId: 2170846, customAttributeValue: null },
      { attributeId: 47, attributeValueId: null, customAttributeValue: "Sarı" }
    ],
    shipmentAddressId: null,
    returningAddressId: null
  },
  {
    barcode: "INTEGRATIONTESTPRODUCT2",
    title: "Integration Test Product 2 (Updated)",
    productMainId: "INTEGRATIONTESTPRODUCT2",
    brandId: 187803,
    categoryId: 91266,
    quantity: 150,
    stockCode: "STK-stokum-101",
    dimensionalWeight: 2,
    description: "İkinci test ürünü (güncellenmiş)",
    currencyType: "TRY",
    listPrice: 120,
    salePrice: 115,
    vatRate: 10,
    cargoCompanyId: 11,
    images: [
      { url: "https://cdn.trendyol.com/urun2.jpg" }
    ],
    attributes: [
      { attributeId: 293, attributeValueId: 2170846, customAttributeValue: null },
      { attributeId: 47, attributeValueId: null, customAttributeValue: "Beyaz" }
    ],
    shipmentAddressId: null,
    returningAddressId: null
  },
  {
    barcode: "KURUYEMIS123",
    title: "Karışık Kuruyemiş 500g",
    productMainId: "KURUYEMIS500",
    brandId: 2222,
    categoryId: 5001,
    quantity: 55,
    stockCode: "KURU500",
    dimensionalWeight: 0.5,
    description: "Enerji deposu karışık kuruyemiş",
    currencyType: "TRY",
    listPrice: 75,
    salePrice: 69,
    vatRate: 8,
    cargoCompanyId: 20,
    images: [
      { url: "https://cdn.trendyol.com/urun3.jpg" }
    ],
    attributes: [
      { attributeId: 500, attributeValueId: 3333, customAttributeValue: null }
    ],
    shipmentAddressId: 5555,
    returningAddressId: 5555
  },
  {
    barcode: "BAL12345",
    title: "Doğal Çiçek Balı 850g",
    productMainId: "BAL850",
    brandId: 3333,
    categoryId: 5010,
    quantity: 20,
    stockCode: "BAL850",
    dimensionalWeight: 0.85,
    description: "Yüksek dağ çiçek balı",
    currencyType: "TRY",
    listPrice: 250,
    salePrice: 199.9,
    vatRate: 8,
    cargoCompanyId: 30,
    images: [
      { url: "https://cdn.trendyol.com/urun4.jpg" }
    ],
    attributes: [
      { attributeId: 400, attributeValueId: 1111, customAttributeValue: null }
    ],
    shipmentAddressId: 6000,
    returningAddressId: 6000
  }
];

export default mockTrendyolProducts;
