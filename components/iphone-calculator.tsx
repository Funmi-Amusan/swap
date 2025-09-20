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
    { value: "16-512", label: "iPhone 16 512GB" },
  ];

  const batteryOptions = [
      { value: "90+", label: "90% and above" },
      { value: "84-90", label: "84-90%" },
      { value: "79-84", label: "79-84%" },
      { value: "78-", label: "78% and below" },
      { value: "changed", label: "Changed Battery (Non-Original)" },
  ];

  const faceIdOptions = [
      { value: "working", label: "Face ID Working" },
      { value: "not-working", label: "No Face ID" },
  ];

  const backGlassOptions = [
      { value: "mint", label: "Mint (No scratches/dents)" },
      { value: "minor", label: "Small scratches/dents" },
      { value: "broken", label: "Broken back glass" },
  ];

  const screenOptions = [
        { value: "mint", label: "Mint Screen (Original)" },
        { value: "changed", label: "Changed Screen (Non-Original)" },
        { value: "cracked", label: "Cracked Screen" },
  ];

  const bodyOptions = [
        { value: "mint", label: "No scratches/dents" },
        { value: "minor", label: "Minor scuffs/scratches" },
        { value: "dents", label: "Visible dents" },
  ];

  const simOptions = [
      { value: "physical", label: "Physical SIM" },
      { value: "esim", label: "eSIM Only" },
  ];

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#f9fafb',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.35rem',
      color: 'black',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'black',
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: 'white',
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

export function IPhoneCalculator({ 
    formData, 
    setFormData,
    finalPrice
}: { 
    formData: TradeInFormData;
    setFormData: (data: TradeInFormData) => void;
    finalPrice: number;
}) {
    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSelectChange = (field: string, option: any) => {
        handleChange(field, option ? option.value : '');
    };

    const isNewerModel = formData.model && (formData.model.startsWith('14') || formData.model.startsWith('15') || formData.model.startsWith('16'));

    return (
        <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 text-black font-sans">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Your Phone's Details</h1>
                <p className="text-gray-500 text-sm">Tell us about the phone you are trading in.</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">iPhone Model</label>
                    <Select
                        instanceId="iphone-model-select"
                        options={modelOptions}
                        value={modelOptions.find(option => option.value === formData.model)}
                        onChange={(option) => handleSelectChange('model', option)}
                        styles={customStyles}
                        placeholder="Select iPhone Model"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Battery Health</label>
                    <Select
                        instanceId="battery-select"
                        options={batteryOptions}
                        value={batteryOptions.find(option => option.value === formData.battery)}
                        onChange={(option) => handleSelectChange('battery', option)}
                        styles={customStyles}
                        placeholder="Select Battery Health"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Face ID</label>
                    <Select
                        instanceId="faceid-select"
                        options={faceIdOptions}
                        value={faceIdOptions.find(option => option.value === formData.faceid)}
                        onChange={(option) => handleSelectChange('faceid', option)}
                        styles={customStyles}
                        placeholder="Select Face ID status"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Back Glass</label>
                    <Select
                        instanceId="backglass-select"
                        options={backGlassOptions}
                        value={backGlassOptions.find(option => option.value === formData.backglass)}
                        onChange={(option) => handleSelectChange('backglass', option)}
                        styles={customStyles}
                        placeholder="Select Back Glass condition"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Screen</label>
                    <Select
                        instanceId="screen-select"
                        options={screenOptions}
                        value={screenOptions.find(option => option.value === formData.screen)}
                        onChange={(option) => handleSelectChange('screen', option)}
                        styles={customStyles}
                        placeholder="Select Screen condition"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Body Condition</label>
                    <Select
                        instanceId="body-select"
                        options={bodyOptions}
                        value={bodyOptions.find(option => option.value === formData.body)}
                        onChange={(option) => handleSelectChange('body', option)}
                        styles={customStyles}
                        placeholder="Select Body condition"
                    />
                </div>

                {isNewerModel && (
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">SIM Type</label>
                        <Select
                            instanceId="sim-select"
                            options={simOptions}
                            value={simOptions.find(option => option.value === formData.sim)}
                            onChange={(option) => handleSelectChange('sim', option)}
                            styles={customStyles}
                            placeholder="Select SIM type"
                        />
                    </div>
                )}
            </div>

            {finalPrice > 0 && (
                <div className="mt-6 text-center">
                    <p className="text-lg font-semibold">Trade-in Value:</p>
                    <p className="text-3xl font-bold text-green-600">₦{finalPrice.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}
