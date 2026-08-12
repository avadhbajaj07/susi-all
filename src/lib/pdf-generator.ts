import PDFDocument from "pdfkit";

export interface PdfInvoiceItem {
  desc: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface PdfInvoiceData {
  number: string;
  issued: string;
  due: string;
  status: string;
  clientName: string;
  clientEmail?: string;
  paymentNotice?: string;
  paymentMethod?: string;
  items: PdfInvoiceItem[];
  subtotal: number;
  total: number;
}

export function generateInvoicePdfBuffer(data: PdfInvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
        info: {
          Title: `Invoice ${data.number} — Susi Davies`,
          Author: "Susi Davies",
          Subject: `Invoice ${data.number}`,
        },
      });

      const buffers: Buffer[] = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", (err) => reject(err));

      const isPaid = data.status?.toLowerCase() === "paid";
      const primaryBlue = "#1F78B4";
      const darkInk = "#1C313A";
      const mutedText = "#556B73";
      const lightBg = "#F4F9FC";
      const statusColor = isPaid ? "#2E7D32" : "#D68910";

      // ── TOP HEADER ──
      // Brand Name
      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor(primaryBlue)
        .text("SUSI DAVIES", 40, 45);

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor(mutedText)
        .text("Movement, Breath & Transformation", 40, 72);

      // Top Right "INVOICE" Title & Number
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .fillColor(primaryBlue)
        .text("INVOICE", 380, 45, { align: "right" });

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor(darkInk)
        .text(`#${data.number || "SD-2026-001"}`, 380, 72, { align: "right" });

      // Blue Divider Bar
      doc
        .moveTo(40, 95)
        .lineTo(555, 95)
        .lineWidth(2)
        .strokeColor(primaryBlue)
        .stroke();

      // ── METADATA SECTION ──
      const metaTop = 115;

      // Bill To (Left)
      doc
        .fontSize(9)
        .font("Helvetica-Bold")
        .fillColor(primaryBlue)
        .text("BILL TO", 40, metaTop);

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fillColor(darkInk)
        .text(data.clientName || "Valued Client", 40, metaTop + 14);

      if (data.clientEmail) {
        doc
          .fontSize(10)
          .font("Helvetica")
          .fillColor(mutedText)
          .text(data.clientEmail, 40, metaTop + 32);
      }

      // Invoice Details (Right)
      const rightX = 380;
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor(primaryBlue)
        .text("Issued Date:", rightX, metaTop, { width: 90, align: "right" });
      doc
        .font("Helvetica")
        .fillColor(darkInk)
        .text(data.issued || "-", rightX + 95, metaTop, { align: "right" });

      if (!isPaid) {
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .fillColor(primaryBlue)
          .text("Due Date:", rightX, metaTop + 16, { width: 90, align: "right" });
        doc
          .font("Helvetica-Bold")
          .fillColor("#D68910")
          .text(data.due || "-", rightX + 95, metaTop + 16, { align: "right" });
      }

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor(primaryBlue)
        .text("Status:", rightX, metaTop + 32, { width: 90, align: "right" });
      doc
        .font("Helvetica-Bold")
        .fillColor(statusColor)
        .text((data.status || "DUE").toUpperCase(), rightX + 95, metaTop + 32, { align: "right" });

      // ── ITEMS TABLE ──
      const tableTop = 185;

      // Table Header Background
      doc
        .rect(40, tableTop, 515, 24)
        .fill(primaryBlue);

      // Table Headers
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor("#FFFFFF")
        .text("Description", 50, tableTop + 6)
        .text("Qty", 330, tableTop + 6, { width: 40, align: "center" })
        .text("Rate", 380, tableTop + 6, { width: 80, align: "right" })
        .text("Amount", 470, tableTop + 6, { width: 75, align: "right" });

      let currentY = tableTop + 30;
      const items = data.items && data.items.length > 0 ? data.items : [{ desc: "Private session", qty: 1, rate: data.total || 0, amount: data.total || 0 }];

      items.forEach((item, index) => {
        // Alternating row bg
        if (index % 2 === 1) {
          doc
            .rect(40, currentY - 4, 515, 24)
            .fill(lightBg);
        }

        doc
          .fontSize(10)
          .font("Helvetica")
          .fillColor(darkInk)
          .text(item.desc, 50, currentY, { width: 270 })
          .text(String(item.qty), 330, currentY, { width: 40, align: "center" })
          .text(`CHF ${(item.rate || 0).toFixed(2)}`, 380, currentY, { width: 80, align: "right" })
          .font("Helvetica-Bold")
          .text(`CHF ${(item.amount || (item.qty * item.rate) || 0).toFixed(2)}`, 470, currentY, { width: 75, align: "right" });

        // Row border
        doc
          .moveTo(40, currentY + 18)
          .lineTo(555, currentY + 18)
          .lineWidth(0.5)
          .strokeColor("#E2DDD3")
          .stroke();

        currentY += 26;
      });

      // ── TOTALS BLOCK ──
      currentY += 10;

      // Subtotal
      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor(mutedText)
        .text("Subtotal:", 360, currentY, { width: 100, align: "right" })
        .text(`CHF ${(data.subtotal || data.total || 0).toFixed(2)}`, 470, currentY, { width: 75, align: "right" });

      currentY += 18;

      // Total Line
      doc
        .moveTo(360, currentY)
        .lineTo(555, currentY)
        .lineWidth(1)
        .strokeColor(primaryBlue)
        .stroke();

      currentY += 6;

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fillColor(primaryBlue)
        .text("Total:", 360, currentY, { width: 100, align: "right" })
        .text(`CHF ${(data.total || 0).toFixed(2)}`, 470, currentY, { width: 75, align: "right" });

      currentY += 35;

      // ── PAYMENT INFORMATION BOX ──
      doc
        .rect(40, currentY, 515, 60)
        .fillAndStroke(lightBg, "#BCD4E3");

      doc
        .fontSize(9)
        .font("Helvetica-Bold")
        .fillColor(primaryBlue)
        .text("PAYMENT INFORMATION & NOTICE:", 52, currentY + 10);

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor(darkInk)
        .text(data.paymentNotice || "Payment due within 14 days via TWINT (+41 79 854 97 52) or bank transfer.", 52, currentY + 24, { width: 490 });

      if (data.paymentMethod) {
        doc
          .fontSize(9)
          .font("Helvetica-Bold")
          .fillColor(primaryBlue)
          .text(data.paymentMethod, 52, currentY + 40, { width: 490 });
      }

      // ── FOOTER NAMASTE ──
      const footerY = 740;

      doc
        .moveTo(40, footerY)
        .lineTo(555, footerY)
        .lineWidth(0.5)
        .strokeColor("#E2DDD3")
        .stroke();

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fillColor(primaryBlue)
        .text("Namaste", 40, footerY + 12, { align: "center" });

      doc
        .fontSize(9)
        .font("Helvetica-Oblique")
        .fillColor(mutedText)
        .text("May you move with grace, breathe with ease, and live with intention.", 40, footerY + 30, { align: "center" });

      doc
        .fontSize(8)
        .font("Helvetica")
        .fillColor(mutedText)
        .text("Susi Davies · Thalwil, Switzerland · +41 79 854 97 52 · hello@susidavies.com · susidavies.com", 40, footerY + 48, { align: "center" });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
