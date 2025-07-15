import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Invoice from "@/models/Invoice";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }
    const { id } = params;

    const deleted = await Invoice.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return NextResponse.json({ error: "Fatura bulunamadı.veya yetkiniz yok" }, { status: 404 });
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
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }
    const update = await req.json();

    const updatedInvoice = await Invoice.findOneAndUpdate({ _id: params.id, user: userId }, update, { new: true });

    if (!updatedInvoice) {
      return NextResponse.json({ error: "Fatura bulunamadı veya yetkiniz yok." }, { status: 404 });
    }

    return NextResponse.json(updatedInvoice);
  } catch (err) {
    console.error("PATCH /invoices error:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
