import React from 'react';
import { ARCHITECTURE_METRICS } from '../data/reportData';

interface ExecutiveSummaryProps {
  lang: 'bn' | 'en';
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ lang }) => {
  return (
    <section id="summary" className="py-10 border-b border-stone-200">
      {/* Editorial Top Metadata Ribbon */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-6 font-mono">
        <span>REPORT REF: ARCH-BLG-2026-09</span>
        <span aria-hidden="true">·</span>
        <span>{lang === 'bn' ? 'স্ট্যাটাস: শর্তসাপেক্ষে কার্যকর' : 'STATUS: VIABLE WITH MITIGATIONS'}</span>
        <span aria-hidden="true">·</span>
        <span>{lang === 'bn' ? 'আর্কিটেকচার: হেডলেস আইফ্রেম ডিকপলিং' : 'ARCH: HEADLESS IFRAME DECOUPLING'}</span>
        <span aria-hidden="true">·</span>
        <span>{lang === 'bn' ? 'টার্গেট হোস্ট: ব্লগার + নেটলিফাই এজ' : 'TARGETS: BLOGGER + NETLIFY EDGE'}</span>
      </div>

      {/* Main Title & Deck */}
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 font-editorial mb-4 leading-tight">
          {lang === 'bn' 
            ? 'ব্লগস্পট-নেটলিফাই হেডলেস আর্কিটেকচার: কারিগরি অডিট ও পূর্ণাঙ্গ মূল্যায়ন রিপোর্ট'
            : 'Technical Evaluation Report: Headless Blogger via Netlify iFrame Shell'}
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
          {lang === 'bn'
            ? 'ব্লগস্পটকে একটি পূর্ণাঙ্গ ডিসপ্লে আয়না হিসেবে রূপান্তর করে ব্যাকএন্ড/কোর লজিক নেটলিফাই-তে হোস্ট করার প্রস্তাবিত কৌশলের গভীর প্রযুক্তিগত মূল্যায়ন, ঝুঁকি বিশ্লেষণ এবং উৎপাদনক্ষম সমাধান।'
            : 'An architectural feasibility audit, security assessment, and production implementation blueprint for decoupling application code onto Netlify Edge while using Blogger as a headless display container.'}
        </p>
      </div>

      {/* Core Verdict Box */}
      <div className="mt-8 p-6 bg-stone-100/70 border-l-4 border-stone-800 rounded-r-lg">
        <h2 className="text-sm font-mono uppercase tracking-wider text-stone-600 mb-2">
          {lang === 'bn' ? 'চূড়ান্ত প্রযুক্তিগত সিদ্ধান্ত (ARCHITECTURAL VERDICT)' : 'ARCHITECTURAL VERDICT'}
        </h2>
        <p className="text-base text-stone-800 leading-relaxed font-bengali">
          {lang === 'bn' ? (
            <>
              <strong>সিদ্ধান্ত: পদ্ধতিটি ১০০% কার্যকরী এবং টুলস/ক্যালকুলেটরের মতো অ্যাপের জন্য অত্যন্ত চমৎকার একটি স্ট্র্যাটেজি।</strong> তবে ব্যবহারকারী যে সাধারণ কোড স্নিপেটটি শেয়ার করেছেন, তা সরাসরি দিলে ৩টি মারাত্মক সাইড-ইফেক্ট হবে: 
              (১) মোবাইলে সাফারি ও ক্রোমের অ্যাড্রেস বার লাফালাফি ও স্ক্রোল জ্যাম, 
              (২) গুগল সার্চে ব্লগ ডোমেইনের এসইও র‍্যাঙ্ক শূন্য হয়ে যাওয়া, এবং 
              (৩) নেটলিফাই-এর ডিফল্ট সিকিউরিটি পলিসির কারণে আইফ্রেম লোড না হওয়া। 
              এই রিপোর্টে সেই ত্রুটিগুলো দূর করে একটি নিরাপদ ও ফুলপ্রুফ প্রোডাকশন মেথডোলজি তুলে ধরা হলো।
            </>
          ) : (
            <>
              <strong>Verdict: Structurally viable and exceptional for utility tools/calculators.</strong> However, the standard barebones XML snippet provided will trigger three critical production failures: 
              (1) Mobile viewport jumping & trapped touch gestures, 
              (2) Total de-indexing/SEO starvation on the Blogger hostname, and 
              (3) Frame blocking caused by Netlify&apos;s default X-Frame-Options headers. 
              This report provides the hardened, production-ready solution.
            </>
          )}
        </p>
      </div>

      {/* Metric Breakdown Grid */}
      <div className="mt-10">
        <h3 className="text-sm font-semibold tracking-tight text-stone-900 mb-4 uppercase font-mono">
          {lang === 'bn' ? 'আর্কিটেকচার সক্ষমতা মেট্রিক্স' : 'Architecture Capability Scores'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARCHITECTURE_METRICS.map((metric, idx) => (
            <div 
              key={idx}
              className="p-5 bg-white border border-stone-200 rounded-lg flex flex-col justify-between"
            >
              <div>
                <div className="text-xs text-stone-500 mb-2">
                  {lang === 'bn' ? metric.labelBn : metric.labelEn}
                </div>
                <div className="text-3xl font-mono font-bold tracking-tight text-stone-900 tabular-nums">
                  {metric.score}
                </div>
                <div className="text-xs text-stone-500 mt-1 font-mono">
                  {metric.benchmark}
                </div>
              </div>
              <p className="text-xs text-stone-600 mt-4 pt-3 border-t border-stone-100 leading-normal">
                {lang === 'bn' ? metric.verdictBn : metric.verdictEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
