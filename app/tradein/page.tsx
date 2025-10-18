"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { IPhoneCalculator, TradeInFormData } from '../../components/iphone-calculator';
import PhoneModelSelector from '../../components/PhoneModelSelector';
import PhoneConditionSelector from '../../components/PhoneConditionSelector';
import { NewPhoneSelector, NewPhoneFormData } from '../../components/NewPhoneSelector';
import CalendlyWidget from '../../components/CalendlyWidget';

const pricingData: any = {
    'x-64': { base: 150000, series: 'x' },
    'x-256': { base: 170000, series: 'x' },
    'xs-64': { base: 180000, series: 'x' },
    'xs-256': { base: 200000, series: 'x' },
    'xr-64': { base: 170000, series: 'x' },
    'xr-128': { base: 200000, series: 'x' },
    'xsmax-64': { base: 220000, series: 'xsmax' },
    'xsmax-256': { base: 250000, series: 'xsmax' },
    '11-64': { base: 240000, series: '11' },
    '11-128': { base: 270000, series: '11' },
    '11pro-64': { base: 300000, series: '11' },
    '11pro-256': { base: 330000, series: '11' },
    '11promax-64': { base: 340000, series: '11promax' },
    '11promax-256': { base: 370000, series: '11promax' },
    '12-64': { base: 270000, series: '12' },
    '12-128': { base: 310000, series: '12' },
    '12pro-128': { base: 370000, series: '12' },
    '12pro-256': { base: 400000, series: '12' },
    '12promax-128': { base: 470000, series: '12promax' },
    '12promax-256': { base: 500000, series: '12promax' },
    '13-128': { base: 400000, series: '13' },
    '13-256': { base: 440000, series: '13' },
    '13mini-128': { base: 350000, series: '13' },
    '13mini-256': { base: 380000, series: '13' },
    '13pro-128': { base: 500000, series: '13pro' },
    '13pro-256': { base: 560000, series: '13pro' },
    '13promax-128': { base: 600000, series: '13pro' },
    '13promax-256': { base: 650000, series: '13pro' },
    '14-128': { base: 500000, series: '14' },
    '14-256': { base: 550000, series: '14' },
    '14pro-128': { base: 700000, series: '14' },
    '14pro-256': { base: 750000, series: '14' },
    '14promax-128': { base: 780000, series: '14promax' },
    '14promax-256': { base: 820000, series: '14promax' },
    '14promax-512': { base: 850000, series: '14promax' },
    '15-128': { base: 750000, series: '14promax' },
    '15-256': { base: 790000, series: '14promax' },
    '15pro-128': { base: 900000, series: '15pro' },
    '15pro-256': { base: 930000, series: '15pro' },
    '15pro-512': { base: 980000, series: '15pro' },
    '15promax-256': { base: 1000000, series: '15pro' },
    '15promax-512': { base: 1050000, series: '15pro' },
    '16-128': { base: 950000, series: '16' },
    '16-256': { base: 1000000, series: '16' },
    '16-512': { base: 1050000, series: '16' }
  };

  const deductionRules:any = {
    'x': {
      battery: { '90+': 0, '84-90': 5000, '79-84': 10000, '78-': 20000, 'changed': 30000 },
      faceid: { 'working': 0, 'not-working': 50000 },
      backglass: { 'mint': 0, 'minor': 5000, 'broken': 15000 },
      screen: { 'mint': 0, 'changed': 20000, 'cracked': 35000 },
      body: { 'mint': 0, 'minor': 10000, 'dents': 15000 }
    },
    'xsmax': {
      battery: { '90+': 0, '84-90': 5000, '79-84': 10000, '78-': 20000, 'changed': 20000 },
      faceid: { 'working': 0, 'not-working': 60000 },
      backglass: { 'mint': 0, 'minor': 10000, 'broken': 15000 },
      screen: { 'mint': 0, 'changed': 30000, 'cracked': 50000 },
      body: { 'mint': 0, 'minor': 10000, 'dents': 20000 }
    },
    '11': {
      battery: { '90+': 0, '84-90': 5000, '79-84': 10000, '78-': 20000, 'changed': 30000 },
      faceid: { 'working': 0, 'not-working': 50000 },
      backglass: { 'mint': 0, 'minor': 5000, 'broken': 15000 },
      screen: { 'mint': 0, 'changed': 30000, 'cracked': 40000 },
      body: { 'mint': 0, 'minor': 10000, 'dents': 15000 }
    },
    '11promax': {
      battery: { '90+': 0, '84-90': 5000, '79-84': 10000, '78-': 25000, 'changed': 20000 },
      faceid: { 'working': 0, 'not-working': 75000 },
      backglass: { 'mint': 0, 'minor': 10000, 'broken': 15000 },
      screen: { 'mint': 0, 'changed': 30000, 'cracked': 50000 },
      body: { 'mint': 0, 'minor': 10000, 'dents': 20000 }
    },
    '12': {
      battery: { '90+': 0, '84-90': 5000, '79-84': 10000, '78-': 25000, 'changed': 30000 },
      faceid: { 'working': 0, 'not-working': 80000 },
      backglass: { 'mint': 0, 'minor': 10000, 'broken': 15000 },
      screen: { 'mint': 0, 'changed': 30000, 'cracked': 50000 },
      body: { 'mint': 0, 'minor': 10000, 'dents': 20000 }
    },
    '12promax': {
      battery: { '90+': 0, '84-90': 5000, '79-84': 10000, '78-': 25000, 'changed': 40000 },
      faceid: { 'working': 0, 'not-working': 100000 },
      backglass: { 'mint': 0, 'minor': 10000, 'broken': 20000 },
      screen: { 'mint': 0, 'changed': 40000, 'cracked': 80000 },
      body: { 'mint': 0, 'minor': 15000, 'dents': 25000 }
    },
    '13': {
      battery: { '90+': 0, '84-90': 5000, '79-84': 10000, '78-': 25000, 'changed': 30000 },
      faceid: { 'working': 0, 'not-working': 80000 },
      backglass: { 'mint': 0, 'minor': 10000, 'broken': 20000 },
      screen: { 'mint': 0, 'changed': 30000, 'cracked': 50000 },
      body: { 'mint': 0, 'minor': 10000, 'dents': 20000 }
    },
    '13pro': {
      battery: { '90+': 0, '84-90': 10000, '79-84': 20000, '78-': 30000, 'changed': 30000 },
      faceid: { 'working': 0, 'not-working': 100000 },
      backglass: { 'mint': 0, 'minor': 20000, 'broken': 30000 },
      screen: { 'mint': 0, 'changed': 100000, 'cracked': 150000 },
      body: { 'mint': 0, 'minor': 15000, 'dents': 25000 }
    },
    '14': {
      battery: { '90+': 0, '84-90': 10000, '79-84': 20000, '78-': 40000, 'changed': 30000 },
      faceid: { 'working': 0, 'not-working': 150000 },
      backglass: { 'mint': 0, 'minor': 15000, 'broken': 30000 },
      screen: { 'mint': 0, 'changed': 100000, 'cracked': 130000 },
      body: { 'mint': 0, 'minor': 20000, 'dents': 30000 },
      sim: { 'physical': 0, 'Physical sim plus eSIM ': 50000 }
    },
    '14promax': {
      battery: { '90+': 0, '84-90': 10000, '79-84': 20000, '78-': 40000, 'changed': 30000 },
      faceid: { 'working': 0, 'not-working': 200000 },
      backglass: { 'mint': 0, 'minor': 15000, 'broken': 30000 },
      screen: { 'mint': 0, 'changed': 140000, 'cracked': 180000 },
      body: { 'mint': 0, 'minor': 30000, 'dents': 40000 },
      sim: { 'physical': 0, 'Physical sim plus eSIM ': 50000 }
    },
    '15pro': {
      battery: { '90+': 0, '84-90': 15000, '79-84': 30000, '78-': 50000, 'changed': 40000 },
      faceid: { 'working': 0, 'not-working': 200000 },
      backglass: { 'mint': 0, 'minor': 15000, 'broken': 30000 },
      screen: { 'mint': 0, 'changed': 200000, 'cracked': 250000 },
      body: { 'mint': 0, 'minor': 30000, 'dents': 40000 },
      sim: { 'physical': 0, 'Physical sim plus eSIM ': 100000 }
    },
    '16': {
      battery: { '90+': 0, '84-90': 15000, '79-84': 30000, '78-': 50000, 'changed': 40000 },
      faceid: { 'working': 0, 'not-working': 200000 },
      backglass: { 'mint': 0, 'minor': 15000, 'broken': 30000 },
      screen: { 'mint': 0, 'changed': 200000, 'cracked': 250000 },
      body: { 'mint': 0, 'minor': 30000, 'dents': 40000 },
      sim: { 'physical': 0, 'Physical sim plus eSIM ': 100000 }
    }
  };

