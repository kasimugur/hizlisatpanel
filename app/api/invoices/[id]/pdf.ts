import puppeteer from "puppeteer";
import Invoice from "@/models/Invoice";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";

// HTML escape fonksiyonu (XSS önleme)
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const GET = async (req: NextRequest, { params }) => {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const isDownload = searchParams.get("download") === "true";

  try {
    await dbConnect();
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return NextResponse.json({ error: "Fatura bulunamadı" }, { status: 404 });
    }

    const html = `
      <html>
        <head><style>body{font-family:sans-serif}</style></head>
        <body>
          <h1>Fatura #${escapeHtml(invoice.no.toString())}</h1>
          <p>Müşteri: ${escapeHtml(invoice.customer)}</p>
          <p>Tutar: ₺${escapeHtml(invoice.total.toString())}</p>
          <p>Tarih: ${new Date(invoice.date).toLocaleDateString("tr-TR")}</p>
          <ul>
            ${invoice.items
              .map(
                (item) =>
                  `<li>${escapeHtml(item.name)} - ${escapeHtml(
                    item.quantity.toString()
                  )} x ${escapeHtml(item.price.toString())} ₺</li>`
              )
              .join("")}
          </ul>
        </body>
      </html>
    `;

    let browser;
    try {
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });
      const page = await browser.newPage();
      await page.setContent(html);
      const pdfBuffer = await page.pdf({ format: "A4" });
      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `${isDownload ? "attachment" : "inline"}; filename=fatura-${escapeHtml(
            invoice.no.toString()
          )}.pdf`,
        },
      });
    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
      return NextResponse.json({ error: "PDF oluşturulamadı" }, { status: 500 });
    } finally {
      if (browser) await browser.close();
    }
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
};