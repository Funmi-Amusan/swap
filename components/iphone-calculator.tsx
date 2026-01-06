"use client";

import { useState, useEffect } from 'react';
import Select from 'react-select';

export default function IphoneCalculator() {
    const [modelOptions, setModelOptions] = useState<any[]>([]);
    const [attributeGroups, setAttributeGroups] = useState<any[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [attributes, setAttributes] = useState<Record<string, string>>({});
    const [tradeInValue, setTradeInValue] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [modelsLoading, setModelsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [modelsRes, groupsRes] = await Promise.all([
                    fetch('/api/admin/phone-models'),
                    fetch('/api/admin/condition-attributes/groups'),
                ]);
                const models = await modelsRes.json();
                const groups = await groupsRes.json();
                setModelOptions(models);
                setAttributeGroups(groups);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setModelsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedModel && Object.keys(attributes).length > 0) {
            calculatePrice();
        }
    }, [selectedModel, attributes]);

    const calculatePrice = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/estimates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneModelValue: selectedModel,
                    attributes,
                }),
            });
            const data = await res.json();
            if (data.tradeInValue != null) {
                setTradeInValue(data.tradeInValue);
            }
        } catch (error) {
            console.error('Failed to calculate price:', error);
        } finally {
            setLoading(false);
        }
    };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.35rem',
      minHeight: '42px',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '8px 12px',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: '#1f2937',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '1.5',
    }),
    input: (provided: any) => ({
        ...provided,
        color: '#1f2937',
        fontSize: '16px',
    }),
    valueContainer: (provided: any) => ({
        ...provided,
        padding: '8px',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#9ca3af',
        fontSize: '16px',
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }),
  };

    return (
        <div className="w-full space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Your Estimate</h2>
                    <p className="text-gray-600">Select your phone model and condition</p>
                </div>

                <div className="space-y-6">
                    {modelsLoading ? (
                        <div className="text-center text-gray-500">Loading options...</div>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    iPhone Model
                                </label>
                                <Select
                                    instanceId="model-calc-select"
                                    options={modelOptions}
                                    value={modelOptions.find(m => m.value === selectedModel)}
                                    onChange={(option) => setSelectedModel(option?.value || '')}
                                    styles={customStyles}
                                    placeholder="Choose your iPhone model..."
                                    isSearchable
                                />
                            </div>

                            {attributeGroups.map((group: any) => (
                                <div key={group.key}>
                                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                                        {group.label}
                                    </label>
                                    <Select
                                        instanceId={`attr-${group.key}`}
                                        options={group.options}
                                        value={group.options.find((o: any) => o.value === attributes[group.key])}
                                        onChange={(option: any) => {
                                            const value = option?.value || '';
                                            setAttributes(prev => ({ ...prev, [group.key]: value }));
                                        }}
                                        styles={customStyles}
                                        placeholder={`Select ${group.label.toLowerCase()}...`}
                                    />
                                </div>
                            ))}

                            {tradeInValue && (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mt-8">
                                    <p className="text-gray-600 text-sm mb-2">Your Trade-In Value</p>
                                    <p className="text-4xl font-bold text-green-600">${tradeInValue.toFixed(2)}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
