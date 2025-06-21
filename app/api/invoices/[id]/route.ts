import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Invoice from "@/models/Invoice";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;

    const deleted = await Invoice.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Fatura bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ deletedId: deleted._id.toString() }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/invoices hata:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const update = await req.json();

    const updatedInvoice = await Invoice.findByIdAndUpdate(params.id, update, { new: true });

    if (!updatedInvoice) {
      return NextResponse.json({ error: "Fatura bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(updatedInvoice);
  } catch (err) {
    console.error("PATCH /invoices error:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
