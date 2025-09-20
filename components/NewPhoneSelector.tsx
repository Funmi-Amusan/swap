"use client";

import Select from 'react-select';

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

export interface NewPhoneFormData {
    category: string;
    model: string;
    storage: string;
}

export function NewPhoneSelector({ 
    formData,
    setFormData,
    finalPrice,
    categoryOptions,
    modelsForCategory,
    storageForModel,
}: { 
    formData: NewPhoneFormData;
    setFormData: (data: NewPhoneFormData) => void;
    finalPrice: number;
    categoryOptions: { value: string; label: string; }[];
    modelsForCategory: { value: string; label: string; }[];
    storageForModel: { value: string; label: string; }[];
}) {
    const { category: selectedCategory, model: selectedModel } = formData;

    const handleCategoryChange = (option: any) => {
        const newCategory = option ? option.value : '';
        setFormData({ ...formData, category: newCategory, model: '', storage: '' });
    };

    const handleModelChange = (option: any) => {
        const newModel = option ? option.value : '';
        setFormData({ ...formData, model: newModel, storage: '' });
    };

    const handleStorageChange = (option: any) => {
        const newStorage = option ? option.value : '';
        setFormData({ ...formData, storage: newStorage });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 text-black font-sans">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Select Your New Phone</h1>
                <p className="text-gray-500 text-sm">Choose the phone you want to swap to.</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                    <Select
                        instanceId="category-select"
                        options={categoryOptions}
                        value={categoryOptions.find(option => option.value === selectedCategory)}
                        onChange={handleCategoryChange}
                        styles={customStyles}
                        placeholder="Select Category"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Model</label>
                    <Select
                        instanceId="model-select"
                        options={modelsForCategory}
                        value={modelsForCategory.find(option => option.value === selectedModel)}
                        onChange={handleModelChange}
                        styles={customStyles}
                        placeholder="Select Model"
                        isDisabled={!selectedCategory}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Storage</label>
                    <Select
                        instanceId="storage-select"
                        options={storageForModel}
                        value={storageForModel.find(option => option.value === formData.storage)}
                        onChange={handleStorageChange}
                        styles={customStyles}
                        placeholder="Select Storage"
                        isDisabled={!selectedModel}
                    />
                </div>
            </div>

            {finalPrice > 0 && (
                <div className="mt-6 text-center">
                    <p className="text-lg font-semibold">New Phone Price:</p>
                    <p className="text-3xl font-bold text-green-600">₦{finalPrice.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}
