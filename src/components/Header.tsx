import React from 'react';
import { FileText, Printer, CheckCircle2, Globe } from 'lucide-react';

interface HeaderProps {
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  onPrint: () => void;
  onExportMarkdown: () => void;
  copiedMarkdown: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  onPrint,
  onExportMarkdown,
  copiedMarkdown
}) => {
  return (
    <header className="no-print border-b border-stone-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#summary" className="text-base sm:text-lg font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors">
          {lang === 'bn' ? 'আর্কিটেকচার অডিট বোর্ড' : 'Architecture Review Board'}
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a href="#manual-testing" className="hover:text-stone-900 transition-colors text-amber-700 font-semibold">
            {lang === 'bn' ? 'টেস্ট ক্যালকুলেটর ও গাইড' : 'Live Test Lab'}
          </a>
          <a href="#summary" className="hover:text-stone-900 transition-colors">
            {lang === 'bn' ? 'সারসংক্ষেপ' : 'Summary'}
          </a>
          <a href="#architecture" className="hover:text-stone-900 transition-colors">
            {lang === 'bn' ? 'আর্কিটেকচার ফ্লো' : 'Architecture'}
          </a>
          <a href="#pitfalls" className="hover:text-stone-900 transition-colors">
            {lang === 'bn' ? '৫টি লুকানো ঝুঁকি' : 'Critical Pitfalls'}
          </a>
          <a href="#xml-generator" className="hover:text-stone-900 transition-colors">
            {lang === 'bn' ? 'উন্নত XML কোড' : 'XML Generator'}
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap"
            title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          <button
            onClick={onExportMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 border border-stone-300 hover:bg-stone-50 rounded-md transition-colors whitespace-nowrap"
          >
            {copiedMarkdown ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">{lang === 'bn' ? 'মার্কডাউন রিপোর্ট' : 'Copy Report'}</span>
                <span className="sm:hidden">{lang === 'bn' ? 'রিপোর্ট' : 'Copy'}</span>
              </>
            )}
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'প্রিন্ট / PDF' : 'Print PDF'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
