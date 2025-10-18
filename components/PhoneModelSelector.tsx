"use client";

import Select from 'react-select';

const modelOptions = [
    { value: "x-64", label: "iPhone X 64GB" },
    { value: "x-256", label: "iPhone X 256GB" },
    { value: "xs-64", label: "iPhone XS 64GB" },
    { value: "xs-256", label: "iPhone XS 256GB" },
    { value: "xr-64", label: "iPhone XR 64GB" },
    { value: "xr-128", label: "iPhone XR 128GB" },
    { value: "xsmax-64", label: "iPhone XS Max 64GB" },
    { value: "xsmax-256", label: "iPhone XS Max 256GB" },
    { value: "11-64", label: "iPhone 11 64GB" },
    { value: "11-128", label: "iPhone 11 128GB" },
    { value: "11pro-64", label: "iPhone 11 Pro 64GB" },
    { value: "11pro-256", label: "iPhone 11 Pro 256GB" },
    { value: "11promax-64", label: "iPhone 11 Pro Max 64GB" },
    { value: "11promax-256", label: "iPhone 11 Pro Max 256GB" },
    { value: "12-64", label: "iPhone 12 64GB" },
    { value: "12-128", label: "iPhone 12 128GB" },
    { value: "12pro-128", label: "iPhone 12 Pro 128GB" },
    { value: "12pro-256", label: "iPhone 12 Pro 256GB" },
    { value: "12promax-128", label: "iPhone 12 Pro Max 128GB" },
    { value: "12promax-256", label: "iPhone 12 Pro Max 256GB" },
    { value: "13-128", label: "iPhone 13 128GB" },
    { value: "13-256", label: "iPhone 13 256GB" },
    { value: "13mini-128", label: "iPhone 13 Mini 128GB" },
    { value: "13mini-256", label: "iPhone 13 Mini 256GB" },
    { value: "13pro-128", label: "iPhone 13 Pro 128GB" },
    { value: "13pro-256", label: "iPhone 13 Pro 256GB" },
    { value: "13promax-128", label: "iPhone 13 Pro Max 128GB" },
    { value: "13promax-256", label: "iPhone 13 Pro Max 256GB" },
    { value: "14-128", label: "iPhone 14 128GB" },
    { value: "14-256", label: "iPhone 14 256GB" },
    { value: "14pro-128", label: "iPhone 14 Pro 128GB" },
    { value: "14pro-256", label: "iPhone 14 Pro 256GB" },
    { value: "14promax-128", label: "iPhone 14 Pro Max 128GB" },
    { value: "14promax-256", label: "iPhone 14 Pro Max 256GB" },
    { value: "14promax-512", label: "iPhone 14 Pro Max 512GB" },
    { value: "15-128", label: "iPhone 15 128GB" },
    { value: "15-256", label: "iPhone 15 256GB" },
    { value: "15pro-128", label: "iPhone 15 Pro 128GB" },
    { value: "15pro-256", label: "iPhone 15 Pro 256GB" },
    { value: "15pro-512", label: "iPhone 15 Pro 512GB" },
    { value: "15promax-256", label: "iPhone 15 Pro Max 256GB" },
    { value: "15promax-512", label: "iPhone 15 Pro Max 512GB" },
    { value: "16-128", label: "iPhone 16 128GB" },
    { value: "16-256", label: "iPhone 16 256GB" },
    { value: "16pro-128", label: "iPhone 16 Pro 128GB" },
    { value: "16pro-256", label: "iPhone 16 Pro 256GB" },
    { value: "16pro-512", label: "iPhone 16 Pro 512GB" },
    { value: "16promax-256", label: "iPhone 16 Pro Max 256GB" },
    { value: "16promax-512", label: "iPhone 16 Pro Max 512GB" },
];

const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'white !important',
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
        color: '#1f2937 !important',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '1.5',
    }),
    input: (provided: any) => ({
        ...provided,
        color: '#1f2937 !important',
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
    menuList: (provided: any) => ({
        ...provided,
        backgroundColor: 'white',
        borderRadius: '0.5rem',
    }),
};

export interface TradeInFormData {
    model: string;
    battery: string;
    faceid: string;
    backglass: string;
    screen: string;
    body: string;
    sim: string;
}

interface PhoneModelSelectorProps {
    formData: TradeInFormData;
    setFormData: (data: TradeInFormData) => void;
}

export default function PhoneModelSelector({ formData, setFormData }: PhoneModelSelectorProps) {
    const handleSelectChange = (field: string, option: any) => {
        setFormData({ ...formData, [field]: option ? option.value : '' });
    };

    return (
        <div className="apple-card">
            <div className="text-center mb-8">
                <h1 className="apple-title mb-2">Select Your iPhone</h1>
                <p className="apple-body text-gray-600">Choose your current iPhone model and storage</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="apple-subheadline font-medium text-gray-900 mb-3 block">iPhone Model & Storage</label>
                    <Select
                        instanceId="model-select"
                        options={modelOptions}
                        value={modelOptions.find(option => option.value === formData.model)}
                        onChange={(option) => handleSelectChange('model', option)}
                        styles={customStyles}
                        placeholder="Select your iPhone model"
                        isSearchable
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}