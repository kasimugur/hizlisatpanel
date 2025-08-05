import { NextRequest, NextResponse } from "next/server"
import mockTrendyolInvoices from "@/mock/mockTrendyolInvoices"

let invoices = [...mockTrendyolInvoices]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const invoice = invoices.find(i => String(i.invoiceId) === params.id)
  if (!invoice) {
    return NextResponse.json({ error: "Fatura bulunamadı!" }, { status: 404 })
  }
  return NextResponse.json(invoice)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const index = invoices.findIndex(i => String(i.invoiceId) === params.id)
  if (index === -1) {
    return NextResponse.json({ error: "Fatura bulunamadı!" }, { status: 404 })
  }
  invoices[index] = { ...invoices[index], ...body }
  return NextResponse.json(invoices[index])
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const index = invoices.findIndex(i => String(i.invoiceId) === params.id)
  if (index === -1) {
    return NextResponse.json({ error: "Fatura bulunamadı!" }, { status: 404 })
  }
  const [deleted] = invoices.splice(index, 1)
  return NextResponse.json(deleted)
}
