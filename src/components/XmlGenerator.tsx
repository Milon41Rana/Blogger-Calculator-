import React, { useState } from 'react';
import { BLOGGER_PRODUCTION_XML } from '../data/reportData';
import { Copy, Check, Download, Code2, Sparkles, Sliders } from 'lucide-react';

interface XmlGeneratorProps {
  lang: 'bn' | 'en';
}

export const XmlGenerator: React.FC<XmlGeneratorProps> = ({ lang }) => {
  const [appUrl, setAppUrl] = useState('https://my-calculator-app.netlify.app');
  const [appTitle, setAppTitle] = useState('স্মার্ট অনলাইন ক্যালকুলেটর');
  const [appDescription, setAppDescription] = useState('নির্ভুল ও দ্রুত গণনার জন্য আধুনিক প্রফেশনাল ওয়েব অ্যাপ্লিকেশন');
  const [permissions, setPermissions] = useState('clipboard-write; fullscreen; encrypted-media');
  const [copied, setCopied] = useState(false);

  const generatedXml = BLOGGER_PRODUCTION_XML(appUrl, appTitle, appDescription, permissions);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedXml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blogger-theme-production.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="xml-generator" className="py-12 border-b border-stone-200">
      <div className="max-w-4xl mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-700 mb-1">
          {lang === 'bn' ? 'প্রোডাকশন-রেডি টেমপ্লেট জেনারেটর' : 'PRODUCTION TEMPLATE GENERATOR'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 font-editorial">
          {lang === 'bn' 
            ? 'উন্নত ও ত্রুটিমুক্ত ব্লগার XML কোড জেনারেটর' 
            : 'Hardened Production Blogger XML Generator'}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
          {lang === 'bn'
            ? 'আপনার আসল নেটলিফাই অ্যাপের লিংক ও বিবরণ দিন। স্বয়ংক্রিয়ভাবে 100dvh রেসপনসিভ CSS, স্মুথ স্পিনার, এসইও ফলব্যাক ও আইফ্রেম ব্রিজ সমৃদ্ধ পূর্ণাঙ্গ ব্লগার থিম তৈরি হয়ে যাবে।'
            : 'Configure your Netlify URL and metadata. This generates an enterprise-grade Blogger theme XML with 100dvh touch handling, smooth preloader, crawler metadata, and fallback states.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Config Controls (4 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Sliders className="w-4 h-4 text-stone-600" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold">
              {lang === 'bn' ? 'কনফিগারেশন ইনপুট' : 'Configuration Parameters'}
            </h3>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {lang === 'bn' ? 'নেটলিফাই লাইভ ইউআরএল (Netlify App URL)' : 'Netlify App Target URL'}
            </label>
            <input
              type="url"
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
              placeholder="https://your-app.netlify.app"
              className="w-full text-xs font-mono px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {lang === 'bn' ? 'অ্যাপের নাম / টাইটেল (App Title)' : 'Application Title'}
            </label>
            <input
              type="text"
              value={appTitle}
              onChange={(e) => setAppTitle(e.target.value)}
              placeholder="My Web Application"
              className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {lang === 'bn' ? 'এসইও মেটা ডেসক্রিপশন (Meta Description)' : 'SEO Meta Description'}
            </label>
            <textarea
              rows={2}
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              placeholder="Application summary for search crawlers..."
              className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {lang === 'bn' ? 'আইফ্রেম পারমিশন পলিসি (Permissions)' : 'Iframe Permissions Policy'}
            </label>
            <input
              type="text"
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
              className="w-full text-xs font-mono px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50"
            />
          </div>

          {/* Key Enhancements checklist */}
          <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
            <div className="font-semibold text-stone-900 font-mono text-[11px] uppercase">
              {lang === 'bn' ? 'স্বয়ংক্রিয় ফিচারসমূহ অন্তর্ভুক্ত:' : 'Automated Built-in Mitigations:'}
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <Check className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? '100dvh ডাইনামিক ভিউপোর্ট (নো সাফারি স্ক্রোল জাম্প)' : '100dvh dynamic viewport unit'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <Check className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'বিল্ট-ইন স্পিনার ও স্মুথ ফেড-ইন ট্রানজিশন' : 'Smooth splash loader & fade-in'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <Check className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'পূর্ণাঙ্গ সোশ্যাল ওপেনগ্রাফ ও টুইটার মেটা' : 'OpenGraph & Twitter Card headers'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <Check className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ক্রলারদের জন্য সেম্যান্টিক <noscript> ব্যাকআপ' : 'Crawlable semantic fallback body'}</span>
            </div>
          </div>
        </div>

        {/* Right Code Display (7 cols) */}
        <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between">
          
          {/* Header Bar */}
          <div className="px-4 py-3 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-stone-300">
                blogger-theme.xml ({generatedXml.split('\n').length} lines)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 rounded transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'কপি XML' : 'Copy XML'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-white bg-emerald-700 hover:bg-emerald-600 rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডাউনলোড .xml' : 'Download .xml'}</span>
              </button>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="p-4 overflow-y-auto max-h-[440px] text-xs font-mono leading-relaxed text-stone-200">
            <pre>
              <code>{generatedXml}</code>
            </pre>
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-stone-900/90 border-t border-stone-800 text-[11px] font-mono text-stone-400">
            {lang === 'bn' 
              ? 'ইনস্ট্রাকশন: ব্লগার ড্যাশবোর্ড > Theme > Edit HTML এ গিয়ে সম্পূর্ণ কোড পেস্ট করে Save বাটনে চাপুন।'
              : 'Instruction: Blogger Dashboard > Theme > Edit HTML > Replace all content > Click Save.'}
          </div>

        </div>

      </div>
    </section>
  );
};
