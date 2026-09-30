import React, { useState, useEffect } from 'react';
import { Delete, Copy, Check } from 'lucide-react';
import { playKeyClick } from './utils/sound';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [shouldReset, setShouldReset] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNumber = (digit: string) => {
    playKeyClick('num');
    if (shouldReset) {
      setDisplay(digit === '.' ? '0.' : digit);
      setShouldReset(false);
    } else {
      if (digit === '.' && display.includes('.')) return;
      if (display === '0' && digit !== '.') {
        setDisplay(digit);
      } else {
        setDisplay(display + digit);
      }
    }
  };

  const handleOperator = (op: string) => {
    playKeyClick('op');
    if (operator && !shouldReset) {
      calculate();
    }
    setPrevValue(display);
    setOperator(op);
    const symbol = op === '*' ? '×' : op === '/' ? '÷' : op === '-' ? '−' : '+';
    setExpression(`${display} ${symbol}`);
    setShouldReset(true);
  };

  const calculate = () => {
    if (!operator || prevValue === null) return;
    playKeyClick('equals');
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
          setExpression('');
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
    setExpression(`${prevValue} ${symbol} ${display} =`);
    setDisplay(res.toString());
    setOperator(null);
    setPrevValue(null);
    setShouldReset(true);
  };

  const handleClear = () => {
    playKeyClick('clear');
    setDisplay('0');
    setExpression('');
    setOperator(null);
    setPrevValue(null);
    setShouldReset(false);
  };

  const handleDelete = () => {
    playKeyClick('clear');
    if (display.length > 1 && display !== 'Error') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleSci = (func: string) => {
    playKeyClick('op');
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
      case 'pi': setDisplay(Math.PI.toFixed(8)); return;
      case 'log':
        if (val <= 0) { setDisplay('Error'); return; }
        res = Math.log10(val);
        break;
      default: return;
    }
    res = Math.round(res * 100000000) / 100000000;
    setExpression(`${func}(${display}) =`);
    setDisplay(res.toString());
    setShouldReset(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        handleNumber(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [display, operator, prevValue, shouldReset]);

  return (
    <div className="w-full h-screen h-[100dvh] bg-[#090d16] flex items-center justify-center p-3 sm:p-4 overflow-hidden select-none">
      
      {/* Pure Calculator Card */}
      <div className="w-full max-w-[380px] bg-[#111827] border border-white/10 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs text-stone-400">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            <span className="text-stone-300">ক্যালকুলেটর</span>
          </div>
          <button
            onClick={() => setIsScientific(!isScientific)}
            className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] font-medium transition-colors"
          >
            {isScientific ? 'সাধারণ মোড' : 'বৈজ্ঞানিক মোড ▾'}
          </button>
        </div>

        {/* Display Screen */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 relative flex flex-col items-end justify-end min-h-[95px] shadow-inner">
          <button
            onClick={handleCopy}
            className="absolute top-2.5 left-2.5 text-[11px] font-mono text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
            title="ফলাফল কপি করুন"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>কপি হয়েছে</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>কপি</span>
              </>
            )}
          </button>

          <div className="text-xs font-mono text-stone-500 min-h-[16px] mb-1">
            {expression}
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white overflow-x-auto max-w-full tabular-nums">
            {display}
          </div>
        </div>

        {/* Scientific Keys (Collapsible) */}
        {isScientific && (
          <div className="grid grid-cols-4 gap-1.5 pt-1 animate-fadeIn">
            <button onClick={() => handleSci('sin')} className="h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-mono text-stone-300 active:scale-95 transition-transform">sin</button>
            <button onClick={() => handleSci('cos')} className="h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-mono text-stone-300 active:scale-95 transition-transform">cos</button>
            <button onClick={() => handleSci('tan')} className="h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-mono text-stone-300 active:scale-95 transition-transform">tan</button>
            <button onClick={() => handleSci('pi')} className="h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-mono text-amber-400 active:scale-95 transition-transform">π</button>
            <button onClick={() => handleSci('sqrt')} className="h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-mono text-stone-300 active:scale-95 transition-transform">√x</button>
            <button onClick={() => handleSci('sqr')} className="h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-mono text-stone-300 active:scale-95 transition-transform">x²</button>
            <button onClick={() => handleOperator('^')} className="h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-mono text-stone-300 active:scale-95 transition-transform">x^y</button>
            <button onClick={() => handleSci('log')} className="h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-mono text-stone-300 active:scale-95 transition-transform">log</button>
          </div>
        )}

        {/* Standard Keypad */}
        <div className="grid grid-cols-4 gap-2">
          <button onClick={handleClear} className="h-12 sm:h-13 rounded-2xl bg-stone-800 hover:bg-stone-700 text-rose-400 font-semibold text-sm active:scale-95 transition-transform">AC</button>
          <button onClick={handleDelete} className="h-12 sm:h-13 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-sm flex items-center justify-center active:scale-95 transition-transform">
            <Delete className="w-4 h-4" />
          </button>
          <button onClick={() => { playKeyClick('op'); setDisplay((parseFloat(display) / 100).toString()); setShouldReset(true); }} className="h-12 sm:h-13 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-sm active:scale-95 transition-transform">%</button>
          <button onClick={() => handleOperator('/')} className="h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xl active:scale-95 transition-transform shadow-md">÷</button>

          <button onClick={() => handleNumber('7')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">7</button>
          <button onClick={() => handleNumber('8')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">8</button>
          <button onClick={() => handleNumber('9')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">9</button>
          <button onClick={() => handleOperator('*')} className="h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xl active:scale-95 transition-transform shadow-md">×</button>

          <button onClick={() => handleNumber('4')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">4</button>
          <button onClick={() => handleNumber('5')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">5</button>
          <button onClick={() => handleNumber('6')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">6</button>
          <button onClick={() => handleOperator('-')} className="h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xl active:scale-95 transition-transform shadow-md">−</button>

          <button onClick={() => handleNumber('1')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">1</button>
          <button onClick={() => handleNumber('2')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">2</button>
          <button onClick={() => handleNumber('3')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">3</button>
          <button onClick={() => handleOperator('+')} className="h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xl active:scale-95 transition-transform shadow-md">+</button>

          <button onClick={() => { playKeyClick('op'); if (display !== '0') setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display); }} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 font-semibold text-sm active:scale-95 transition-transform">±</button>
          <button onClick={() => handleNumber('0')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">0</button>
          <button onClick={() => handleNumber('.')} className="h-12 sm:h-13 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-white font-mono text-lg font-medium active:scale-95 transition-transform">.</button>
          <button onClick={calculate} className="h-12 sm:h-13 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-2xl active:scale-95 transition-transform shadow-md">=</button>
        </div>

      </div>

    </div>
  );
}
