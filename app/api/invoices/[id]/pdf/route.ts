import { dbConnect } from "@/lib/db"
import { generateInvoiceHtml } from "@/lib/generateInvoiceHtml"
import { generateInvoicePdf } from "@/lib/generateInvoicePdf"
import { generateSequentialId } from "@/lib/generateSequentialId"
import Invoice from "@/models/Invoice"
import Settings from "@/models/Settings"
import { NextRequest, NextResponse } from "next/server"
// import { getSettings } from "@/lib/getSettings"



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()

  const invoice = await Invoice.findById(params.id)
  if (!invoice) {
    return NextResponse.json({ error: "Fatura bulunamadı" }, { status: 404 })
  }
  // const settings = await getSettings()
  const settings = await Settings.findOne()
  if (!settings) {
    return NextResponse.json({ error: "Ayarlar bulunamadı" }, { status: 500 })
  }
  console.log(settings.company.name)
  const invoiceNo = await generateSequentialId("INV");
const html = generateInvoiceHtml({
  invoiceNo,
  date: invoice.date,
  items: invoice.items,
  discount: invoice.discount,
  vatRate: settings.invoice.vatRate || 20, // 💡 Artık settings.invoice altında

  issuer: {
    isCompany: true, // ❗️(manuel belirleniyor, settings yapısında doğrudan yok)
    name: settings.company.name,
    address: settings.company.address,
    taxOffice: settings.company.taxOffice,
    taxNumber: settings.company.taxNumber,
    phone: settings.company.phone,
    email: "", // settings.company.email yok, eğer varsa ekle
    mersisNo: settings.company.mersisNumber,
    kepAddress: settings.company.kepAddress,
    iban: settings.payment.iban, // 💡 IBAN artık payment altında
    website: "", // settings içinde görünmüyor, varsa eklenir
  },

  customer: {
    name: invoice.customer,
    address: invoice.address,
    taxOffice: invoice.customerTaxOffice,
    taxNumber: invoice.customerTaxNumber,
    phone: invoice.customerPhone,
    email: invoice.customerEmail,
  },
})

  const pdfBuffer = await generateInvoicePdf(html)

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="fatura-${invoice.no}.pdf"`,
    },
  })
}
