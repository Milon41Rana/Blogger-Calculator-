import React, { useState } from 'react';
import { CheckSquare, Square, Award, AlertCircle } from 'lucide-react';

interface AuditScorecardProps {
  lang: 'bn' | 'en';
}

interface ChecklistItem {
  id: string;
  labelBn: string;
  labelEn: string;
  critical: boolean;
  hintBn: string;
  hintEn: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'mobile-theme-off',
    labelBn: 'ব্লগার মোবাইল থিম বন্ধ করা হয়েছে (Desktop Responsive Mode)',
    labelEn: 'Blogger default Mobile Theme toggled off (Desktop Mode)',
    critical: true,
    hintBn: 'Blogger > Theme > Mobile Settings এ গিয়ে "Desktop" সিলেক্ট করতে হবে, নইলে মোবাইলে ডিফল্ট ব্লগ টেমপ্লেট লোড হবে।',
    hintEn: 'In Blogger Theme settings, ensure Mobile theme is set to Desktop so the XML applies on smartphones.'
  },
  {
    id: 'dvh-applied',
    labelBn: 'CSS এ 100dvh ভিউপোর্ট ইউনিট যোগ করা হয়েছে',
    labelEn: 'Dynamic viewport height (100dvh) applied in XML CSS',
    critical: true,
    hintBn: 'সাধারণ 100vh এর বদলে 100dvh ব্যবহার করায় মোবাইলে অ্যাড্রেস বার স্ক্রল জাম্প হবে না।',
    hintEn: 'Prevents Safari / Chrome floating address bar layout shifts and rubber-band jumps.'
  },
  {
    id: 'headers-deployed',
    labelBn: 'নেটলিফাইতে "_headers" এ Content-Security-Policy কনফিগার করা হয়েছে',
    labelEn: 'Netlify _headers contains frame-ancestors permission',
    critical: true,
    hintBn: 'X-Frame-Options বা CSP যেন ব্লগস্পটের ভেতর আইফ্রেম লোড হতে ব্লক না করে।',
    hintEn: 'Mandatory to avoid browser console error "Refused to display document in a frame".'
  },
  {
    id: 'seo-meta',
    labelBn: 'ব্লগার <head> এ OpenGraph ও টুইটার মেটা ট্যাগ যুক্ত করা হয়েছে',
    labelEn: 'SEO Meta Description and OpenGraph tags configured',
    critical: false,
    hintBn: 'ফেসবুক, টুইটার বা গুগল সার্চে লিংক শেয়ার করলে সুন্দর প্রিভিউ ও কার্ড প্রদর্শন করবে।',
    hintEn: 'Ensures social sharing links generate rich title cards instead of empty snippets.'
  },
  {
    id: 'crawler-noscript',
    labelBn: 'বডিতে ক্রলারদের জন্য <noscript> বিবরণ রাখা হয়েছে',
    labelEn: 'Semantic <noscript> fallback included for web crawlers',
    critical: false,
    hintBn: 'গুগলবট যেন বুঝতে পারে এই ওয়েব অ্যাপটি কী ধরনের টুলস বা পরিষেবা প্রদান করে।',
    hintEn: 'Provides search crawlers with indexable semantic copy describing your app.'
  },
  {
    id: 'permissions-policy',
    labelBn: 'আইফ্রেমে প্রয়োজনীয় allow পারমিশন (যেমন: clipboard-write) দেওয়া হয়েছে',
    labelEn: 'Iframe permissions policy (clipboard, fullscreen) specified',
    critical: false,
    hintBn: 'ক্যালকুলেটর বা টুলে "Copy to Clipboard" বাটন থাকলে আইফ্রেমে এই পারমিশন ছাড়া কাজ করবে না।',
    hintEn: 'Modern browsers block navigator.clipboard inside iframes unless explicitly allowed.'
  }
];

export const AuditScorecard: React.FC<AuditScorecardProps> = ({ lang }) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([
    'mobile-theme-off',
    'dvh-applied',
    'headers-deployed'
  ]);

  const toggleItem = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const score = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <section id="audit-matrix" className="py-12 border-b border-stone-200">
      <div className="max-w-4xl mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
          {lang === 'bn' ? 'প্রোডাকশন চেকলিস্ট' : 'DEPLOYMENT VERIFICATION CHECKLIST'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 font-editorial">
          {lang === 'bn'
            ? 'লাইভ বাস্তবায়নের পূর্বশর্ত অডিট চেকলিস্ট'
            : 'Interactive Go-Live Readiness Matrix'}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
          {lang === 'bn'
            ? 'আপনার ব্লগস্পট ও নেটলিফাই সেটআপটি সম্পূর্ণ নিরাপদ ও ত্রুটিমুক্ত হয়েছে কিনা তা নিচের ধাপগুলো দেখে মিলিয়ে নিন:'
            : 'Verify every architectural safeguard before public launch to ensure zero rendering glitches or crawler penalties:'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Checklist Items (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-xl p-5 space-y-3">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start gap-3 ${
                  isChecked 
                    ? 'border-emerald-200 bg-emerald-50/40 text-stone-900' 
                    : 'border-stone-200 bg-stone-50/60 hover:bg-white text-stone-700'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-stone-700 hover:text-stone-900 focus:outline-none"
                  aria-label="Toggle check"
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-stone-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-stone-950 font-semibold' : 'text-stone-800'}`}>
                      {lang === 'bn' ? item.labelBn : item.labelEn}
                    </span>
                    {item.critical && (
                      <span className="text-[10px] font-mono text-rose-700 font-semibold uppercase">
                        {lang === 'bn' ? '[বাধ্যতামূলক]' : '[Critical]'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-normal">
                    {lang === 'bn' ? item.hintBn : item.hintEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Score & Verdict Card (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-stone-800" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold">
              {lang === 'bn' ? 'প্রস্তুতির সার্বিক স্কোর' : 'Readiness Score'}
            </h3>
          </div>

          <div className="text-4xl font-mono font-bold tracking-tight text-stone-900 tabular-nums">
            {score}%
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                score >= 80 ? 'bg-emerald-600' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-2">
            <div className="font-semibold text-stone-900">
              {score === 100 
                ? (lang === 'bn' ? 'উৎপাদনের জন্য ১০০% প্রস্তুত!' : 'Production Certified')
                : score >= 60 
                ? (lang === 'bn' ? 'কার্যকরী, কিন্তু ঝুঁকি এড়াতে সব পূরণ করুন।' : 'Viable with Minor Caveats')
                : (lang === 'bn' ? 'ঝুঁকিপূর্ণ: গুরুত্বপূর্ণ ধাপগুলো বাদ পড়েছে।' : 'Unprepared for Public Launch')}
            </div>
            <p className="leading-relaxed">
              {lang === 'bn'
                ? 'ব্লগার মোবাইল সেটিংস ও নেটলিফাই হেডার্স সঠিকভাবে সেট না করলে গ্রাহকদের কাছে অ্যাপটিতে সাদা স্ক্রিন বা এরর দেখাতে পারে।'
                : 'Failing to configure Netlify headers or Blogger mobile desktop mode will result in blank screen errors.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
