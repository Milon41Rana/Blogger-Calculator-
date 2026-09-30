import React, { useState } from 'react';
import JSZip from 'jszip';
import { STANDALONE_CALCULATOR_HTML } from '../data/standaloneCalculatorCode';
import { BLOGGER_PRODUCTION_XML } from '../data/reportData';
import { X, Download, Copy, Check, ExternalLink, AlertTriangle, ShieldCheck, CheckCircle2, Monitor } from 'lucide-react';

interface BloggerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const BloggerGuideModal: React.FC<BloggerGuideModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [userNetlifyUrl, setUserNetlifyUrl] = useState('https://my-calculator.netlify.app');
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const [copiedXml, setCopiedXml] = useState(false);

  if (!isOpen) return null;

  const currentXml = BLOGGER_PRODUCTION_XML(
    userNetlifyUrl,
    'স্মার্ট অনলাইন ক্যালকুলেটর',
    'দ্রুত, নির্ভুল ও আধুনিক বৈজ্ঞানিক এবং সাধারণ ক্যালকুলেটর ওয়েব অ্যাপ',
    'clipboard-write; fullscreen'
  );

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      const zip = new JSZip();

      // 1. Calculator standalone app
      zip.file('index.html', STANDALONE_CALCULATOR_HTML);

      // 2. Netlify security headers to allow Blogger iframe
      zip.file('_headers', `/*\n  Content-Security-Policy: frame-ancestors 'self' https://*.blogspot.com https://*.blogger.com https://*.google.com\n  Access-Control-Allow-Origin: *\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`);

      // 3. Simple text instruction
      zip.file('README.txt', `স্মার্ট ক্যালকুলেটর - নেটলিফাই ও ব্লগার ডেপ্লয়মেন্ট নির্দেশিকা
==============================================================
১. এই জিপটি আনজিপ করুন।
২. https://app.netlify.com/drop লিংকে যান।
৩. এই ফোল্ডারটি (index.html ও _headers) ড্রপবক্সে টেনে এনে ছেড়ে দিন।
৪. ১০ সেকেন্ডে নেটলিফাই আপনাকে একটি লাইভ URL প্রদান করবে।
৫. সেই লাইভ লিঙ্কটি ব্লগের Theme > Edit HTML এ আমাদের দেওয়া XML ফাইলে বসিয়ে সেভ করুন।
`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'smart-calculator-netlify-ready.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 3500);
    } catch (e) {
      console.error(e);
      setDownloading(false);
    }
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(currentXml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-stone-100">
        
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h2 className="text-base font-semibold text-white tracking-tight">
              {lang === 'bn' ? 'ম্যানুয়াল বাস্তবায়ন নির্দেশিকা (Manual Setup Guide)' : 'Manual Setup Guide for Netlify & Blogger'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-stone-300">
          
          {/* Quick Notice */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 leading-relaxed text-xs sm:text-sm">
            {lang === 'bn' ? (
              <p>
                <strong className="text-white">সংক্ষেপে আপনার করণীয়:</strong> এই ক্যালকুলেটরটির ফাইল ডাউনলোড করে প্রথমে নেটলিফাইতে ফ্রিতে আপলোড করবেন, তারপর সেখান থেকে পাওয়া লিংকটি নিচের তৈরি করা XML কোডে বসিয়ে ব্লগারে পেস্ট করবেন। মাত্র ৫ মিনিটে আপনার ব্লগে ক্যালকুলেটরটি ফুলস্ক্রিন চলবে!
              </p>
            ) : (
              <p>
                <strong className="text-white">Summary:</strong> Download the pre-packaged bundle, drop it onto Netlify Drop to get your live URL, then paste the generated production XML into Blogger.
              </p>
            )}
          </div>

          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-[11px]">১</span>
              <span>{lang === 'bn' ? 'ধাপ ১: ক্যালকুলেটর প্যাকেজ ডাউনলোড' : 'Step 1: Download Netlify Bundle'}</span>
            </div>
            <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-white text-xs sm:text-sm">
                  smart-calculator-netlify-ready.zip
                </div>
                <div className="text-xs text-stone-400 mt-0.5">
                  {lang === 'bn' ? 'ভেতরে index.html এবং _headers ফাইল যুক্ত রয়েছে।' : 'Contains index.html and _headers for zero-conflict Netlify deploy.'}
                </div>
              </div>
              <button
                onClick={handleDownloadZip}
                disabled={downloading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
              >
                {downloadDone ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>{lang === 'bn' ? 'ডাউনলোড হয়েছে!' : 'Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{downloading ? (lang === 'bn' ? 'তৈরি হচ্ছে...' : 'Creating...') : (lang === 'bn' ? 'জিপ ডাউনলোড করুন' : 'Download ZIP Bundle')}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-stone-400">
              {lang === 'bn' ? 'ফাইলটি ডাউনলোড করে কম্পিউটারে যেকোনো একটি ফোল্ডারে আনজিপ (Extract) করে রাখুন।' : 'Extract the downloaded zip file into a folder on your computer.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold">
              <span className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center text-[11px]">২</span>
              <span>{lang === 'bn' ? 'ধাপ ২: নেটলিফাইতে ফ্রিতে লাইভ করুন (১০ সেকেন্ড)' : 'Step 2: Deploy to Netlify Drop (10 Seconds)'}</span>
            </div>
            <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {lang === 'bn' ? 'Netlify Drop পেজ ওপেন করুন:' : 'Open Netlify Drop:'}
                </span>
                <a
                  href="https://app.netlify.com/drop"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono"
                >
                  <span>app.netlify.com/drop</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {lang === 'bn'
                  ? 'আনজিপ করা ফোল্ডারটি টেনে নিয়ে (Drag & Drop) নেটলিফাই-এর ড্রপবক্সে ছেড়ে দিন। সাথে সাথে নেটলিফাই আপনাকে একটি লাইভ URL প্রদান করবে (যেমন: https://my-calc-123.netlify.app)। সেই লিংকটি কপি করে নিন।'
                  : 'Drag the unzipped folder into Netlify Drop. In 5-10 seconds, Netlify generates a free production URL (e.g., https://my-calc-123.netlify.app). Copy it.'}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold">
              <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center text-[11px]">৩</span>
              <span>{lang === 'bn' ? 'ধাপ ৩: ব্লগারে মোবাইল থিম বন্ধ করা (সবচেয়ে গুরুত্বপূর্ণ ধাপ ⚠️)' : 'Step 3: Toggle Off Blogger Mobile Theme (CRITICAL)'}</span>
            </div>
            <div className="p-4 bg-rose-950/30 border border-rose-900/60 rounded-xl space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>{lang === 'bn' ? 'এই ধাপটি না করলে মোবাইলে ক্যালকুলেটর দেখতে পাবেন না!' : 'Required for smartphone rendering!'}</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-stone-400 pl-1 leading-relaxed">
                <li>{lang === 'bn' ? 'Blogger ড্যাশবোর্ডে গিয়ে বামপাশের মেনু থেকে Theme এ ক্লিক করুন।' : 'Go to Blogger Dashboard > Theme.'}</li>
                <li>{lang === 'bn' ? 'কমলা রঙের Customize বাটনের ঠিক পাশের ড্রপডাউন তীরে (▾) চাপ দিন।' : 'Click the arrow next to Customize.'}</li>
                <li>{lang === 'bn' ? '"Mobile settings"-এ যান এবং "Desktop" সিলেক্ট করে Save করুন।' : 'Choose Mobile settings > select "Desktop" > Save.'}</li>
              </ol>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
              <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center text-[11px]">৪</span>
              <span>{lang === 'bn' ? 'ধাপ ৪: ব্লগারে XML কোড পেস্ট করুন' : 'Step 4: Paste Production XML in Blogger'}</span>
            </div>

            <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-3">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  {lang === 'bn' ? 'আপনার নেটলিফাই লাইভ লিংকটি এখানে লিখুন:' : 'Paste your live Netlify URL here:'}
                </label>
                <input
                  type="url"
                  value={userNetlifyUrl}
                  onChange={(e) => setUserNetlifyUrl(e.target.value)}
                  placeholder="https://your-calc.netlify.app"
                  className="w-full text-xs font-mono px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
                <span className="text-stone-400">
                  {lang === 'bn' ? 'তৈরি হওয়া অপ্টিমাইজড XML কোড:' : 'Generated Blogger XML Code:'}
                </span>
                <button
                  onClick={handleCopyXml}
                  className="flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-white rounded font-mono text-xs transition-colors"
                >
                  {copiedXml ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'XML কপি করুন' : 'Copy XML'}</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 bg-stone-900 text-stone-300 rounded-lg text-[11px] font-mono overflow-x-auto max-h-40 border border-stone-800">
                <code>{currentXml}</code>
              </pre>

              <p className="text-xs text-stone-400 leading-relaxed">
                {lang === 'bn'
                  ? 'Blogger > Theme > Edit HTML এ গিয়ে আগের সব কোড মুছে (Ctrl+A -> Delete) এই কোডটি পেস্ট করে দিয়ে উপরে Save আইকনে চাপ দিন।'
                  : 'In Blogger Theme > Edit HTML, delete all existing code and paste this XML, then save.'}
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-[11px]">৫</span>
              <span>{lang === 'bn' ? 'ধাপ ৫: ব্লগে ঢুকে পরীক্ষা করুন!' : 'Step 5: Test on Your Blogspot Domain'}</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed pl-7">
              {lang === 'bn'
                ? 'আপনার ব্লগস্পটের ঠিকানায় (যেমন: yourname.blogspot.com) যান। কোনো স্ক্রলবার ছাড়াই পুরো স্ক্রিনজুড়ে সুন্দরভাবে ক্যালকুলেটরটি চালু হয়ে যাবে। পরবর্তীতে কোনো বাটন বা হিসেব পরিবর্তন করতে চাইলে শুধু নেটলিফাইতে আপডেট দেবেন, ব্লগে হাতও দিতে হবে না!'
                : 'Visit your Blogspot domain. The calculator will render full-screen with zero scroll jumps. Future code edits only require updating Netlify!'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <span className="text-xs font-mono text-stone-400">
            {lang === 'bn' ? 'সহায়তা: সম্পূর্ণ অটোমেটিক ও ফ্রি হোস্টিং' : 'Self-contained deployment workflow'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
