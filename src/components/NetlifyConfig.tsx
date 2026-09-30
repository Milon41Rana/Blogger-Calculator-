import React, { useState } from 'react';
import { NETLIFY_HEADERS_SNIPPET, NETLIFY_TOML_SNIPPET } from '../data/reportData';
import { ShieldCheck, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface NetlifyConfigProps {
  lang: 'bn' | 'en';
}

export const NetlifyConfig: React.FC<NetlifyConfigProps> = ({ lang }) => {
  const [bloggerSubdomain, setBloggerSubdomain] = useState('mycalculator');
  const [activeTab, setActiveTab] = useState<'headers' | 'toml'>('headers');
  const [copied, setCopied] = useState(false);

  const snippet = activeTab === 'headers' 
    ? NETLIFY_HEADERS_SNIPPET(bloggerSubdomain)
    : NETLIFY_TOML_SNIPPET(bloggerSubdomain);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="netlify-setup" className="py-12 border-b border-stone-200">
      <div className="max-w-4xl mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-sky-700 mb-1">
          {lang === 'bn' ? 'নেটলিফাই সিকিউরিটি কনফিগারেশন' : 'NETLIFY SECURITY HEADERS & DEPLOYMENT'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 font-editorial">
          {lang === 'bn'
            ? 'নেটলিফাই হেডার্স কনফিগারেশন: ব্লকিং এড়ানোর নিয়ম'
            : 'Netlify Edge Headers: Eliminating Frame Ancestor Blocking'}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
          {lang === 'bn'
            ? 'নেটলিফাই সাইটগুলো যেন যেকোনো ব্রাউজারে ব্লগস্পট আইফ্রেমের ভেতরে নিরাপদে লোড হতে পারে, সেজন্য নিচের হেডার্স ফাইলটি আপনার নেটলিফাই অ্যাপের প্রজেক্ট ফোল্ডারে যোগ করতে হবে।'
            : 'To prevent modern browser engines from denying the iframe embedding, deploy the following headers to instruct Netlify Edge to allow your Blogspot domain.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left instructions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-semibold mb-3">
              {lang === 'bn' ? 'আপনার ব্লগের ঠিকানা দিন' : 'Specify Blogger Subdomain'}
            </h3>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={bloggerSubdomain}
                onChange={(e) => setBloggerSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="mycalculator"
                className="flex-1 text-xs font-mono px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50"
              />
              <span className="text-xs font-mono text-stone-500 whitespace-nowrap">.blogspot.com</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              {lang === 'bn' 
                ? 'যদি কাস্টম ডোমেইন থাকে (যেমন: app.mydomain.com), তবে সরাসরি ডোমেইন নাম লিখুন।'
                : 'If using a custom domain on Blogger, input your custom apex/subdomain.'}
            </p>
          </div>

          {/* Deployment steps checklist */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-900 font-semibold">
              {lang === 'bn' ? 'নেটলিফাই ডেপ্লয়মেন্ট গাইড (৩টি ধাপ)' : 'Netlify Deployment Checklist'}
            </div>

            <div className="text-xs text-stone-700 space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="font-mono text-stone-400">1.</span>
                <span>
                  {lang === 'bn'
                    ? 'আপনার প্রজেক্টের (বা public/ ডিরেক্টরির) ভেতরে "_headers" নামের একটি এক্সটেনশনহীন ফাইল তৈরি করুন।'
                    : 'Create a raw file named "_headers" (no file extension) in your root build / public folder.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-stone-400">2.</span>
                <span>
                  {lang === 'bn'
                    ? 'ডানপাশের কোডটি হুবহু কপি করে "_headers" ফাইলে পেস্ট করুন।'
                    : 'Paste the snippet on the right into the "_headers" or "netlify.toml" file.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-stone-400">3.</span>
                <span>
                  {lang === 'bn'
                    ? 'নেটলিফাইতে সাইট ডেপ্লয় করুন (ড্র্যাগ অ্যান্ড ড্রপ অথবা গিট পুশ)। এবার ব্লগস্পটে অ্যাপটি নির্দ্বিধায় লোড হবে!'
                    : 'Deploy to Netlify via Git or manual folder drop. The iframe will render flawlessly.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Code (7 cols) */}
        <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between">
          <div className="px-4 py-3 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
            {/* Tab switch */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('headers')}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  activeTab === 'headers' ? 'bg-stone-800 text-white font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                _headers format
              </button>
              <button
                onClick={() => setActiveTab('toml')}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  activeTab === 'toml' ? 'bg-stone-800 text-white font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                netlify.toml format
              </button>
            </div>

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
                  <span>{lang === 'bn' ? 'কপি কোড' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[300px] text-xs font-mono text-stone-200">
            <pre>
              <code>{snippet}</code>
            </pre>
          </div>

          <div className="px-4 py-2.5 bg-stone-900/90 border-t border-stone-800 text-[11px] font-mono text-stone-400">
            {lang === 'bn'
              ? 'নিরাপত্তা বার্তা: এই নীতিটি ব্লগস্পট ছাড়া অন্য কোনো অননুমোদিত সাইটকে আপনার অ্যাপ ফ্রেম করতে বাধা দেবে।'
              : 'Security assurance: Prevents malicious clickjacking while explicitly allowing Blogger.'}
          </div>
        </div>

      </div>
    </section>
  );
};
