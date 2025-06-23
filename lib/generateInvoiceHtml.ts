type InvoiceItem = {
  name: string
  quantity: number
  price: number
}

type IssuerInfo = {
  isCompany: boolean
  name: string
  taxOffice: string
  taxNumber: string
  address: string
  phone?: string
  email?: string
  mersisNo?: string
  kepAddress?: string
  iban?: string
  website?: string
}

type CustomerInfo = {
  name: string
  address: string
  taxOffice?: string
  taxNumber?: string
  phone?: string
  email?: string
}

type InvoiceData = {
  invoiceNo: string
  date: Date
  items: InvoiceItem[]
  discount?: string
  vatRate: number
  issuer: IssuerInfo
  customer: CustomerInfo
}

export function generateInvoiceHtml(invoice: InvoiceData) {
  const { invoiceNo, date, items, discount = "0", vatRate, issuer, customer } = invoice;

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const parsedDiscount = discount.includes("%")
    ? subtotal * (parseFloat(discount.replace("%", "")) / 100)
    : parseFloat(discount);

  const discounted = Math.max(subtotal - (isNaN(parsedDiscount) ? 0 : parsedDiscount), 0);
  const vatAmount = (discounted * vatRate) / 100;
  const totalWithVat = discounted + vatAmount;

  const renderOptional = (label: string, value?: string) =>
    value ? `<p><strong>${label}:</strong> ${value}</p>` : "";

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Arial, sans-serif; font-size: 13px; padding: 2rem; }
          h1, h2 { font-size: 16px; margin-bottom: 0.5rem; }
          h2 { margin-top: 2rem; }
          table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
          th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
          .right { text-align: right; }
          p { margin: 0.2rem 0; }
        </style>
      </head>
      <body>
        <h1>FATURA</h1>
        <p><strong>Fatura No:</strong> ${invoiceNo}</p>
        <p><strong>Tarih:</strong> ${new Date(date).toLocaleString("tr-TR")}</p>
        
        <h2>Fatura Tipi</h2>
        <p>Satış Faturası</p>

        <h2>Fatura Düzenleyici</h2>
        <p><strong>${issuer.name || "Tanımsız"}</strong></p>
        <p>Vergi Dairesi: ${issuer.taxOffice || "-"} - VKN/TCKN: ${issuer.taxNumber || "-"}</p>
        <p>Adres: ${issuer.address || "-"}</p>
        ${renderOptional("Telefon", issuer.phone)}
        ${renderOptional("E-posta", issuer.email)}
        ${issuer.isCompany ? renderOptional("MERSİS", issuer.mersisNo) : ""}
        ${issuer.isCompany ? renderOptional("KEP Adresi", issuer.kepAddress) : ""}
        ${renderOptional("Web Sitesi", issuer.website)}
        ${renderOptional("IBAN", issuer.iban)}

        <h2>Alıcı Bilgileri</h2>
        <p><strong>${customer.name}</strong></p>
        <p>Adres: ${customer.address}</p>
        ${renderOptional("Vergi Dairesi", customer.taxOffice)}
        ${renderOptional("VKN/TCKN", customer.taxNumber)}
        ${renderOptional("Telefon", customer.phone)}
        ${renderOptional("E-posta", customer.email)}

        <h2>Ürün/Hizmet Bilgileri</h2>
        <table>
          <thead>
            <tr>
              <th>Ürün/Hizmet</th>
              <th>Miktar</th>
              <th>Birim Fiyat</th>
              <th>Tutar</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₺${item.price.toFixed(2)}</td>
                <td>₺${(item.quantity * item.price).toFixed(2)}</td>
              </tr>`).join("")}
          </tbody>
        </table>

        <h2>Toplamlar</h2>
        <p>Ara Toplam: ₺${subtotal.toFixed(2)}</p>
        <p>İndirim: -₺${(parsedDiscount || 0).toFixed(2)}</p>
        <p>KDV (%${vatRate}): ₺${vatAmount.toFixed(2)}</p>
        <p><strong>Genel Toplam: ₺${totalWithVat.toFixed(2)}</strong></p>
      </body>
    </html>
  `;
}

