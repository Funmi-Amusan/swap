"use client";

import { useState, useMemo } from 'react';

// --- TYPE DEFINITIONS ---
interface IPhonePrice {
  storage: number;
  price: number; // Base price in NGN
}

interface IPhone {
  name: string;
  series: number; // To group models for deduction logic (e.g., 11, 12, 13)
  prices: IPhonePrice[];
}

type Condition = 'Pristine' | 'Cracked' | 'Heavily Cracked';
type BodyCondition = 'Pristine' | 'Light Wear' | 'Heavy Wear';

// --- PRICING DATABASE ---
const iphoneDatabase: IPhone[] = [
  { name: 'iPhone X', series: 10, prices: [{ storage: 64, price: 120000 }, { storage: 256, price: 140000 }] },
  { name: 'iPhone XS', series: 10, prices: [{ storage: 64, price: 140000 }, { storage: 256, price: 160000 }] },
  { name: 'iPhone XS Max', series: 10, prices: [{ storage: 64, price: 170000 }, { storage: 256, price: 190000 }] },
  { name: 'iPhone 11', series: 11, prices: [{ storage: 64, price: 180000 }, { storage: 128, price: 200000 }] },
  { name: 'iPhone 11 Pro', series: 11, prices: [{ storage: 64, price: 240000 }, { storage: 256, price: 270000 }] },
  { name: 'iPhone 11 Pro Max', series: 11, prices: [{ storage: 64, price: 280000 }, { storage: 256, price: 310000 }] },
  { name: 'iPhone 12', series: 12, prices: [{ storage: 64, price: 290000 }, { storage: 128, price: 320000 }] },
  { name: 'iPhone 12 Pro', series: 12, prices: [{ storage: 128, price: 380000 }, { storage: 256, price: 410000 }] },
  { name: 'iPhone 12 Pro Max', series: 12, prices: [{ storage: 128, price: 450000 }, { storage: 256, price: 480000 }] },
  { name: 'iPhone 13', series: 13, prices: [{ storage: 128, price: 430000 }, { storage: 256, price: 460000 }] },
  { name: 'iPhone 13 Pro', series: 13, prices: [{ storage: 128, price: 550000 }, { storage: 256, price: 590000 }] },
  { name: 'iPhone 13 Pro Max', series: 13, prices: [{ storage: 128, price: 620000 }, { storage: 256, price: 660000 }] },
  { name: 'iPhone 14', series: 14, prices: [{ storage: 128, price: 600000 }, { storage: 256, price: 640000 }] },
  { name: 'iPhone 14 Pro', series: 14, prices: [{ storage: 128, price: 780000 }, { storage: 256, price: 830000 }] },
  { name: 'iPhone 14 Pro Max', series: 14, prices: [{ storage: 128, price: 850000 }, { storage: 256, price: 900000 }] },
  { name: 'iPhone 15', series: 15, prices: [{ storage: 128, price: 950000 }, { storage: 256, price: 1000000 }] },
  { name: 'iPhone 15 Pro', series: 15, prices: [{ storage: 256, price: 1200000 }, { storage: 512, price: 1300000 }] },
  { name: 'iPhone 15 Pro Max', series: 15, prices: [{ storage: 256, price: 1350000 }, { storage: 512, price: 1450000 }] },
  { name: 'iPhone 16', series: 16, prices: [{ storage: 256, price: 1500000 }, { storage: 512, price: 1600000 }] },
  { name: 'iPhone 16 Pro', series: 16, prices: [{ storage: 256, price: 1700000 }, { storage: 512, price: 1800000 }] },
  { name: 'iPhone 16 Pro Max', series: 16, prices: [{ storage: 256, price: 1900000 }, { storage: 512, price: 2000000 }] },
];

// --- DEDUCTION LOGIC ---
const DEDUCTIONS = {
  BATTERY_THRESHOLD: 85,
  BATTERY_FLAT_DEDUCTION: 25000,
  FACE_ID_FAULTY: {
    series_10_11: 40000,
    series_12_plus: 60000,
  },
  SCREEN: {
    'Cracked': 35000,
    'Heavily Cracked': 70000,
  },
  BACK_GLASS: {
    'Cracked': 30000,
    'Heavily Cracked': 60000,
  },
  BODY: {
    'Light Wear': 15000,
    'Heavy Wear': 30000,
  }
};

// --- HELPER FUNCTIONS ---
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
};

