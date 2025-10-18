"use client";

import { useState } from 'react';

export interface TradeInFormData {
    model: string;
    battery: string;
    faceid: string;
    backglass: string;
    screen: string;
    body: string;
    sim: string;
}

interface PhoneConditionSelectorProps {
    formData: TradeInFormData;
    setFormData: (data: TradeInFormData) => void;
}

export default function PhoneConditionSelector({ formData, setFormData }: PhoneConditionSelectorProps) {
    const [showBatteryTooltip, setShowBatteryTooltip] = useState(false);

    const handleSelectChange = (field: string, option: any) => {
        setFormData({ ...formData, [field]: option ? option.value : '' });
    };

    const batteryOptions = [
        { value: '90+', label: '90% and above' },
        { value: '84-90', label: '84-90%' },
        { value: '79-84', label: '79-84%' },
        { value: '78-', label: '78% and below' },
        { value: 'changed', label: 'Changed Battery (Non-Original)' }
    ];

    const faceIdOptions = [
        { 
            value: 'working', 
            label: 'Face ID Working',
            subtext: 'Face unlock and authentication features work normally'
        },
        { 
            value: 'not-working', 
            label: 'No Face ID',
            subtext: 'Face ID is disabled, damaged, or not functioning'
        }
    ];

    const backGlassOptions = [
        { 
            value: 'mint', 
            label: 'Mint (No scratches/dents)',
            subtext: 'Back glass is in perfect condition with no visible damage'
        },
        { 
            value: 'minor', 
            label: 'Small scratches/dents',
            subtext: 'Minor wear and light scratches that don\'t affect functionality'
        },
        { 
            value: 'broken', 
            label: 'Broken back glass',
            subtext: 'Cracked, shattered, or significantly damaged back glass'
        }
    ];

    const screenOptions = [
        { 
            value: 'mint', 
            label: 'Mint Screen (Original)',
            subtext: 'Original Apple screen in perfect condition with no damage'
        },
        { 
            value: 'changed', 
            label: 'Changed Screen (Non-Original)',
            subtext: 'Screen has been replaced with aftermarket or third-party parts'
        },
        { 
            value: 'cracked', 
            label: 'Cracked Screen',
            subtext: 'Screen has visible cracks, chips, or display issues'
        }
    ];

    const bodyOptions = [
        { 
            value: 'mint', 
            label: 'No scratches/dents',
            subtext: 'Body frame is in pristine condition with no visible wear'
        },
        { 
            value: 'minor', 
            label: 'Small scratches/dents',
            subtext: 'Light scuffing or minor scratches on the frame edges'
        },
        { 
            value: 'dents', 
            label: 'Dents/major scratches',
            subtext: 'Noticeable dents, deep scratches, or significant body damage'
        }
    ];

    const simOptions = [
        { value: 'physical', label: 'Physical SIM' },
        { value: 'esim', label: 'Physical SIM plus eSIM' }
    ];

    const handleRadioChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div className="apple-card">
            <div className="text-center mb-8">
                <h1 className="apple-title mb-2">Phone Condition</h1>
                <p className="apple-body text-gray-600">Tell us about your phone's current condition</p>
            </div>

            <div className="space-y-12">
                {/* Face ID */}
                <fieldset>
                    <legend>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Face ID</h2>
                    </legend>
                    <div className="space-y-3">
                        {faceIdOptions.map((option) => (
                            <div key={option.value} className="relative">
                                <input
                                    type="radio"
                                    id={`faceid-${option.value}`}
                                    name="faceid"
                                    value={option.value}
                                    checked={formData.faceid === option.value}
                                    onChange={(e) => handleRadioChange('faceid', e.target.value)}
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor={`faceid-${option.value}`}
                                    className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all"
                                >
                                    <span className="font-medium text-gray-900 mb-1">{option.label}</span>
                                    <span className="text-sm text-gray-500">{option.subtext}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* Back Glass */}
                <fieldset>
                    <legend>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Back Glass</h2>
                    </legend>
                    <div className="space-y-3">
                        {backGlassOptions.map((option) => (
                            <div key={option.value} className="relative">
                                <input
                                    type="radio"
                                    id={`backglass-${option.value}`}
                                    name="backglass"
                                    value={option.value}
                                    checked={formData.backglass === option.value}
                                    onChange={(e) => handleRadioChange('backglass', e.target.value)}
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor={`backglass-${option.value}`}
                                    className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all"
                                >
                                    <span className="font-medium text-gray-900 mb-1">{option.label}</span>
                                    <span className="text-sm text-gray-500">{option.subtext}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* Screen */}
                <fieldset>
                    <legend>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Screen</h2>
                    </legend>
                    <div className="space-y-3">
                        {screenOptions.map((option) => (
                            <div key={option.value} className="relative">
                                <input
                                    type="radio"
                                    id={`screen-${option.value}`}
                                    name="screen"
                                    value={option.value}
                                    checked={formData.screen === option.value}
                                    onChange={(e) => handleRadioChange('screen', e.target.value)}
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor={`screen-${option.value}`}
                                    className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all"
                                >
                                    <span className="font-medium text-gray-900 mb-1">{option.label}</span>
                                    <span className="text-sm text-gray-500">{option.subtext}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* Body Condition */}
                <fieldset>
                    <legend>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Body Condition</h2>
                    </legend>
                    <div className="space-y-3">
                        {bodyOptions.map((option) => (
                            <div key={option.value} className="relative">
                                <input
                                    type="radio"
                                    id={`body-${option.value}`}
                                    name="body"
                                    value={option.value}
                                    checked={formData.body === option.value}
                                    onChange={(e) => handleRadioChange('body', e.target.value)}
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor={`body-${option.value}`}
                                    className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all"
                                >
                                    <span className="font-medium text-gray-900 mb-1">{option.label}</span>
                                    <span className="text-sm text-gray-500">{option.subtext}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* SIM Type */}
                <fieldset>
                    <legend>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">SIM Type</h2>
                    </legend>
                    <div className="space-y-3">
                        {simOptions.map((option) => (
                            <div key={option.value} className="relative">
                                <input
                                    type="radio"
                                    id={`sim-${option.value}`}
                                    name="sim"
                                    value={option.value}
                                    checked={formData.sim === option.value}
                                    onChange={(e) => handleRadioChange('sim', e.target.value)}
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor={`sim-${option.value}`}
                                    className="flex items-center w-full p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all"
                                >
                                    <span className="font-medium text-gray-900">{option.label}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* Battery Health - Last */}
                <fieldset>
                    <legend>
                        <div className="flex items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Battery Health</h2>
                            <div className="relative ml-2">
                                <button
                                    type="button"
                                    onClick={() => setShowBatteryTooltip(!showBatteryTooltip)}
                                    className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center hover:bg-gray-500 transition-colors"
                                    aria-label="Battery info"
                                >
                                    i
                                </button>
                                {showBatteryTooltip && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                                        <div className="mb-2 font-semibold">How to check battery health:</div>
                                        <div>Go to Settings → Battery → Battery Health & Charging</div>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </legend>
                    <div className="space-y-3">
                        {batteryOptions.map((option) => (
                            <div key={option.value} className="relative">
                                <input
                                    type="radio"
                                    id={`battery-${option.value}`}
                                    name="battery"
                                    value={option.value}
                                    checked={formData.battery === option.value}
                                    onChange={(e) => handleRadioChange('battery', e.target.value)}
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor={`battery-${option.value}`}
                                    className="flex items-center w-full p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all"
                                >
                                    <span className="font-medium text-gray-900">{option.label}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
        </div>
    );
}