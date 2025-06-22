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
  <head>
    <style>
      body { font-family: sans-serif; padding: 40px; }
      h1 { text-align: center; margin-bottom: 40px; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f5f5f5; }
      .footer { margin-top: 40px; text-align: right; }
    </style>
  </head>
  <body>
    <h1>FATURA #${escapeHtml(invoice.no)}</h1>
    <p><strong>Müşteri:</strong> ${escapeHtml(invoice.customer)}</p>
    <p><strong>Tarih:</strong> ${new Date(invoice.date).toLocaleDateString("tr-TR")}</p>

    ${invoice.items?.length ? `
      <table>
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Adet</th>
            <th>Fiyat</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr>
              <td>${escapeHtml(item.name)}</td>
              <td>${item.quantity}</td>
              <td>₺${item.price.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <div class="footer">
      <p><strong>Toplam Tutar:</strong> ₺${invoice.total.toFixed(2)}</p>
    </div>
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