import React, { useState } from 'react';
import { Copy, Check, Sparkles, Delete, RotateCcw } from 'lucide-react';

interface InteractiveCalculatorProps {
  lang: 'bn' | 'en';
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({ lang }) => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [shouldReset, setShouldReset] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNumber = (n: string) => {
    if (shouldReset) {
      setDisplay(n === '.' ? '0.' : n);
      setShouldReset(false);
    } else {
      if (n === '.' && display.includes('.')) return;
      if (display === '0' && n !== '.') {
        setDisplay(n);
      } else {
        setDisplay(display + n);
      }
    }
  };

  const handleOperator = (op: string) => {
    if (operator && !shouldReset) {
      handleEquals();
    }
    setPrevValue(display);
    setOperator(op);
    const symbol = op === '*' ? '×' : op === '/' ? '÷' : op === '-' ? '−' : '+';
    setHistory(`${display} ${symbol}`);
    setShouldReset(true);
  };

  const handleEquals = () => {
    if (!operator || prevValue === null) return;
    const a = parseFloat(prevValue);
    const b = parseFloat(display);
    let res = 0;

    switch (operator) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': 
        if (b === 0) {
          setDisplay('Error');
          setHistory('');
          setOperator(null);
          setPrevValue(null);
          return;
        }
        res = a / b; 
        break;
      case '^': res = Math.pow(a, b); break;
      default: return;
    }

    res = Math.round(res * 1000000000) / 1000000000;
    const symbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
    setHistory(`${prevValue} ${symbol} ${display} =`);
    setDisplay(res.toString());
    setOperator(null);
    setPrevValue(null);
    setShouldReset(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setHistory('');
    setOperator(null);
    setPrevValue(null);
    setShouldReset(false);
  };

  const handleDelete = () => {
    if (display.length > 1 && display !== 'Error') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleSci = (func: string) => {
    const val = parseFloat(display);
    let res = 0;
    switch (func) {
      case 'sin': res = Math.sin(val * Math.PI / 180); break;
      case 'cos': res = Math.cos(val * Math.PI / 180); break;
      case 'tan': res = Math.tan(val * Math.PI / 180); break;
      case 'sqrt':
        if (val < 0) { setDisplay('Error'); return; }
        res = Math.sqrt(val);
        break;
      case 'sqr': res = val * val; break;
      case 'pi': setDisplay(Math.PI.toFixed(6)); return;
      case 'log':
        if (val <= 0) { setDisplay('Error'); return; }
        res = Math.log10(val);
        break;
      default: return;
    }
    res = Math.round(res * 100000000) / 100000000;
    setHistory(`${func}(${display}) =`);
    setDisplay(res.toString());
    setShouldReset(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-white shadow-2xl max-w-sm mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-stone-300">
            {lang === 'bn' ? 'স্মার্ট ক্যালকুলেটর ইঞ্জিন' : 'Smart Calculator Engine'}
          </span>
        </div>
        <button
          onClick={() => setIsScientific(!isScientific)}
          className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-300 font-medium transition-colors"
        >
          {isScientific ? (lang === 'bn' ? 'সাধারণ মোড' : 'Basic') : (lang === 'bn' ? 'বৈজ্ঞানিক মোড' : 'Scientific')}
        </button>
      </div>

      {/* Screen Display */}
      <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-3.5 mb-4 relative flex flex-col items-end justify-end min-h-[90px]">
        <button
          onClick={handleCopy}
          className="absolute top-2 left-2 text-[10px] font-mono text-stone-400 hover:text-white bg-stone-800/60 hover:bg-stone-800 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
          title="কপি করুন"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span>{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>{lang === 'bn' ? 'কপি' : 'Copy'}</span>
            </>
          )}
        </button>

        <div className="text-xs font-mono text-stone-400 min-h-[18px] mb-1">
          {history}
        </div>
        <div className="text-3xl font-mono font-bold tracking-tight text-white overflow-x-auto max-w-full">
          {display}
        </div>
      </div>

      {/* Scientific Row (if open) */}
      {isScientific && (
        <div className="grid grid-cols-4 gap-2 mb-3 pb-3 border-b border-stone-800/80 animate-fadeIn">
          <button onClick={() => handleSci('sin')} className="h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-300">sin</button>
          <button onClick={() => handleSci('cos')} className="h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-300">cos</button>
          <button onClick={() => handleSci('tan')} className="h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-300">tan</button>
          <button onClick={() => handleSci('pi')} className="h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-amber-400">π</button>
          <button onClick={() => handleSci('sqrt')} className="h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-300">√x</button>
          <button onClick={() => handleSci('sqr')} className="h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-300">x²</button>
          <button onClick={() => handleOperator('^')} className="h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-300">x^y</button>
          <button onClick={() => handleSci('log')} className="h-9 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-300">log</button>
        </div>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="h-12 rounded-xl bg-stone-800 hover:bg-stone-700 text-rose-400 font-semibold text-sm active:scale-95 transition-transform">AC</button>
        <button onClick={handleDelete} className="h-12 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-sm flex items-center justify-center active:scale-95 transition-transform">
          <Delete className="w-4 h-4" />
        </button>
        <button onClick={() => { setDisplay((parseFloat(display) / 100).toString()); setShouldReset(true); }} className="h-12 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-sm active:scale-95 transition-transform">%</button>
        <button onClick={() => handleOperator('/')} className="h-12 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg active:scale-95 transition-transform">÷</button>

        <button onClick={() => handleNumber('7')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">7</button>
        <button onClick={() => handleNumber('8')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">8</button>
        <button onClick={() => handleNumber('9')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">9</button>
        <button onClick={() => handleOperator('*')} className="h-12 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg active:scale-95 transition-transform">×</button>

        <button onClick={() => handleNumber('4')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">4</button>
        <button onClick={() => handleNumber('5')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">5</button>
        <button onClick={() => handleNumber('6')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">6</button>
        <button onClick={() => handleOperator('-')} className="h-12 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg active:scale-95 transition-transform">−</button>

        <button onClick={() => handleNumber('1')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">1</button>
        <button onClick={() => handleNumber('2')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">2</button>
        <button onClick={() => handleNumber('3')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">3</button>
        <button onClick={() => handleOperator('+')} className="h-12 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg active:scale-95 transition-transform">+</button>

        <button onClick={() => { if (display !== '0') setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display); }} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 font-semibold text-sm active:scale-95 transition-transform">±</button>
        <button onClick={() => handleNumber('0')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">0</button>
        <button onClick={() => handleNumber('.')} className="h-12 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-base active:scale-95 transition-transform">.</button>
        <button onClick={handleEquals} className="h-12 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xl active:scale-95 transition-transform">=</button>
      </div>
    </div>
  );
};