const newPhoneDatabase: any = {
    "Used Premium Grade A": {
        "iPhone X": { "64GB": 135000, "256GB": 155000 },
        "iPhone XS": { "64GB": 160000, "256GB": 180000 },
        "iPhone XR": { "64GB": 155000, "128GB": 180000 },
        "iPhone XS Max": { "64GB": 200000, "256GB": 225000 },
        "iPhone 11": { "64GB": 210000, "128GB": 240000 },
        "iPhone 11 Pro": { "64GB": 270000, "256GB": 300000 },
        "iPhone 11 Pro Max": { "64GB": 310000, "256GB": 340000 },
        "iPhone 12": { "64GB": 280000, "128GB": 320000 },
        "iPhone 12 Pro": { "128GB": 380000, "256GB": 410000 },
        "iPhone 12 Pro Max": { "128GB": 450000, "256GB": 480000 },
        "iPhone 13": { "128GB": 400000, "256GB": 440000 },
        "iPhone 13 Pro": { "128GB": 520000, "256GB": 560000 },
        "iPhone 13 Pro Max": { "128GB": 600000, "256GB": 640000 },
        "iPhone 14": { "128GB": 500000, "256GB": 540000 },
        "iPhone 14 Pro": { "128GB": 680000, "256GB": 720000 },
        "iPhone 14 Pro Max": { "128GB": 780000, "256GB": 820000, "512GB": 850000 },
    },
    "New (sealed never opened)": {
        "iPhone 13": { "128GB": 520000 },
        "iPhone 15": { "128GB": 850000, "256GB": 950000 },
        "iPhone 15 Plus": { "128GB": 950000, "256GB": 1050000 },
        "iPhone 15 Pro": { "128GB": 1100000, "256GB": 1200000 },
        "iPhone 15 Pro Max": { "256GB": 1350000, "512GB": 1500000 },
    },
    "New (opened but never used)": {
        "iPhone 15 Pro Max": { "256GB": 1250000 },
    }
};

