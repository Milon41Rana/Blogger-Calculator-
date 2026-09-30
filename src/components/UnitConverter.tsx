import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

interface UnitConverterProps {
  lang: 'bn' | 'en';
}

type ConverterCategory = 'length' | 'weight' | 'temp';

export const UnitConverter: React.FC<UnitConverterProps> = ({ lang }) => {
  const [category, setCategory] = useState<ConverterCategory>('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('feet');

  const convert = (): string => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '0';

    if (category === 'length') {
      // Base: meter
      let inMeters = val;
      if (fromUnit === 'km') inMeters = val * 1000;
      else if (fromUnit === 'cm') inMeters = val / 100;
      else if (fromUnit === 'feet') inMeters = val * 0.3048;
      else if (fromUnit === 'inch') inMeters = val * 0.0254;

      if (toUnit === 'meter') return inMeters.toFixed(4);
      if (toUnit === 'km') return (inMeters / 1000).toFixed(6);
      if (toUnit === 'cm') return (inMeters * 100).toFixed(2);
      if (toUnit === 'feet') return (inMeters / 0.3048).toFixed(4);
      if (toUnit === 'inch') return (inMeters / 0.0254).toFixed(4);
    } else if (category === 'weight') {
      // Base: kg
      let inKg = val;
      if (fromUnit === 'gram') inKg = val / 1000;
      else if (fromUnit === 'pound') inKg = val * 0.453592;
      else if (fromUnit === 'ounce') inKg = val * 0.0283495;

      if (toUnit === 'kg') return inKg.toFixed(4);
      if (toUnit === 'gram') return (inKg * 1000).toFixed(2);
      if (toUnit === 'pound') return (inKg / 0.453592).toFixed(4);
      if (toUnit === 'ounce') return (inKg / 0.0283495).toFixed(4);
    } else if (category === 'temp') {
      if (fromUnit === toUnit) return val.toString();
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return ((val * 9/5) + 32).toFixed(2);
      if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return (((val - 32) * 5/9)).toFixed(2);
      if (fromUnit === 'celsius' && toUnit === 'kelvin') return (val + 273.15).toFixed(2);
      if (fromUnit === 'kelvin' && toUnit === 'celsius') return (val - 273.15).toFixed(2);
    }
    return '0';
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-stone-100 max-w-sm mx-auto shadow-2xl">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
        <span className="text-xs font-semibold text-stone-300 font-mono uppercase">
          {lang === 'bn' ? 'একক রূপান্তরকারী (Unit Converter)' : 'Unit Converter'}
        </span>
        <div className="flex gap-1 bg-stone-950 p-1 rounded-lg">
          <button
            onClick={() => { setCategory('length'); setFromUnit('meter'); setToUnit('feet'); }}
            className={`px-2 py-1 text-[11px] rounded transition-colors ${
              category === 'length' ? 'bg-stone-800 text-white font-medium' : 'text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'bn' ? 'দৈর্ঘ্য' : 'Length'}
          </button>
          <button
            onClick={() => { setCategory('weight'); setFromUnit('kg'); setToUnit('pound'); }}
            className={`px-2 py-1 text-[11px] rounded transition-colors ${
              category === 'weight' ? 'bg-stone-800 text-white font-medium' : 'text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'bn' ? 'ওজন' : 'Weight'}
          </button>
          <button
            onClick={() => { setCategory('temp'); setFromUnit('celsius'); setToUnit('fahrenheit'); }}
            className={`px-2 py-1 text-[11px] rounded transition-colors ${
              category === 'temp' ? 'bg-stone-800 text-white font-medium' : 'text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'bn' ? 'তাপমাত্রা' : 'Temp'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Input */}
        <div>
          <label className="block text-xs font-mono text-stone-400 mb-1">
            {lang === 'bn' ? 'প্রারম্ভিক মান (From):' : 'Input Value:'}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono text-lg focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="bg-stone-800 border border-stone-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
            >
              {category === 'length' && (
                <>
                  <option value="meter">মিটার (m)</option>
                  <option value="km">কিলোমিটার (km)</option>
                  <option value="cm">সেন্টিমিটার (cm)</option>
                  <option value="feet">ফুট (ft)</option>
                  <option value="inch">ইঞ্চি (in)</option>
                </>
              )}
              {category === 'weight' && (
                <>
                  <option value="kg">কিলোগ্রাম (kg)</option>
                  <option value="gram">গ্রাম (g)</option>
                  <option value="pound">পাউন্ড (lb)</option>
                  <option value="ounce">আউন্স (oz)</option>
                </>
              )}
              {category === 'temp' && (
                <>
                  <option value="celsius">সেলসিয়াস (°C)</option>
                  <option value="fahrenheit">ফারেনহাইট (°F)</option>
                  <option value="kelvin">কেলভিন (K)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Divider icon */}
        <div className="flex justify-center">
          <div className="p-2 rounded-full bg-stone-800 text-stone-400">
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Output */}
        <div>
          <label className="block text-xs font-mono text-stone-400 mb-1">
            {lang === 'bn' ? 'রূপান্তরিত মান (To):' : 'Converted Value:'}
          </label>
          <div className="flex gap-2">
            <div className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-emerald-400 font-mono text-2xl font-bold flex items-center">
              {convert()}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="bg-stone-800 border border-stone-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
            >
              {category === 'length' && (
                <>
                  <option value="meter">মিটার (m)</option>
                  <option value="km">কিলোমিটার (km)</option>
                  <option value="cm">সেন্টিমিটার (cm)</option>
                  <option value="feet">ফুট (ft)</option>
                  <option value="inch">ইঞ্চি (in)</option>
                </>
              )}
              {category === 'weight' && (
                <>
                  <option value="kg">কিলোগ্রাম (kg)</option>
                  <option value="gram">গ্রাম (g)</option>
                  <option value="pound">পাউন্ড (lb)</option>
                  <option value="ounce">আউন্স (oz)</option>
                </>
              )}
              {category === 'temp' && (
                <>
                  <option value="celsius">সেলসিয়াস (°C)</option>
                  <option value="fahrenheit">ফারেনহাইট (°F)</option>
                  <option value="kelvin">কেলভিন (K)</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
