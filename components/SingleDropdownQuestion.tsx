"use client";

import { useState } from 'react';

interface SingleDropdownQuestionProps {
    question: string;
    description?: string;
    options: { value: string; label: string; }[];
    value: string;
    onSelect: (value: string) => void;
    showTooltip?: boolean;
    tooltipContent?: string;
}

export default function SingleDropdownQuestion({
    question,
    description,
    options,
    value,
    onSelect,
    showTooltip = false,
    tooltipContent = "",
}: SingleDropdownQuestionProps) {
    const [showAllOptions, setShowAllOptions] = useState(false);
    const MAX_VISIBLE_OPTIONS = 7;
    const hasMoreOptions = options.length > MAX_VISIBLE_OPTIONS;
    const visibleOptions = showAllOptions ? options : options.slice(0, MAX_VISIBLE_OPTIONS);

    const handleSelect = (selectedValue: string) => {
        onSelect(selectedValue);
    };

    return (
        <div className="apple-card max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="apple-title mb-4">{question}</h1>
                {description && (
                    <p className="apple-body text-gray-600">{description}</p>
                )}
            </div>

            <div className="space-y-2">
                {visibleOptions.map((option) => (
                    <div key={option.value} className="relative">
                        <input
                            type="radio"
                            id={`option-${option.value}`}
                            name={question}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => handleSelect(e.target.value)}
                            className="sr-only peer"
                        />
                        <label
                            htmlFor={`option-${option.value}`}
                            className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-300 peer-checked:border-black peer-checked:bg-gray-50 transition-all"
                        >
                            <span className="font-medium text-gray-900">{option.label}</span>
                        </label>
                    </div>
                ))}
            </div>

            {hasMoreOptions && !showAllOptions && (
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={() => setShowAllOptions(true)}
                        className="text-green-700 font-semibold underline hover:text-green-800 transition-colors"
                    >
                        More options
                    </button>
                </div>
            )}

            {showTooltip && tooltipContent && (
                <div className="mt-6 bg-green-50 rounded-lg p-4 flex gap-3">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: tooltipContent }} />
                    </div>
                </div>
            )}
        </div>
    );
}
