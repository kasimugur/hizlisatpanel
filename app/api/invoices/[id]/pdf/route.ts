import { dbConnect } from "@/lib/db"
import { generateInvoiceHtml } from "@/lib/generateInvoiceHtml"
import { generateInvoicePdf } from "@/lib/generateInvoicePdf"
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
  console.log(settings)

  const html = generateInvoiceHtml({
    invoiceNo: invoice.no,
    date: invoice.date,
    items: invoice.items,
    discount: invoice.discount,
    vatRate: settings.vatRate || 20,
    issuer: {
      isCompany: settings.isCompany,
      name: settings.name,
      address: settings.address,
      taxOffice: settings.taxOffice,
      taxNumber: settings.taxNumber,
      phone: settings.phone,
      email: settings.email,
      mersisNo: settings.mersisNumber,
      kepAddress: settings.kepAddress,
      iban: settings.iban,
      website: settings.website,
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
