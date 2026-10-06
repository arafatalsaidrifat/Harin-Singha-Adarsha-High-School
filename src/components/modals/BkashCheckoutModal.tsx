import React, { useState } from 'react';
import { Invoice } from '../../types';
import { bkashService } from '../../lib/bkash-service';
import { appStorage } from '../../lib/storage';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight,
  Clock,
  Printer
} from 'lucide-react';

interface BkashCheckoutModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (updatedInvoice: Invoice) => void;
  lang: 'bn' | 'en';
}

export const BkashCheckoutModal: React.FC<BkashCheckoutModalProps> = ({
  invoice,
  isOpen,
  onClose,
  onPaymentSuccess,
  lang,
}) => {
  const [step, setStep] = useState<'WALLET_INPUT' | 'OTP_INPUT' | 'PIN_INPUT' | 'PROCESSING' | 'SUCCESS'>('WALLET_INPUT');
  const [walletPhone, setWalletPhone] = useState('01719450123');
  const [otp, setOtp] = useState('123456');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [completedTrxId, setCompletedTrxId] = useState('');

  if (!isOpen) return null;

  const handleWalletSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletPhone.trim() || walletPhone.length < 11) {
      setErrorMsg(lang === 'bn' ? 'সঠিক ১১ সংখ্যার বিকাশ অ্যাকাউন্ট নম্বর দিন' : 'Enter valid 11 digit bKash number');
      return;
    }
    setErrorMsg('');
    setStep('OTP_INPUT');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setErrorMsg(lang === 'bn' ? 'ওটিপি ভেরিফিকেশন কোড দিন' : 'Enter 6 digit OTP');
      return;
    }
    setErrorMsg('');
    setStep('PIN_INPUT');
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim() || pin.length < 4) {
      setErrorMsg(lang === 'bn' ? 'সঠিক ৫ সংখ্যার পিন নম্বর দিন' : 'Enter valid bKash PIN');
      return;
    }

    setErrorMsg('');
    setStep('PROCESSING');

    try {
      // 1. Create Payment session
      const createRes = await bkashService.createPayment({
        amount: invoice.amount,
        merchantInvoiceNumber: invoice.invoiceNumber,
        studentName: invoice.studentName,
      });

      // 2. Execute Payment
      const execRes = await bkashService.executePayment(
        createRes.paymentID,
        walletPhone,
        invoice.invoiceNumber,
        invoice.amount
      );

      // 3. Update Invoice in Storage
      const updatedInvoice: Invoice = {
        ...invoice,
        status: 'PAID',
        paymentMethod: 'bKash',
        paymentId: execRes.paymentID,
        transactionId: execRes.trxID,
        paidAt: new Date().toLocaleString('en-US', { hour12: true }),
        senderPhone: walletPhone,
      };

      const allInvoices = appStorage.getInvoices();
      const newInvoices = allInvoices.map((inv) => (inv.id === invoice.id ? updatedInvoice : inv));
      appStorage.saveInvoices(newInvoices);

      setCompletedTrxId(execRes.trxID);
      setStep('SUCCESS');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      onPaymentSuccess(updatedInvoice);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment processing failed');
      setStep('PIN_INPUT');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* bKash Header Branding */}
        <div className="bg-[#D12053] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
              <span className="text-[#D12053] font-black text-sm tracking-tighter">bKash</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-pink-200 font-bold block">
                Tokenized Merchant Checkout
              </span>
              <h3 className="font-extrabold text-sm text-white">
                হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-pink-200 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Summary Banner */}
        <div className="bg-pink-50/60 p-4 border-b border-pink-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block">{invoice.titleBn || invoice.title}</span>
            <span className="font-mono text-slate-700 font-bold">Invoice: {invoice.invoiceNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block">Amount to Pay</span>
            <span className="text-xl font-black text-[#D12053] font-mono">
              ৳ {invoice.amount}
            </span>
          </div>
        </div>

        {/* Modal Body Based on Step */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'WALLET_INPUT' && (
            <form onSubmit={handleWalletSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  {lang === 'bn' ? 'আপনার বিকাশ একাউন্ট নম্বর দিন' : 'Enter Your bKash Account Number'}
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={walletPhone}
                    onChange={(e) => setWalletPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-[#D12053]"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  {lang === 'bn'
                    ? 'আপনার বিকাশ নম্বরে একটি ৬ ডিজিটের ভেরিফিকেশন কোড পাঠানো হবে।'
                    : 'A 6-digit verification OTP code will be generated for this mobile number.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#D12053] hover:bg-[#b01742] text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-pink-900/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'bn' ? 'পরবর্তী ধাপে যান (Confirm)' : 'Proceed (Confirm)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'OTP_INPUT' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    {lang === 'bn' ? 'বিকাশ ভেরিফিকেশন কোড (OTP)' : 'bKash Verification Code (OTP)'}
                  </label>
                  <span className="text-[10px] text-[#D12053] font-mono font-bold">Resend (0:45)</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-2 px-3 text-center tracking-widest text-lg font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#D12053]"
                />
                <p className="text-[11px] text-slate-500 text-center">
                  Sent to <span className="font-mono font-bold text-slate-700">{walletPhone}</span>
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('WALLET_INPUT')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  {lang === 'bn' ? 'পেছনে' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#D12053] hover:bg-[#b01742] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  {lang === 'bn' ? 'যাচাই করুন (Confirm OTP)' : 'Confirm OTP'}
                </button>
              </div>
            </form>
          )}

          {step === 'PIN_INPUT' && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  {lang === 'bn' ? 'আপনার বিকাশ পিন নম্বর দিন' : 'Enter bKash PIN'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    maxLength={5}
                    placeholder="•••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-lg font-mono tracking-widest focus:outline-none focus:border-[#D12053]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bn'
                    ? 'আপনার পিন সম্পূর্ণ এনক্রিপ্টেড ও সুরক্ষিত।'
                    : '128-bit bank grade encryption. PIN is never stored.'}
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('OTP_INPUT')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  {lang === 'bn' ? 'পেছনে' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#D12053] hover:bg-[#b01742] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  {lang === 'bn' ? 'পেমেন্ট সম্পন্ন করুন (Pay Now)' : `Pay BDT ${invoice.amount}`}
                </button>
              </div>
            </form>
          )}

          {step === 'PROCESSING' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 border-4 border-[#D12053] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h4 className="font-bold text-sm text-slate-800">
                {lang === 'bn' ? 'বিকাশ লেনদেন প্রক্রিয়াধীন...' : 'Processing bKash Merchant Payment...'}
              </h4>
              <p className="text-xs text-slate-500">
                Connecting to /tokenized/checkout/execute API
              </p>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-extrabold text-slate-900">
                  {lang === 'bn' ? 'পেমেন্ট সফল হয়েছে!' : 'Payment Completed Successfully!'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'bn' ? 'আপনার বেতন রসিদ তাৎক্ষণিকভাবে হালনাগাদ হয়েছে।' : 'Invoice settled. Official money receipt generated.'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 text-left font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-bold text-emerald-700">{completedTrxId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-slate-900">BDT {invoice.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sender:</span>
                  <span className="text-slate-700">{walletPhone}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                {lang === 'bn' ? 'রসিদ দেখুন ও বন্ধ করুন' : 'View Money Receipt & Close'}
              </button>
            </div>
          )}
        </div>

        {/* Security Trust Footer */}
        <div className="bg-slate-50 p-3 border-t border-slate-200 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secured by bKash Tokenized Merchant Checkout API v1.2</span>
        </div>

      </div>
    </div>
  );
};