// --- COMPONENT ---
export function IPhoneCalculator() {
  const [selectedModelName, setSelectedModelName] = useState<string>(iphoneDatabase[0].name);
  const [selectedStorage, setSelectedStorage] = useState<number>(iphoneDatabase[0].prices[0].storage);
  const [batteryHealth, setBatteryHealth] = useState<number>(100);
  const [isFaceIdWorking, setIsFaceIdWorking] = useState<boolean>(true);
  const [screenCondition, setScreenCondition] = useState<Condition>('Pristine');
  const [backGlassCondition, setBackGlassCondition] = useState<Condition>('Pristine');
  const [bodyCondition, setBodyCondition] = useState<BodyCondition>('Pristine');

  const selectedModel = useMemo(() => {
    return iphoneDatabase.find(m => m.name === selectedModelName) || iphoneDatabase[0];
  }, [selectedModelName]);

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModelName = e.target.value;
    const newModel = iphoneDatabase.find(m => m.name === newModelName)!;
    setSelectedModelName(newModelName);
    // Reset storage to the first available for the new model
    setSelectedStorage(newModel.prices[0].storage);
  };

  const finalPrice = useMemo(() => {
    const modelPriceInfo = selectedModel.prices.find(p => p.storage === selectedStorage);
    if (!modelPriceInfo) return 0;

    let price = modelPriceInfo.price;
    let deductions = 0;

    // Battery Health Deduction
    if (batteryHealth < DEDUCTIONS.BATTERY_THRESHOLD) {
      deductions += DEDUCTIONS.BATTERY_FLAT_DEDUCTION;
    }

    // Face ID Deduction
    if (!isFaceIdWorking) {
      deductions += selectedModel.series <= 11 ? DEDUCTIONS.FACE_ID_FAULTY.series_10_11 : DEDUCTIONS.FACE_ID_FAULTY.series_12_plus;
    }

    // Screen Condition Deduction
    if (screenCondition !== 'Pristine') {
      deductions += DEDUCTIONS.SCREEN[screenCondition];
    }

    // Back Glass Deduction
    if (backGlassCondition !== 'Pristine') {
      deductions += DEDUCTIONS.BACK_GLASS[backGlassCondition];
    }
    
    // Body Condition Deduction
    if (bodyCondition !== 'Pristine') {
        deductions += DEDUCTIONS.BODY[bodyCondition];
    }

    return Math.max(0, price - deductions);
  }, [selectedModel, selectedStorage, batteryHealth, isFaceIdWorking, screenCondition, backGlassCondition, bodyCondition]);

  const renderSelect = (label: string, value: any, onChange: (e: any) => void, options: {value: any, label: string}[]) => (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <select value={value} onChange={onChange} className="bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition">
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-white font-sans">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">iPhone Trade-in Calculator</h1>
        <p className="text-gray-400 text-sm">Get an instant estimate for your device.</p>
      </div>

      <div className="space-y-5">
        {/* Model and Storage */}
        {renderSelect("iPhone Model", selectedModelName, handleModelChange, iphoneDatabase.map(m => ({ value: m.name, label: m.name })))}
        {renderSelect("Storage", selectedStorage, (e) => setSelectedStorage(Number(e.target.value)), selectedModel.prices.map(p => ({ value: p.storage, label: `${p.storage} GB` })))}

        {/* Battery Health */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="battery" className="text-sm font-medium text-gray-300">Battery Health: <span className="font-bold text-purple-400">{batteryHealth}%</span></label>
          <input id="battery" type="range" min="70" max="100" value={batteryHealth} onChange={(e) => setBatteryHealth(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>

        {/* Condition Toggles */}
        {renderSelect("Face ID / Touch ID", String(isFaceIdWorking), (e) => setIsFaceIdWorking(e.target.value === 'true'), [{value: 'true', label: 'Working'}, {value: 'false', label: 'Faulty'}])}
        {renderSelect("Screen Condition", screenCondition, (e) => setScreenCondition(e.target.value), [{value: 'Pristine', label: 'Pristine'}, {value: 'Cracked', label: 'Cracked'}, {value: 'Heavily Cracked', label: 'Heavily Cracked'}])}
        {renderSelect("Back Glass Condition", backGlassCondition, (e) => setBackGlassCondition(e.target.value), [{value: 'Pristine', label: 'Pristine'}, {value: 'Cracked', label: 'Cracked'}, {value: 'Heavily Cracked', label: 'Heavily Cracked'}])}
        {renderSelect("Body Condition", bodyCondition, (e) => setBodyCondition(e.target.value), [{value: 'Pristine', label: 'Pristine'}, {value: 'Light Wear', label: 'Light Wear'}, {value: 'Heavy Wear', label: 'Heavy Wear'}])}
      </div>

      {/* Price Display */}
      <div className="mt-8 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400">Estimated Trade-in Value</p>
        <p className="text-4xl font-bold text-purple-400 tracking-tight transition-all duration-300">
          {formatPrice(finalPrice)}
        </p>
      </div>
    </div>
  );
}
