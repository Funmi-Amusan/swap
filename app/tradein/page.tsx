"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IPhoneCalculator, TradeInFormData } from '../../components/iphone-calculator';
import { NewPhoneSelector, NewPhoneFormData } from '../../components/NewPhoneSelector';

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
      sim: { 'physical': 0, 'esim': 50000 }
    },
    '14promax': {
      battery: { '90+': 0, '84-90': 10000, '79-84': 20000, '78-': 40000, 'changed': 30000 },
      faceid: { 'working': 0, 'not-working': 200000 },
      backglass: { 'mint': 0, 'minor': 15000, 'broken': 30000 },
      screen: { 'mint': 0, 'changed': 140000, 'cracked': 180000 },
      body: { 'mint': 0, 'minor': 30000, 'dents': 40000 },
      sim: { 'physical': 0, 'esim': 50000 }
    },
    '15pro': {
      battery: { '90+': 0, '84-90': 15000, '79-84': 30000, '78-': 50000, 'changed': 40000 },
      faceid: { 'working': 0, 'not-working': 200000 },
      backglass: { 'mint': 0, 'minor': 15000, 'broken': 30000 },
      screen: { 'mint': 0, 'changed': 200000, 'cracked': 250000 },
      body: { 'mint': 0, 'minor': 30000, 'dents': 40000 },
      sim: { 'physical': 0, 'esim': 100000 }
    },
    '16': {
      battery: { '90+': 0, '84-90': 15000, '79-84': 30000, '78-': 50000, 'changed': 40000 },
      faceid: { 'working': 0, 'not-working': 200000 },
      backglass: { 'mint': 0, 'minor': 15000, 'broken': 30000 },
      screen: { 'mint': 0, 'changed': 200000, 'cracked': 250000 },
      body: { 'mint': 0, 'minor': 30000, 'dents': 40000 },
      sim: { 'physical': 0, 'esim': 100000 }
    }
  };

const newPhoneDatabase: any = {
    "Premium Used Grade A": {
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
    "Brand New (Non Active)": {
        "iPhone 13": { "128GB": 520000 },
        "iPhone 15": { "128GB": 850000, "256GB": 950000 },
        "iPhone 15 Plus": { "128GB": 950000, "256GB": 1050000 },
        "iPhone 15 Pro": { "128GB": 1100000, "256GB": 1200000 },
        "iPhone 15 Pro Max": { "256GB": 1350000, "512GB": 1500000 },
    },
    "Open Box Brand New": {
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

  const router = useRouter();
  const { data: session, status } = useSession();

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
      if (!newPhoneFormData.category) return [];
      return Object.keys(newPhoneDatabase[newPhoneFormData.category]).map(model => ({ value: model, label: model }));
  }, [newPhoneFormData.category]);

  const storageForModel = useMemo(() => {
      if (!newPhoneFormData.model || !newPhoneDatabase[newPhoneFormData.category]?.[newPhoneFormData.model]) return [];
      return Object.keys(newPhoneDatabase[newPhoneFormData.category][newPhoneFormData.model]).map(storage => ({ value: storage, label: storage }));
  }, [newPhoneFormData.category, newPhoneFormData.model]);

  // ===== VALIDATION =====
  const isStep1Valid = useMemo(() => {
    const { model, battery, faceid, backglass, screen, body } = tradeInFormData;
    return !!model && !!battery && !!faceid && !!backglass && !!screen && !!body;
  }, [tradeInFormData]);

  const isStep2Valid = useMemo(() => {
    const { category, model, storage } = newPhoneFormData;
    return !!category && !!model && !!storage;
  }, [newPhoneFormData]);

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
    if (!session?.user?.id || !isStep1Valid || !isStep2Valid) {
      console.log('Save aborted due to invalid data or session');
      console.log('isStep1Valid:', isStep1Valid);
      console.log('isStep2Valid:', isStep2Valid);
      console.log('session:', !!session?.user?.id);
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
          userId: session.user.id,
          tradeInPhone: tradeInFormData,
          newPhone: newPhoneFormData,
          tradeInValue: tradeInPrice,
          newPhonePrice: newPhonePrice,
          amountToPay: amountToPay,
        }),
      });

      if (response.ok) {
        const swap = await response.json();
        router.push(`/tradein/schedule?swapId=${swap.id}`);
      } else {
        console.error('Failed to save swap');
      }
    } catch (error) {
      console.error('Error saving swap:', error);
    } finally {
        setIsSaving(false);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/signin');
    return null;
  }

  return (
    <div className="min-h-screen p-5 flex flex-col items-center justify-center">
      
      <div className="w-full max-w-md">
        {step === 1 && (
          <div>
            <IPhoneCalculator 
              formData={tradeInFormData}
              setFormData={setTradeInFormData}
              finalPrice={tradeInPrice}
            />
            <button 
              onClick={handleNextStep}
              disabled={!isStep1Valid}
              className="w-full mt-6 bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <NewPhoneSelector 
              formData={newPhoneFormData}
              setFormData={setNewPhoneFormData}
              finalPrice={newPhonePrice}
              categoryOptions={categoryOptions}
              modelsForCategory={modelsForCategory}
              storageForModel={storageForModel}
            />
            <div className="flex justify-between mt-6">
              <button 
                onClick={handlePrevStep}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                Back
              </button>
              <button 
                onClick={handleNextStep}
                disabled={!isStep2Valid}
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                See Summary
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Swap Summary</h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>New Phone Price:</span>
                <span className="font-semibold">₦{newPhonePrice.toLocaleString() ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Trade-in Value:</span>
                <span className="font-semibold text-green-600">- ₦{tradeInPrice.toLocaleString() ?? 0}</span>
              </div>
              <hr className="border-gray-200"/>
              <div className="flex justify-between text-2xl font-bold">
                <span>Amount to Pay:</span>
                <span className="text-black">₦{amountToPay.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button 
                onClick={handlePrevStep}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                Back
              </button>
              <button 
                onClick={handleSaveSwap}
                disabled={isSaving || !isStep1Valid || !isStep2Valid}
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Schedule Appointment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

