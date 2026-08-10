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

        .susi-invoice-paper {
          width: 100%;
          max-width: 800px;
          min-height: 1080px;
          margin: 0 auto;
          background-color: #ffffff;
          background-image: url('/images/susi-invoice-background.jpg');
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.12);
          font-family: 'Crimson Pro', Georgia, serif;
          color: #1c313a;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 180px; /* Protect bottom Namaste signature footer */
        }

        /* Top Right "Invoice" Title printed on top ocean wave background */
        .inv-top-title-heading {
          position: absolute;
          top: 75px;
          right: 55px;
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 46px;
          font-weight: 700;
          color: #1f78b4;
          letter-spacing: 0.02em;
          z-index: 5;
        }

        /* Top Header Spacer */
        .inv-top-spacer {
          height: 155px;
        }

        /* Main Content Body */
        .inv-content-body {
          padding: 0 55px;
          position: relative;
          z-index: 2;
          flex: 1;
        }

        /* Bill To & Details Grid */
        .inv-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        .inv-bill-to-label {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #1f78b4;
          text-transform: uppercase;
          margin-bottom: 6px;
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
          font-size: 15px;
        }
        .inv-details-table td {
          padding: 3px 0;
        }
        .inv-details-table .lbl {
          font-family: 'Crimson Pro', serif;
          color: #1f78b4;
          font-weight: 600;
          padding-right: 18px;
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
          margin-top: 15px;
          margin-bottom: 25px;
        }
        .inv-table-items th {
          background-color: transparent;
          color: #1f78b4;
          font-family: 'Crimson Pro', serif;
          font-size: 22px;
          font-weight: 700;
          padding: 10px 16px;
          border-bottom: 2px solid #1f78b4;
        }
        .inv-table-items th.th-desc { text-align: left; }
        .inv-table-items th.th-qty { text-align: center; width: 70px; }
        .inv-table-items th.th-rate { text-align: right; width: 120px; }
        .inv-table-items th.th-amt { text-align: right; width: 130px; }

        .inv-table-items td {
          padding: 14px 16px;
          font-size: 16px;
          border-bottom: 1px dashed rgba(31, 120, 180, 0.25);
        }
        .inv-table-items td.td-desc {
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          color: #2c3e50;
          font-weight: 600;
        }
        .inv-table-items td.td-qty { text-align: center; color: #1f78b4; font-weight: 700; }
        .inv-table-items td.td-rate { text-align: right; color: #1f78b4; }
        .inv-table-items td.td-amt { text-align: right; font-weight: 700; color: #1f78b4; font-size: 17px; }

        /* Totals Block */
        .inv-totals-box {
          margin-left: auto;
          width: 320px;
          text-align: right;
          font-size: 16px;
          margin-top: 20px;
        }
        .inv-totals-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          color: #556b73;
        }
        .inv-totals-row.grand-total {
          border-top: 2px solid #1f78b4;
          margin-top: 6px;
          padding-top: 10px;
          font-size: 28px;
          font-weight: 700;
          color: #1f78b4;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .susi-invoice-paper, .susi-invoice-paper * {
            visibility: visible;
          }
          .susi-invoice-paper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
            background-size: 100% 100% !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Top Right "Invoice" Heading */}
      <div className="inv-top-title-heading">Invoice</div>

      {/* Top Header Spacer */}
      <div className="inv-top-spacer" />

      {/* Main Content Body */}
      <div className="inv-content-body">
        {/* Bill To & Metadata Grid */}
        <div className="inv-meta-grid">
          <div>
            <div className="inv-bill-to-label">BILL TO</div>
            <div className="inv-client-name">{data.clientName || "Valued Client"}</div>
            {data.clientEmail && <div style={{ fontSize: 14, color: "#556b73", marginTop: 4 }}>{data.clientEmail}</div>}
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

        {/* Totals Block */}
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
  );
}