export default function TradeInPage() {
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [tradeInFormData, setTradeInFormData] = useState<TradeInFormData>({
    model: '',
    battery: '',
    faceid: '',
    backglass: '',
    screen: '',
    body: '',
    sim: 'physical'
  });

  const [newPhoneFormData, setNewPhoneFormData] = useState<NewPhoneFormData>({
    category: 'Premium Used Grade A',
    model: '',
    storage: ''
  });

  const [email, setEmail] = useState('');
  const [swapMethod, setSwapMethod] = useState('');
  const [showCalendly, setShowCalendly] = useState(false);
  const [savedSwapId, setSavedSwapId] = useState<string>('');

  const router = useRouter();

  // ===== CALCULATIONS =====
  const tradeInPrice = useMemo(() => {
    const { model, battery, faceid, backglass, screen, body, sim } = tradeInFormData;
    
    if (!model || !battery || !faceid || !backglass || !screen || !body) {
      return 0;
    }

    const modelData:any = pricingData[model as keyof typeof pricingData];
    if (!modelData) return 0;

    const rules = deductionRules[modelData.series];
    if (!rules) return modelData.base;
    
    let basePrice = modelData.base;
    let totalDeductions = 0;
    
    totalDeductions += rules.battery[battery] || 0;
    totalDeductions += rules.faceid[faceid] || 0;
    totalDeductions += rules.backglass[backglass] || 0;
    totalDeductions += rules.screen[screen] || 0;
    totalDeductions += rules.body[body] || 0;
    
    if (rules.sim && sim) {
      totalDeductions += rules.sim[sim] || 0;
    }
    
    return basePrice - totalDeductions;
  }, [tradeInFormData]);

  const newPhonePrice = useMemo(() => {
    const { category, model, storage } = newPhoneFormData;
    if (!category || !model || !storage || !newPhoneDatabase[category]?.[model]?.[storage]) {
        return 0;
    }
    return newPhoneDatabase[category][model][storage] || 0;
  }, [newPhoneFormData]);

  const amountToPay = newPhonePrice - tradeInPrice;

  // ===== DROPDOWN OPTIONS =====
  const categoryOptions = useMemo(() => {
    return Object.keys(newPhoneDatabase).map(cat => ({ value: cat, label: cat }));
  }, []);

  const modelsForCategory = useMemo(() => {
      if (!newPhoneFormData.category || !newPhoneDatabase[newPhoneFormData.category]) return [];
      return Object.keys(newPhoneDatabase[newPhoneFormData.category]).map(model => ({ value: model, label: model }));
  }, [newPhoneFormData.category]);

  const storageForModel = useMemo(() => {
      if (!newPhoneFormData.category || !newPhoneFormData.model || !newPhoneDatabase[newPhoneFormData.category]?.[newPhoneFormData.model]) return [];
      return Object.keys(newPhoneDatabase[newPhoneFormData.category][newPhoneFormData.model]).map(storage => ({ value: storage, label: storage }));
  }, [newPhoneFormData.category, newPhoneFormData.model]);

  // ===== VALIDATION =====
  const isStep1Valid = useMemo(() => {
    const { model } = tradeInFormData;
    return !!model;
  }, [tradeInFormData]);

  const isStep2Valid = useMemo(() => {
    const { battery, faceid, backglass, screen, body } = tradeInFormData;
    return !!battery && !!faceid && !!backglass && !!screen && !!body;
  }, [tradeInFormData]);

  const isStep3Valid = useMemo(() => {
    const { category, model, storage } = newPhoneFormData;
    return !!category && !!model && !!storage;
  }, [newPhoneFormData]);

  const isStep4Valid = useMemo(() => {
    return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const isStep5Valid = useMemo(() => {
    return !!swapMethod;
  }, [swapMethod]);

  // ===== EFFECTS =====
  useEffect(() => {
    if (step === 2) {
        const firstModel = modelsForCategory.length > 0 ? modelsForCategory[0].value : '';
        if (newPhoneFormData.model !== firstModel) {
            setNewPhoneFormData(prev => ({ ...prev, model: firstModel, storage: '' }));
        }
    }
  }, [newPhoneFormData.category, modelsForCategory, step]);

  useEffect(() => {
    if (step === 2) {
        const firstStorage = storageForModel.length > 0 ? storageForModel[0].value : '';
        if (newPhoneFormData.storage !== firstStorage) {
            setNewPhoneFormData(prev => ({ ...prev, storage: firstStorage }));
        }
    }
  }, [newPhoneFormData.model, storageForModel, step]);

  // ===== HANDLERS =====
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSaveSwap = async () => {
    console.log('handleSaveSwap called');
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid || !isStep4Valid || !isStep5Valid) {
      return;
    }
    setIsSaving(true);

    try {
      const response = await fetch('/api/swaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tradeInPhone: tradeInFormData,
          newPhone: newPhoneFormData,
          contactEmail: email,
          swapMethod: swapMethod,
          tradeInValue: tradeInPrice,
          newPhonePrice: newPhonePrice,
          amountToPay: amountToPay,
        }),
      });

      if (response.ok) {
        const swap = await response.json();
        setSavedSwapId(swap.id);
        setShowCalendly(true);
      } else {
        console.error('Failed to save swap');
      }
    } catch (error) {
      console.error('Error saving swap:', error);
    } finally {
        setIsSaving(false);
    }
  };



  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-lg mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-0.5 mx-2 transition-all duration-200 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="apple-footnote text-gray-500">
              {step === 1 && "Step 1 of 5: Phone Model"}
              {step === 2 && "Step 2 of 5: Phone Condition"}
              {step === 3 && "Step 3 of 5: Select New Phone"}
              {step === 4 && "Step 4 of 5: Swap Summary"}
              {step === 5 && "Step 5 of 5: Choose Swap Method"}
            </p>
          </div>
        </div>

        {step === 1 && (
          <div>
            <PhoneModelSelector 
              formData={tradeInFormData}
              setFormData={setTradeInFormData}
            />
            <button 
              onClick={handleNextStep}
              disabled={!isStep1Valid}
              className="apple-button-primary w-full mt-6 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <PhoneConditionSelector 
              formData={tradeInFormData}
              setFormData={setTradeInFormData}
            />
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handlePrevStep}
                className="apple-button-secondary flex-1"
              >
                Back
              </button>
              <button 
                onClick={handleNextStep}
                disabled={!isStep2Valid}
                className="apple-button-primary flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <NewPhoneSelector 
              formData={newPhoneFormData}
              setFormData={setNewPhoneFormData}
              finalPrice={newPhonePrice}
              categoryOptions={categoryOptions}
              modelsForCategory={modelsForCategory}
              storageForModel={storageForModel}
            />
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handlePrevStep}
                className="apple-button-secondary flex-1"
              >
                Back
              </button>
              <button 
                onClick={handleNextStep}
                disabled={!isStep3Valid}
                className="apple-button-primary flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
              >
                Get Swap Price
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="apple-card">
            <div className="text-center mb-6">
              <h2 className="apple-title mb-2">Swap Summary</h2>
              <p className="apple-body text-gray-600">Review your swap details and pricing breakdown</p>
            </div>
            
            <div className="space-y-6 mb-8">
              {/* Enthusiastic Price Display */}
              <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                <div className="mb-4">
                  <h3 className="apple-title text-gray-900 mb-2">Your Swap Quote</h3>
                  <p className="apple-body text-gray-700">
                    Here's what you'll need to complete your phone upgrade:
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="apple-display text-blue-600 font-bold mb-2">
                    ₦{(amountToPay - 20000).toLocaleString()} - ₦{(amountToPay + 20000).toLocaleString()}
                  </div>
                  <p className="apple-footnote text-gray-600">
                    Final amount may vary based on device inspection
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="apple-body text-gray-800 font-medium">
                    Your {modelsForCategory.find((m: any) => m.value === newPhoneFormData.model)?.label || 'selected phone'} is almost within reach! 
                  </p>
                  <p className="apple-footnote text-gray-600 mt-2">
                    Complete the swap process to get your hands on this incredible upgrade.
                  </p>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="apple-subheadline font-medium text-gray-900 mb-3 block">
                  Email Address
                </label>
                <p className="apple-footnote text-gray-500 mb-3">
                  We'll send you the swap breakdown and next steps
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white apple-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handlePrevStep}
                className="apple-button-secondary flex-1"
              >
                Back
              </button>
              <button 
                onClick={handleNextStep}
                disabled={!isStep4Valid}
                className="apple-button-primary flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="apple-card">
            <div className="text-center mb-6">
              <h2 className="apple-title mb-2">Choose Swap Method</h2>
              <p className="apple-body text-gray-600">How would you like to complete your trade-in?</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <button
                type="button"
                onClick={() => setSwapMethod('online')}
                className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  swapMethod === 'online'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="apple-headline text-gray-900 mb-2">Online Swap</h3>
                    <p className="apple-body text-gray-600 mb-3">Expert check, dispatch pick up</p>
                    <ul className="apple-footnote text-gray-500 space-y-1">
                      <li>• Professional device inspection</li>
                      <li>• Free pickup from your location</li>
                      <li>• Secure packaging provided</li>
                      <li>• 24-48 hour processing</li>
                    </ul>
                  </div>
                  {swapMethod === 'online' && (
                    <div className="ml-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSwapMethod('in-person')}
                className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  swapMethod === 'in-person'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="apple-headline text-gray-900 mb-2">In Person Swap</h3>
                    <p className="apple-body text-gray-600 mb-3">Visit our store location</p>
                    <ul className="apple-footnote text-gray-500 space-y-1">
                      <li>• Immediate device inspection</li>
                      <li>• Face-to-face service</li>
                      <li>• Instant trade completion</li>
                      <li>• Same-day device exchange</li>
                    </ul>
                  </div>
                  {swapMethod === 'in-person' && (
                    <div className="ml-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handlePrevStep}
                className="apple-button-secondary flex-1"
              >
                Back
              </button>
              <button 
                onClick={handleSaveSwap}
                disabled={isSaving || !isStep1Valid || !isStep2Valid || !isStep3Valid || !isStep4Valid || !isStep5Valid}
                className="apple-button-primary flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSaving ? 'Processing...' : 'Complete Swap'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Calendly Widget Modal */}
      <CalendlyWidget
        isOpen={showCalendly}
        onClose={() => {
          setShowCalendly(false);
          // Redirect to confirmation page with swapId
          router.push(`/tradein/confirm?swapId=${savedSwapId}`);
        }}
        swapId={savedSwapId}
        swapMethod={swapMethod}
      />
    </div>
  );
}

