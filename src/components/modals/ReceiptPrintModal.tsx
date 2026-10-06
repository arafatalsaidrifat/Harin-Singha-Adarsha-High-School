import React from 'react';
import { Invoice } from '../../types';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { SchoolLogo } from '../common/SchoolLogo';
import { Printer, X, CheckCircle2 } from 'lucide-react';

interface ReceiptPrintModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const ReceiptPrintModal: React.FC<ReceiptPrintModalProps> = ({
  invoice,
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-300">
        
        {/* Modal Controls Bar */}
        <div className="bg-slate-900 text-white p-3 px-5 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {lang === 'bn' ? 'অফিসিয়াল মানি রিসিট (প্রিন্ট ভিউ)' : 'Official Money Receipt (Print Preview)'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রিন্ট / সেভ' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Official Receipt Layout */}
        <div className="p-8 space-y-6 text-slate-900 bg-white">
          
          {/* Header with School Seal */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <SchoolLogo size={68} variant="emerald" />
              <div>
                <h3 className="font-black text-lg text-slate-900 leading-tight">
                  {SCHOOL_INFO.nameBn}
                </h3>
                <h4 className="font-bold text-xs text-emerald-800 uppercase">
                  {SCHOOL_INFO.nameEn}
                </h4>
                <p className="text-[11px] text-slate-600">
                  {SCHOOL_INFO.villageBn}, {SCHOOL_INFO.upazilaBn}, {SCHOOL_INFO.districtBn}
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  EIIN: {SCHOOL_INFO.eiin} • MPO: {SCHOOL_INFO.mpoCode}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                MONEY RECEIPT
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 mt-1">
                {invoice.invoiceNumber}
              </p>
              <p className="text-[10px] text-slate-500">
                Date: {invoice.paidAt || new Date().toISOString().split('T')[0]}
              </p>
            </div>
          </div>

          {/* Student Info Box */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">Student Name:</span>
              <span className="font-bold text-slate-900">{invoice.studentName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Class & Roll:</span>
              <span className="font-bold text-slate-900">Class {invoice.classLevel} (Roll #{invoice.rollNumber})</span>
            </div>
            <div>
              <span className="text-slate-500 block">Payment Channel:</span>
              <span className="font-bold text-pink-700">bKash Merchant Checkout</span>
            </div>
            <div>
              <span className="text-slate-500 block">TrxID:</span>
              <span className="font-mono font-bold text-emerald-800">
                {invoice.transactionId || 'BK2610781290'}
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2.5">SL</th>
                  <th className="p-2.5">Fee Description</th>
                  <th className="p-2.5 text-right">Amount (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-mono">1</td>
                  <td className="p-2.5 font-medium">{invoice.titleBn || invoice.title}</td>
                  <td className="p-2.5 text-right font-mono font-bold">৳ {invoice.amount.toFixed(2)}</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-300">
                <tr>
                  <td colSpan={2} className="p-2.5 text-right uppercase">Total Paid:</td>
                  <td className="p-2.5 text-right font-mono font-black text-emerald-800">
                    ৳ {invoice.amount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Status Watermark & Signatures */}
          <div className="pt-6 flex items-end justify-between text-xs">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" /> PAID & VERIFIED
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                System generated e-receipt • No manual seal required
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 border-b border-slate-400 mb-1"></div>
              <span className="text-[11px] font-bold text-slate-700 block">Headmaster / Cashier</span>
              <span className="text-[9px] text-slate-500 block">HSAHS, Gaibandha</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
