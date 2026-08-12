"use client";

import React from "react";

export interface InvoiceItem {
  desc: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  number: string;
  issued: string;
  due: string;
  status: string;
  clientName: string;
  clientEmail?: string;
  paymentNotice?: string;
  paymentMethod?: string;
  items: InvoiceItem[];
  subtotal: number;
  total: number;
}

export function SusiInvoiceTemplate({ data }: { data: InvoiceData }) {
  const isPaid = data.status?.toLowerCase() === "paid";

  return (
    <div className="susi-invoice-paper">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Open+Sans:wght@400;600;700&display=swap');

        /* Screen Display Container */
        .susi-invoice-paper {
          width: 794px; /* Exact A4 width at 96 DPI */
          height: 1123px; /* Exact A4 height at 96 DPI */
          margin: 0 auto;
          background-color: #ffffff;
          background-image: url('/images/susi-invoice-background.jpg');
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          box-shadow: 0 12px 45px rgba(0,0,0,0.15);
          border-radius: 4px;
          font-family: 'Crimson Pro', Georgia, serif;
          color: #1c313a;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Top Right "Invoice" Title printed on top ocean wave background */
        .inv-top-title-heading {
          position: absolute;
          top: 65px;
          right: 50px;
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 42px;
          font-weight: 700;
          color: #1f78b4;
          letter-spacing: 0.02em;
          z-index: 5;
        }

        /* Top Header Spacer to skip top wave background */
        .inv-top-spacer {
          height: 140px;
          flex-shrink: 0;
        }

        /* Main Content Body bounded above the bottom Namaste & contact wave footer */
        .inv-content-body {
          padding: 0 50px 170px 50px; /* 170px bottom padding protects footer graphic */
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify: space-between;
          box-sizing: border-box;
        }

        /* Bill To & Details Grid */
        .inv-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        .inv-bill-to-label {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #1f78b4;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .inv-client-name {
          font-family: 'Crimson Pro', serif;
          font-size: 24px;
          font-weight: 700;
          color: #1f78b4;
          line-height: 1.2;
        }

        .inv-details-table {
          width: 100%;
          text-align: right;
          font-size: 14px;
        }
        .inv-details-table td {
          padding: 3px 0;
        }
        .inv-details-table .lbl {
          font-family: 'Crimson Pro', serif;
          color: #1f78b4;
          font-weight: 600;
          padding-right: 16px;
        }
        .inv-details-table .val {
          font-family: 'Crimson Pro', serif;
          font-weight: 700;
          color: #1f78b4;
        }

        /* Line Items Table */
        .inv-table-items {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        .inv-table-items th {
          background-color: transparent;
          color: #1f78b4;
          font-family: 'Crimson Pro', serif;
          font-size: 20px;
          font-weight: 700;
          padding: 8px 12px;
          border-bottom: 2px solid #1f78b4;
        }
        .inv-table-items th.th-desc { text-align: left; }
        .inv-table-items th.th-qty { text-align: center; width: 60px; }
        .inv-table-items th.th-rate { text-align: right; width: 110px; }
        .inv-table-items th.th-amt { text-align: right; width: 120px; }

        .inv-table-items td {
          padding: 10px 12px;
          font-size: 15px;
          border-bottom: 1px dashed rgba(31, 120, 180, 0.22);
        }
        .inv-table-items td.td-desc {
          font-family: 'Open Sans', sans-serif;
          font-size: 13.5px;
          color: #2c3e50;
          font-weight: 600;
        }
        .inv-table-items td.td-qty { text-align: center; color: #1f78b4; font-weight: 700; }
        .inv-table-items td.td-rate { text-align: right; color: #1f78b4; }
        .inv-table-items td.td-amt { text-align: right; font-weight: 700; color: #1f78b4; font-size: 16px; }

        /* Totals & Payment Notes Container */
        .inv-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-top: auto;
          padding-top: 10px;
        }
        .inv-payment-notes {
          flex: 1;
          font-family: 'Open Sans', sans-serif;
          font-size: 12px;
          color: #4a6068;
          line-height: 1.5;
          background-color: rgba(31, 120, 180, 0.04);
          border-left: 3px solid #1f78b4;
          padding: 10px 14px;
          border-radius: 0 8px 8px 0;
        }
        .inv-payment-notes strong {
          color: #1f78b4;
          display: block;
          margin-bottom: 3px;
        }

        .inv-totals-box {
          width: 280px;
          text-align: right;
          font-size: 15px;
        }
        .inv-totals-row {
          display: flex;
          justify-content: space-between;
          padding: 3px 0;
          color: #556b73;
        }
        .inv-totals-row.grand-total {
          border-top: 2px solid #1f78b4;
          margin-top: 4px;
          padding-top: 8px;
          font-size: 24px;
          font-weight: 700;
          color: #1f78b4;
        }

        /* ── PERFECT 1-PAGE A4 PRINT CSS ── */
        @media print {
          @page {
            size: A4 portrait;
            margin: 0 !important;
          }

          html, body {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden !important;
          }

          .susi-invoice-paper, .susi-invoice-paper * {
            visibility: visible !important;
          }

          .susi-invoice-paper {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background-size: 100% 100% !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            page-break-before: avoid !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-before: avoid !important;
            break-after: avoid !important;
            break-inside: avoid !important;
          }

          .inv-content-body {
            padding: 0 50px 170px 50px !important;
          }
        }
      `}</style>

      {/* Top Right "Invoice" Heading */}
      <div className="inv-top-title-heading">Invoice</div>

      {/* Top Header Spacer */}
      <div className="inv-top-spacer" />

      {/* Main Content Body */}
      <div className="inv-content-body">
        <div>
          {/* Bill To & Metadata Grid */}
          <div className="inv-meta-grid">
            <div>
              <div className="inv-bill-to-label">BILL TO</div>
              <div className="inv-client-name">{data.clientName || "Valued Client"}</div>
              {data.clientEmail && <div style={{ fontSize: 13, color: "#556b73", marginTop: 3 }}>{data.clientEmail}</div>}
            </div>

            <div>
              <table className="inv-details-table">
                <tbody>
                  <tr>
                    <td className="lbl">Invoice Number:</td>
                    <td className="val">{data.number || "SD-2026-001"}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Issued Date:</td>
                    <td className="val">{data.issued || "05 Jun 2026"}</td>
                  </tr>
                  {!isPaid && (
                    <tr>
                      <td className="lbl">Payment Due Date:</td>
                      <td className="val" style={{ color: "#D68910" }}>{data.due || "19 Jun 2026"}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="lbl">Payment Status:</td>
                    <td className="val" style={{ textTransform: "uppercase", fontWeight: 700, color: isPaid ? "#45A027" : "#D68910" }}>
                      {data.status || "DUE"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Services & Items Table */}
          <table className="inv-table-items">
            <thead>
              <tr>
                <th className="th-desc">Description</th>
                <th className="th-qty">Qty</th>
                <th className="th-rate">Rate</th>
                <th className="th-amt">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items && data.items.length > 0 ? (
                data.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="td-desc">{item.desc}</td>
                    <td className="td-qty">{item.qty}</td>
                    <td className="td-rate">CHF {item.rate.toFixed(2)}</td>
                    <td className="td-amt">CHF {item.amount.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="td-desc">Private 1-on-1 movement &amp; breathwork therapy session</td>
                  <td className="td-qty">1</td>
                  <td className="td-rate">CHF 150.00</td>
                  <td className="td-amt">CHF 150.00</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals & Payment Instructions */}
        <div className="inv-bottom-container">
          <div className="inv-payment-notes">
            <strong>Payment Information &amp; Notice:</strong>
            {data.paymentNotice || "Payment due within 14 days via TWINT or IBAN."}
            {data.paymentMethod && (
              <div style={{ marginTop: 4, fontWeight: 600 }}>
                {data.paymentMethod}
              </div>
            )}
          </div>

          <div className="inv-totals-box">
            <div className="inv-totals-row">
              <span>Subtotal</span>
              <span>CHF {data.subtotal.toFixed(2)}</span>
            </div>
            <div className="inv-totals-row grand-total">
              <span>Total</span>
              <span>CHF {data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
