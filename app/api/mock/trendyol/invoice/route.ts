// app/api/mock/trendyol/invoices/route.ts
import { NextRequest, NextResponse } from "next/server"
import mockTrendyolInvoices from "@/mock/mockTrendyolInvoices"

let invoices = [...mockTrendyolInvoices]

export async function GET(request: NextRequest) {
  return NextResponse.json(invoices)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newInvoice = { ...body, invoiceId: body.invoiceId || Date.now().toString() }
  invoices.push(newInvoice)
  return NextResponse.json(newInvoice, { status: 201 })
}