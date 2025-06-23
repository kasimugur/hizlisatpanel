import puppeteer from "puppeteer"

export async function generateInvoicePdf(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({ headless: "new" })
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: "networkidle0" })

  const pdfOptions = page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
  })
  const pdfBuffer = await page.pdf(pdfOptions);
  await browser.close()
  return pdfBuffer;
}
