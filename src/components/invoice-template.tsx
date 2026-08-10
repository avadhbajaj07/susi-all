"use client";

import React from "react";
import { Phone, Mail, Globe } from "lucide-react";

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
  return (
    <div className="susi-invoice-paper">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Open+Sans:wght@400;600;700&display=swap');

        .susi-invoice-paper {
          width: 100%;
          max-width: 800px;
          min-height: 1080px;
          margin: 0 auto;
          background: #ffffff;
          position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          font-family: 'Crimson Pro', Georgia, serif;
          color: #1c313a;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Top Header Wave SVG Overlay */
        .inv-header-wrapper {
          position: relative;
          height: 160px;
          width: 100%;
        }
        .inv-wave-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 160px;
          z-index: 1;
        }
        .inv-brand-box {
          position: absolute;
          top: 25px;
          left: 35px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 14px;
          color: #ffffff;
        }
        .inv-brand-title {
          font-family: 'Crimson Pro', serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.12em;
          line-height: 1.1;
          text-transform: uppercase;
        }
        .inv-title-text {
          position: absolute;
          top: 85px;
          right: 45px;
          font-family: 'Crimson Pro', serif;
          font-size: 46px;
          font-weight: 700;
          color: #1f78b4;
          z-index: 2;
        }

        /* Translucent Lotus Watermark */
        .inv-watermark-bg {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -40%);
          width: 520px;
          height: 520px;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }

        /* Main Content Container */
        .inv-content-body {
          padding: 10px 50px 30px;
          position: relative;
          z-index: 2;
          flex: 1;
        }

        /* Bill To & Metadata Section */
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
          margin-bottom: 8px;
        }
        .inv-client-name {
          font-family: 'Crimson Pro', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1a252c;
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
          color: #556b73;
          padding-right: 18px;
        }
        .inv-details-table .val {
          font-family: 'Crimson Pro', serif;
          font-weight: 700;
          color: #1a252c;
        }

        /* Payment Box */
        .inv-payment-box {
          background: #eef8fc;
          border-radius: 12px;
          padding: 16px 20px;
          margin: 0 0 35px auto;
          max-width: 340px;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          color: #2c424d;
        }
        .inv-payment-box .pay-lbl {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #1f78b4;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .inv-payment-box .pay-notice {
          font-family: 'Crimson Pro', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1c313a;
          margin-bottom: 4px;
        }
        .inv-payment-box .pay-details {
          font-size: 12px;
          color: #556b73;
        }

        /* Items Table */
        .inv-table-items {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        .inv-table-items th {
          background-color: #1f78b4;
          color: #ffffff;
          font-family: 'Open Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 12px 16px;
        }
        .inv-table-items th.th-desc { text-align: left; }
        .inv-table-items th.th-qty { text-align: center; width: 70px; }
        .inv-table-items th.th-rate { text-align: right; width: 120px; }
        .inv-table-items th.th-amt { text-align: right; width: 130px; }

        .inv-table-items td {
          padding: 14px 16px;
          font-size: 15px;
          border-bottom: 1px solid #eef2f5;
        }
        .inv-table-items td.td-desc {
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          color: #2c3e50;
        }
        .inv-table-items td.td-qty { text-align: center; }
        .inv-table-items td.td-rate { text-align: right; }
        .inv-table-items td.td-amt { text-align: right; font-weight: 700; }

        /* Totals Block */
        .inv-totals-box {
          margin-left: auto;
          width: 320px;
          text-align: right;
          font-size: 16px;
        }
        .inv-totals-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          color: #556b73;
        }
        .inv-totals-row.grand-total {
          border-top: 1px solid #d5e3ec;
          margin-top: 8px;
          padding-top: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #1f78b4;
        }

        /* Footer Section */
        .inv-footer-wrapper {
          position: relative;
          text-align: center;
          padding: 20px 40px 100px;
          z-index: 2;
        }
        .inv-lotus-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 12px;
        }
        .inv-lotus-divider .line {
          width: 80px;
          height: 1px;
          background-color: #bcd4e3;
        }
        .inv-namaste-heading {
          font-family: 'Crimson Pro', serif;
          font-size: 26px;
          color: #1f78b4;
          margin: 0 0 4px;
          font-weight: 400;
        }
        .inv-quote-text {
          font-family: 'Crimson Pro', serif;
          font-style: italic;
          font-size: 16px;
          color: #1f78b4;
          margin-bottom: 12px;
        }
        .inv-signature-text {
          font-family: 'Alex Brush', cursive, cursive;
          font-size: 38px;
          color: #1f78b4;
          margin-bottom: 20px;
        }
        .inv-contact-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          color: #1f78b4;
          font-weight: 600;
        }
        .inv-contact-bar item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .inv-contact-sep {
          color: #aed0e4;
          font-weight: 300;
        }

        .inv-wave-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 75px;
          z-index: 1;
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
          }
        }
      `}</style>

      {/* Top Header Wave & Branding */}
      <div className="inv-header-wrapper">
        <svg className="inv-wave-top" viewBox="0 0 800 160" fill="none" preserveAspectRatio="none">
          <path d="M0 0 H800 V80 C600 160 300 140 0 100 Z" fill="#1f78b4" />
        </svg>

        <div className="inv-brand-box">
          {/* Lotus Icon */}
          <svg width="42" height="42" viewBox="0 0 60 60" fill="none" stroke="#ffffff" strokeWidth="1.8">
            <path d="M30 42 C20 30 10 25 10 18 C10 12 18 10 30 25 C42 10 50 12 50 18 C50 25 40 30 30 42 Z" />
            <path d="M30 42 C15 35 5 28 5 20 C5 14 14 14 30 28 C46 14 55 14 55 20 C55 28 45 35 30 42 Z" />
            <path d="M30 45 C22 38 12 36 2 30 C12 28 22 32 30 45 Z" />
            <path d="M30 45 C38 38 48 36 58 30 C48 28 38 32 30 45 Z" />
            <circle cx="30" cy="46" r="2" fill="#ffffff" />
          </svg>

          <div className="inv-brand-title">
            SUSI<br />DAVIES
          </div>
        </div>

        <div className="inv-title-text">Invoice</div>
      </div>

      {/* Translucent Lotus Watermark in Background */}
      <svg className="inv-watermark-bg" viewBox="0 0 100 100" fill="none" stroke="#1f78b4" strokeWidth="0.8">
        <path d="M50 70 C35 50 20 40 20 28 C20 18 32 15 50 40 C68 15 80 18 80 28 C80 40 65 50 50 70 Z" />
        <path d="M50 70 C25 60 10 48 10 34 C10 24 24 24 50 46 C76 24 90 24 90 34 C90 48 75 60 50 70 Z" />
        <path d="M50 75 C36 64 20 60 4 50 C20 46 36 53 50 75 Z" />
        <path d="M50 75 C64 64 80 60 96 50 C80 46 64 53 50 75 Z" />
      </svg>

      {/* Main Body Content */}
      <div className="inv-content-body">
        {/* Bill To & Metadata */}
        <div className="inv-meta-grid">
          <div>
            <div className="inv-bill-to-label">BILL TO</div>
            <div className="inv-client-name">{data.clientName || "Valued Client"}</div>
            {data.clientEmail && <div style={{ fontSize: 14, color: "#666" }}>{data.clientEmail}</div>}
          </div>

          <div>
            <table className="inv-details-table">
              <tbody>
                <tr>
                  <td className="lbl">Number</td>
                  <td className="val">{data.number || "SD-2026-001"}</td>
                </tr>
                <tr>
                  <td className="lbl">Issued Date</td>
                  <td className="val">{data.issued || "05 Jun 2026"}</td>
                </tr>
                {data.status?.toLowerCase() !== "paid" && (
                  <tr>
                    <td className="lbl">Due Date</td>
                    <td className="val">{data.due || "19 Jun 2026"}</td>
                  </tr>
                )}
                <tr>
                  <td className="lbl">Payment Status</td>
                  <td className="val" style={{ textTransform: "uppercase", fontWeight: 700, color: data.status?.toLowerCase() === "paid" ? "#45A027" : "#D68910" }}>
                    {data.status || "DUE"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Notice Box */}
        <div className="inv-payment-box">
          <div className="pay-lbl">PAYMENT</div>
          <div className="pay-notice">{data.paymentNotice || "You need to pay in next 14 days."}</div>
          <div className="pay-details">{data.paymentMethod || "Bank transfer or TWINT (+41 79 854 97 52)"}</div>
        </div>

        {/* Items Table */}
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
                <td className="td-desc">Private yoga, breathwork and movement therapy session</td>
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

      {/* Footer Section */}
      <div className="inv-footer-wrapper">
        <div className="inv-lotus-divider">
          <div className="line" />
          {/* Mini Lotus SVG */}
          <svg width="24" height="24" viewBox="0 0 50 50" fill="none" stroke="#1f78b4" strokeWidth="1.6">
            <path d="M25 35 C16 25 8 20 8 15 C8 10 15 8 25 20 C35 8 42 10 42 15 C42 20 34 25 25 35 Z" />
            <path d="M25 35 C12 30 4 24 4 17 C4 12 12 12 25 24 C38 12 46 12 46 17 C46 24 38 30 25 35 Z" />
          </svg>
          <div className="line" />
        </div>

        <h3 className="inv-namaste-heading">Namaste</h3>
        <p className="inv-quote-text">
          May you move with grace, breathe with ease, and live with intention.
        </p>

        <div className="inv-signature-text">
          — Susi Davies
        </div>

        <div className="inv-contact-bar">
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Phone size={14} color="#1f78b4" /> +41 79 854 97 52
          </div>
          <span className="inv-contact-sep">|</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Mail size={14} color="#1f78b4" /> hello@susidavies.com
          </div>
          <span className="inv-contact-sep">|</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Globe size={14} color="#1f78b4" /> susidavies.com
          </div>
        </div>

        {/* Bottom Wave Background */}
        <svg className="inv-wave-bottom" viewBox="0 0 800 75" fill="none" preserveAspectRatio="none">
          <path d="M0 40 C250 80 550 10 800 50 V75 H0 Z" fill="#1f78b4" />
        </svg>
      </div>
    </div>
  );
}
