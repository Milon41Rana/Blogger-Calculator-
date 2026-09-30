import React, { useState } from 'react';
import JSZip from 'jszip';
import { STANDALONE_CALCULATOR_HTML } from '../data/standaloneCalculatorCode';
import { NETLIFY_HEADERS_SNIPPET, BLOGGER_PRODUCTION_XML } from '../data/reportData';
import { Download, UploadCloud, Monitor, Smartphone, CheckCircle, ExternalLink, ArrowRight, Copy, Check } from 'lucide-react';
import { InteractiveCalculator } from './InteractiveCalculator';

interface ManualTestingGuideProps {
  lang: 'bn' | 'en';
}

export const ManualTestingGuide: React.FC<ManualTestingGuideProps> = ({ lang }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedBloggerXml, setCopiedBloggerXml] = useState(false);

  // Generate ZIP bundle containing index.html and _headers for 1-click Netlify Drop
  const handleDownloadPackage = async () => {
    try {
      setDownloading(true);
      const zip = new JSZip();

      // 1. Standalone Calculator HTML file
      zip.file('index.html', STANDALONE_CALCULATOR_HTML);

      // 2. Netlify _headers security file
      zip.file('_headers', `/*\n  Content-Security-Policy: frame-ancestors 'self' https://*.blogspot.com https://*.blogger.com https://*.google.com\n  Access-Control-Allow-Origin: *\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`);

      // 3. Readme instructions
      zip.file('README.txt', `স্মার্ট ক্যালকুলেটর - নেটলিফাই ও ব্লগার ডেপ্লয়মেন্ট নির্দেশিকা
==============================================================
১. এই জিপটি আনজিপ করুন।
২. https://app.netlify.com/drop লিংকে যান।
৩. এই ফোল্ডারটি বা ভেতরের ফাইলগুলো (index.html ও _headers) ড্রপবক্সে টেনে এনে ছেড়ে দিন।
৪. ১০ সেকেন্ডে নেটলিফাই আপনাকে একটি লাইভ URL প্রদান করবে।
৫. সেই লাইভ লিঙ্কটি ব্লগের Theme > Edit HTML এ আমাদের দেওয়া XML ফাইলে বসিয়ে সেভ করুন।
`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'calculator-netlify-ready-bundle.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Download error:', err);
      setDownloading(false);
    }
  };

  const handleCopySampleXml = () => {
    const xml = BLOGGER_PRODUCTION_XML(
      'https://my-calculator-app.netlify.app',
      'স্মার্ট অনলাইন ক্যালকুলেটর',
      'দ্রুত ও নির্ভুল গণনার জন্য আধুনিক প্রফেশনাল ক্যালকুলেটর',
      'clipboard-write; fullscreen'
    );
    navigator.clipboard.writeText(xml);
    setCopiedBloggerXml(true);
    setTimeout(() => setCopiedBloggerXml(false), 2000);
  };

  return (
    <section id="manual-testing" className="py-12 border-b border-stone-200">
      <div className="max-w-4xl mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-amber-700 mb-1">
          {lang === 'bn' ? 'বাস্তব পরীক্ষার নির্দেশিকা ও ক্যালকুলেটর' : 'HANDS-ON TESTING LAB & MANUAL INSTRUCTIONS'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 font-editorial">
          {lang === 'bn'
            ? 'লাইভ টেস্ট ক্যালকুলেটর ও আপনার যা যা করতে হবে'
            : 'Interactive Calculator Test Lab & Step-by-Step Manual Workflow'}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
          {lang === 'bn'
            ? 'আমরা আপনার জন্য একটি স্বয়ংসম্পূর্ণ আধুনিক ক্যালকুলেটর ওয়েব অ্যাপ তৈরি করেছি। নিচে সরাসরি এটি চালিয়ে দেখুন এবং ৫ মিনিটে আপনার ব্লগে লাইভ করার জন্য ম্যানুয়াল ধাপগুলো অনুসরণ করুন:'
            : 'Test the functional calculator below, download the pre-packaged bundle, and follow the 5-step manual deployment checklist.'}
        </p>
      </div>

      {/* Grid: Left = Live Calculator & Simulator; Right = Step-by-Step Manual Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Calculator & Blogger Simulation Frame (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
            <div className="text-xs font-mono font-semibold text-stone-800 uppercase">
              {lang === 'bn' ? 'সরাসরি ক্যালকুলেটর পরীক্ষা করুন' : 'Live Interactive Calculator'}
            </div>

            {/* Device preview switch */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
                  previewDevice === 'desktop' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-mono">PC</span>
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
                  previewDevice === 'mobile' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-mono">Mobile</span>
              </button>
            </div>
          </div>

          {/* Faux Blogger Browser Frame */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-900 shadow-inner">
            {/* Faux Address Bar */}
            <div className="bg-stone-800 px-3 py-2 flex items-center gap-2 border-b border-stone-700">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="flex-1 bg-stone-900/90 rounded px-2.5 py-1 text-[11px] font-mono text-stone-300 flex items-center justify-between">
                <span className="truncate">https://my-calculator.blogspot.com</span>
                <span className="text-[10px] text-emerald-400 font-mono">SSL 🔒</span>
              </div>
            </div>

            {/* Simulated Iframe Content */}
            <div className={`p-4 sm:p-6 transition-all duration-300 flex items-center justify-center bg-stone-950 ${
              previewDevice === 'mobile' ? 'max-w-[340px] mx-auto min-h-[500px]' : 'w-full min-h-[480px]'
            }`}>
              <InteractiveCalculator lang={lang} />
            </div>

            <div className="px-3 py-2 bg-stone-900 text-[11px] font-mono text-stone-400 border-t border-stone-800 flex items-center justify-between">
              <span>{lang === 'bn' ? 'আইফ্রেম সোর্স: Netlify Global Edge' : 'Iframe Source: Netlify Edge CDN'}</span>
              <span className="text-emerald-400">100dvh Active ✓</span>
            </div>
          </div>

          {/* Download Ready Bundle Button */}
          <div className="mt-5 p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-semibold text-emerald-950 uppercase font-mono">
                  {lang === 'bn' ? 'নেটলিফাই রেডি প্যাকেজ (ZIP)' : 'Netlify-Ready Package (ZIP)'}
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  {lang === 'bn'
                    ? 'এতে সম্পূর্ণ index.html এবং _headers ফাইল যুক্ত করা আছে।'
                    : 'Contains pre-built index.html and configured _headers.'}
                </p>
              </div>

              <button
                onClick={handleDownloadPackage}
                disabled={downloading}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors whitespace-nowrap shadow-sm"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>{lang === 'bn' ? 'ডাউনলোড সম্পন্ন!' : 'Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{downloading ? (lang === 'bn' ? 'প্যাক হচ্ছে...' : 'Packaging...') : (lang === 'bn' ? 'প্যাকেজ ডাউনলোড করুন' : 'Download ZIP Bundle')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Manual Workflow (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-mono">✓</span>
              <span>{lang === 'bn' ? 'আপনাকে ম্যানুয়ালি যা যা করতে হবে (৫টি ধাপ):' : 'Manual Implementation Steps (Checklist):'}</span>
            </h3>

            {/* Step 1 */}
            <div className="pb-4 mb-4 border-b border-stone-100 flex items-start gap-3">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">০১</span>
              <div>
                <div className="text-sm font-semibold text-stone-900">
                  {lang === 'bn' ? 'ক্যালকুলেটর জিপ ফাইলটি ডাউনলোড করুন' : 'Download the Calculator Bundle'}
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {lang === 'bn'
                    ? 'বামপাশের "প্যাকেজ ডাউনলোড করুন" বাটনে ক্লিক করে calculator-netlify-ready-bundle.zip ফাইলটি আপনার কম্পিউটারে নামিয়ে নিন এবং আনজিপ করুন।'
                    : 'Click "Download ZIP Bundle" on the left and unzip the archive on your local computer.'}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="pb-4 mb-4 border-b border-stone-100 flex items-start gap-3">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">০২</span>
              <div>
                <div className="text-sm font-semibold text-stone-900 flex items-center gap-2">
                  <span>{lang === 'bn' ? 'নেটলিফাইতে আপলোড ও লাইভ লিংক নেওয়া' : 'Deploy to Netlify Drop'}</span>
                  <a
                    href="https://app.netlify.com/drop"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-sky-600 hover:text-sky-800 flex items-center gap-0.5"
                  >
                    <span>Netlify Drop</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {lang === 'bn'
                    ? 'ব্রাউজারে https://app.netlify.com/drop সাইটে যান। এবার আনজিপ করা ফোল্ডারটি টেনে এনে ছেড়ে দিন। মাত্র ৫-১০ সেকেন্ডের মধ্যে নেটলিফাই আপনাকে একটি লাইভ ফ্রি ইউআরএল (যেমন: https://my-cool-calc.netlify.app) দেবে। সেই লিংকটি কপি করুন।'
                    : 'Visit https://app.netlify.com/drop. Drag the unzipped folder into the drop zone. Within seconds, Netlify generates a free production URL (e.g. https://xyz.netlify.app). Copy it.'}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="pb-4 mb-4 border-b border-stone-100 flex items-start gap-3">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">০৩</span>
              <div>
                <div className="text-sm font-semibold text-stone-900">
                  {lang === 'bn' ? 'ব্লগার মোবাইল থিম বন্ধ করা (অত্যন্ত জরুরি!)' : 'Toggle Off Blogger Mobile Theme (CRITICAL)'}
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {lang === 'bn'
                    ? 'আপনার Blogger ড্যাশবোর্ডে গিয়ে Theme এ যান। কাস্টমাইজেশন বাটনের পাশের তীর চিহ্ন (▾) চেপে "Mobile settings"-এ ক্লিক করুন এবং "Desktop" সিলেক্ট করে সেভ করুন। (এটি না করলে মোবাইলে আপনার ক্যালকুলেটর দেখা যাবে না)।'
                    : 'Go to Blogger > Theme > Click the dropdown arrow next to Customize > Mobile settings > Select "Desktop" and Save. (Without this, mobile visitors see default blog text).'}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="pb-4 mb-4 border-b border-stone-100 flex items-start gap-3">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">০৪</span>
              <div>
                <div className="text-sm font-semibold text-stone-900">
                  {lang === 'bn' ? 'ব্লগারে উন্নত XML কোড পেস্ট করা' : 'Paste Production XML in Blogger'}
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {lang === 'bn'
                    ? 'Blogger > Theme > Edit HTML-এ যান। আগের সব কোড মুছে দিন (Ctrl+A -> Delete)। এবার আমাদের জেনারেট করা XML কোডটি পেস্ট করে দিয়ে ভেতরে নেটলিফাই লিংকটি বসিয়ে দিন এবং উপরে "Save" আইকনে ক্লিক করুন।'
                    : 'Go to Blogger > Theme > Edit HTML. Erase everything. Paste the production XML generated on this page (with your Netlify URL inserted) and click Save.'}
                </p>
                <button
                  onClick={handleCopySampleXml}
                  className="mt-2 text-xs font-mono text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
                >
                  {copiedBloggerXml ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lang === 'bn' ? 'XML কপি হয়েছে!' : 'XML Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'ক্যালকুলেটর XML কপি করুন' : 'Copy Sample XML'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">০৫</span>
              <div>
                <div className="text-sm font-semibold text-stone-900">
                  {lang === 'bn' ? 'ব্লগের লিংকে গিয়ে টেস্ট করুন!' : 'Visit Your Blogspot URL & Enjoy!'}
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {lang === 'bn'
                    ? 'এবার আপনার ব্লগের ঠিকানা (যেমন: yourblog.blogspot.com) ভিজিট করুন। পুরো স্ক্রিন জুড়ে ক্যালকুলেটরটি স্বাচ্ছন্দ্যে চলবে এবং পরবর্তীতে ক্যালকুলেটরে কোনো পরিবর্তন করতে চাইলে শুধু নেটলিফাই-তে ফাইল ড্রপ করলেই ব্লগে সাথে সাথে আপডেট হবে!'
                    : 'Open your Blogspot URL. The calculator will run flawlessly full-screen. Future updates only require pushing to Netlify without touching Blogger!'}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
