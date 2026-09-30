import React, { useState } from 'react';
import { TECHNICAL_RISKS } from '../data/reportData';
import { AlertTriangle, Check, Copy } from 'lucide-react';

interface RisksAndMitigationsProps {
  lang: 'bn' | 'en';
}

export const RisksAndMitigations: React.FC<RisksAndMitigationsProps> = ({ lang }) => {
  const [selectedRiskId, setSelectedRiskId] = useState<string>(TECHNICAL_RISKS[0].id);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const activeRisk = TECHNICAL_RISKS.find(r => r.id === selectedRiskId) || TECHNICAL_RISKS[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <section id="pitfalls" className="py-12 border-b border-stone-200">
      <div className="max-w-4xl mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-rose-700 mb-1">
          {lang === 'bn' ? 'গুরুত্বপূর্ণ কারিগরি সতর্কতা ও ঝুঁকি' : 'ENGINEERING RISKS & FAILURE MODES'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 font-editorial">
          {lang === 'bn' 
            ? '৫টি মারাত্মক গোপন ঝুঁকি ও সুনির্দিষ্ট প্রতিরোধমূলক সমাধান' 
            : '5 Hidden Architectural Pitfalls & Production Mitigations'}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
          {lang === 'bn'
            ? 'সাধারণ আইফ্রেম স্নিপেট ব্যবহার করলে যে ৫টি বড় সমস্যায় পড়বেন, তার বিস্তারিত বিশ্লেষণ এবং প্রফেশনাল সমাধান নিচে দেওয়া হলো:'
            : 'Embedding a bare iframe without security, viewport, and crawling considerations triggers structural vulnerabilities. Review the analysis and hardened remedies below:'}
        </p>
      </div>

      {/* Risk Selection Rail & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left selector menu (5 columns) */}
        <div className="lg:col-span-5 space-y-2">
          {TECHNICAL_RISKS.map((risk) => {
            const isSelected = risk.id === selectedRiskId;
            return (
              <button
                key={risk.id}
                onClick={() => setSelectedRiskId(risk.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all text-xs sm:text-sm ${
                  isSelected
                    ? 'border-stone-900 bg-white shadow-sm ring-1 ring-stone-900/10'
                    : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                  <span className={
                    risk.severity === 'CRITICAL' ? 'text-rose-700 font-semibold' :
                    risk.severity === 'HIGH' ? 'text-amber-700 font-semibold' : 'text-stone-600'
                  }>
                    {risk.severity} RISK
                  </span>
                  <span className="text-stone-400">§ {risk.id}</span>
                </div>
                <div className={`font-semibold ${isSelected ? 'text-stone-950' : 'text-stone-800'}`}>
                  {lang === 'bn' ? risk.titleBn : risk.titleEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right deep analysis panel (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${
                  activeRisk.severity === 'CRITICAL' ? 'text-rose-600' :
                  activeRisk.severity === 'HIGH' ? 'text-amber-600' : 'text-stone-600'
                }`} />
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  {lang === 'bn' ? 'ঝুঁকি বিশ্লেষণ কার্ড' : 'Vulnerability Deep-Dive'}
                </span>
              </div>
              <span className="text-xs font-mono text-stone-400">
                Level: {activeRisk.severity}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-stone-900 mb-3">
              {lang === 'bn' ? activeRisk.titleBn : activeRisk.titleEn}
            </h3>

            {/* Description */}
            <div className="mb-4">
              <div className="text-xs font-mono text-stone-500 uppercase mb-1">
                {lang === 'bn' ? 'সমস্যার উৎস (ROOT CAUSE)' : 'ROOT CAUSE'}
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {lang === 'bn' ? activeRisk.descriptionBn : activeRisk.descriptionEn}
              </p>
            </div>

            {/* Technical Impact */}
            <div className="mb-4 p-3 bg-rose-50/60 border-l-2 border-rose-600 rounded-r text-xs sm:text-sm text-rose-900 leading-relaxed">
              <strong className="block font-mono text-xs text-rose-800 uppercase mb-0.5">
                {lang === 'bn' ? 'প্রযুক্তিগত ক্ষতি ও ফলাফল:' : 'TECHNICAL IMPACT:'}
              </strong>
              {lang === 'bn' ? activeRisk.technicalImpactBn : activeRisk.technicalImpactEn}
            </div>

            {/* Remediation */}
            <div className="mb-4">
              <div className="text-xs font-mono text-emerald-700 uppercase mb-1 font-semibold">
                {lang === 'bn' ? 'প্রতিরোধমূলক সমাধান (RECOMMENDED FIX)' : 'RECOMMENDED FIX'}
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-medium">
                {lang === 'bn' ? activeRisk.solutionBn : activeRisk.solutionEn}
              </p>
            </div>

            {/* Code Snippet if applicable */}
            {activeRisk.codeSnippet && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 bg-stone-900 text-stone-300 px-3 py-1.5 rounded-t-lg">
                  <span>{lang === 'bn' ? 'কোড সমাধান স্নিপেট' : 'Remediation Snippet'}</span>
                  <button
                    onClick={() => handleCopy(activeRisk.codeSnippet!, activeRisk.id)}
                    className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
                  >
                    {copiedSnippet === activeRisk.id ? (
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
                <pre className="p-3 bg-stone-950 text-stone-100 rounded-b-lg text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800 border-t-0">
                  <code>{activeRisk.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
