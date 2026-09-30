import React, { useState } from 'react';
import { ArrowRight, Layers, Smartphone, RefreshCw, ShieldAlert, Cpu } from 'lucide-react';

interface ArchitectureFlowProps {
  lang: 'bn' | 'en';
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'comparison'>('flow');

  return (
    <section id="architecture" className="py-12 border-b border-stone-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
            {lang === 'bn' ? 'আর্কিটেকচার ম্যাপিং' : 'SYSTEM ARCHITECTURE & DATA FLOW'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 font-editorial">
            {lang === 'bn' ? 'সিস্টেম ফ্লো ও প্রযুক্তিগত বিভাজন' : 'Data Pipeline & Layer Decoupling'}
          </h2>
        </div>

        {/* Interactive Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'flow' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'bn' ? 'ফ্লো ডায়াগ্রাম' : 'Flow Diagram'}
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'comparison' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'bn' ? 'তুলনামূলক বিশ্লেষণ' : 'Comparative Analysis'}
          </button>
        </div>
      </div>

      {activeTab === 'flow' ? (
        <div className="space-y-6">
          {/* Visual Architecture Map */}
          <div className="p-6 bg-white border border-stone-200 rounded-xl">
            <h3 className="text-sm font-semibold text-stone-900 mb-6 font-mono uppercase">
              {lang === 'bn' ? 'অনুরোধ ও রেন্ডারিং পাইপলাইন' : 'Execution Pipeline'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Step 1 */}
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-stone-400 mb-2">STEP 01</div>
                  <div className="text-sm font-semibold text-stone-900 mb-1">
                    {lang === 'bn' ? 'ব্যবহারকারীর ব্রাউজার' : 'Client User Agent'}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {lang === 'bn' 
                      ? 'ব্যবহারকারী yourblog.blogspot.com এ রিকোয়েস্ট পাঠায়।'
                      : 'User inputs custom or blogspot.com URL into modern browser.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono text-stone-500">
                  HTTP GET / 200 OK
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-stone-400 mb-2">STEP 02</div>
                  <div className="text-sm font-semibold text-stone-900 mb-1">
                    {lang === 'bn' ? 'ব্লগার ডিসপ্লে শেল' : 'Blogger XML Shell'}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {lang === 'bn'
                      ? 'ব্লগার কেবল লাইটওয়েট এইচটিএমএল শেল ও আইফ্রেম ধারক পাঠায়।'
                      : 'Blogger servers return zero body content except a full-screen iframe container.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono text-stone-500">
                  Payload: &lt; 2 KB
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-stone-400 mb-2">STEP 03</div>
                  <div className="text-sm font-semibold text-stone-900 mb-1">
                    {lang === 'bn' ? 'নেটলিফাই এজ সিডিএন' : 'Netlify Global Edge'}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {lang === 'bn'
                      ? 'আইফ্রেম সোর্স হিসেবে নেটলিফাই থেকে আপনার ক্যালকুলেটর/অ্যাপ লোড হয়।'
                      : 'Iframe issues direct parallel fetch to your high-speed Netlify bundle.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono text-stone-500">
                  HTTP/2 + Brotli
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-emerald-600 mb-2">STEP 04</div>
                  <div className="text-sm font-semibold text-emerald-950 mb-1">
                    {lang === 'bn' ? 'ফুল-স্ক্রিন এক্সিকিউশন' : 'Sandboxed Execution'}
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {lang === 'bn'
                      ? 'অ্যাপটি নির্বিঘ্নে চলে; ব্লগার কোড ভাঙার কোনো ঝুঁকিই থাকে না।'
                      : 'Application logic runs isolated inside browser sandbox without XML parser interference.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200 text-xs font-mono text-emerald-700">
                  Status: 100% Isolated
                </div>
              </div>
            </div>

            {/* Micro Details */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-stone-700" />
                <span>{lang === 'bn' ? 'সিআই/সিডি: গিট পুশ অটোমেশন' : 'CI/CD: Automated Git Deployments'}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-stone-700" />
                <span>{lang === 'bn' ? 'কন্টেন্ট সেপারেশন: ১০০% ডিকপলড' : 'Decoupling: Complete Separation'}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-stone-700" />
                <span>{lang === 'bn' ? 'স্ক্রিন সাইজ: ডায়নামিক 100dvh' : 'Viewport: Dynamic 100dvh'}</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Detailed Architectural Comparison Table */
        <div className="overflow-x-auto border border-stone-200 rounded-xl bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-xs font-mono uppercase text-stone-600">
              <tr>
                <th className="py-3.5 px-4 font-semibold">{lang === 'bn' ? 'বৈশিষ্ট্য' : 'Architecture Dimension'}</th>
                <th className="py-3.5 px-4 font-semibold text-rose-800">{lang === 'bn' ? 'সরাসরি ব্লগার XML-এ কোড রাখা' : 'Direct Blogger Embedding'}</th>
                <th className="py-3.5 px-4 font-semibold text-emerald-800">{lang === 'bn' ? 'নেটলিফাই হেডলেস আইফ্রেম পদ্ধতি' : 'Netlify Headless Shell (Your Idea)'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700">
              <tr>
                <td className="py-3.5 px-4 font-medium text-stone-900">{lang === 'bn' ? 'কোড আপডেট ও ডেপ্লয়মেন্ট' : 'Update & Deploy Pipeline'}</td>
                <td className="py-3.5 px-4 text-xs text-rose-700">
                  {lang === 'bn' ? 'প্রতিবার ব্লগারে লগইন করে ম্যানুয়ালি XML এডিট ও পেস্ট করতে হয়।' : 'Manual copy-paste into Blogger HTML editor; high human-error rate.'}
                </td>
                <td className="py-3.5 px-4 text-xs text-emerald-800 font-medium">
                  {lang === 'bn' ? 'গিটহাবে গিট পুশ (Git Push) করলেই নেটলিফাই অটোমেটিক ৩ সেকেন্ডে আপডেট নেয়।' : 'Instantaneous Git-driven CI/CD; push to GitHub/GitLab deploys live.'}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-stone-900">{lang === 'bn' ? 'জাভাস্ক্রিপ্ট সিনট্যাক্স নিরাপত্তা' : 'XML Parsing & Syntax'}</td>
                <td className="py-3.5 px-4 text-xs text-rose-700">
                  {lang === 'bn' ? 'অপারেটর যেমন && বা < ট্যাগ থাকলে ব্লগার XML এরর দেয় এবং সাইট ক্র্যাশ করে।' : 'Blogger XML parser corrupts operators (&&, <, quotes) without CDATA hacks.'}
                </td>
                <td className="py-3.5 px-4 text-xs text-emerald-800 font-medium">
                  {lang === 'bn' ? 'নেটলিফাই নিখাদ ব্রাউজার ইঞ্জিন হিসেবে চলে, কোনো XML কনফ্লিক্ট নেই।' : 'Zero parser interference; supports complex React, WebAssembly, modern JS.'}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-stone-900">{lang === 'bn' ? 'লোডিং পারফরম্যান্স ও ক্যাশিং' : 'Asset Caching & Performance'}</td>
                <td className="py-3.5 px-4 text-xs">
                  {lang === 'bn' ? 'ব্লগস্পটের স্ট্যাটিক সার্ভার ও সীমিত ক্যাশ হেডার।' : 'Standard Blogger asset pipeline with rigid cache policies.'}
                </td>
                <td className="py-3.5 px-4 text-xs text-emerald-800 font-medium">
                  {lang === 'bn' ? 'নেটলিফাই-এর হাই-পারফরম্যান্স গ্লোবাল এজ সিডিএন (Brotli/Gzip)।' : 'Global multi-cloud edge CDN, automatic Brotli compression, immutable hashing.'}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-stone-900">{lang === 'bn' ? 'এসইও ও সার্চ ভিজিবিলিটি' : 'SEO & Search Indexability'}</td>
                <td className="py-3.5 px-4 text-xs text-emerald-800 font-medium">
                  {lang === 'bn' ? 'সহজেই পেজের কনটেন্ট গুগলবট ইনডেক্স করতে পারে।' : 'Direct HTML DOM is indexed automatically by Googlebot.'}
                </td>
                <td className="py-3.5 px-4 text-xs text-amber-800">
                  {lang === 'bn' ? 'সতর্কতা: সঠিক মেটাট্যাগ ও ফলব্যাক না বসালে গুগল ব্লগের ডোমেইন খালি হিসেবে ড্রপ করবে।' : 'Caution: Requires rigorous <head> meta injection to avoid de-indexing.'}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-stone-900">{lang === 'bn' ? 'রেসপনসিভ ভিউপোর্ট স্ট্যাবিলিটি' : 'Mobile Viewport Behaviour'}</td>
                <td className="py-3.5 px-4 text-xs">
                  {lang === 'bn' ? 'ন্যাচারাল পেজ স্ক্রোল স্বাভাবিকভাবে কাজ করে।' : 'Native document scroll responds predictably.'}
                </td>
                <td className="py-3.5 px-4 text-xs text-amber-800">
                  {lang === 'bn' ? 'প্রয়োজন: 100dvh এবং overscroll CSS না দিলে আইওএস সাফারিতে কাঁপবে।' : 'Requires explicit 100dvh CSS rule to prevent Safari viewport snapping.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
