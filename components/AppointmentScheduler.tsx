"use client";

import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Listbox } from '@headlessui/react';

export interface AppointmentDetails {
    appointmentType: { value: string; label: string; };
    date: Date | null;
    time: Date | null;
}

export interface AppointmentFormData {
    appointmentType: { value: string; label: string; };
    date: Date | null;
    time: Date | null;
}

export function AppointmentScheduler({ 
    formData,
    setFormData,
    onDataChange, 
    onValidationChange 
}: { 
    formData: AppointmentFormData;
    setFormData: (data: AppointmentFormData) => void;
    onDataChange: (details: AppointmentDetails) => void; 
    onValidationChange: (isValid: boolean) => void; 
}) {
  const appointmentTypes = [
    { value: 'house_call', label: 'Certified Expert House Call' },
    { value: 'dispatch_pickup', label: 'Dispatch Pickup' },
    { value: 'walk_in', label: 'Walk-in Customer' },
  ];
  const { appointmentType, date, time } = formData;

  useEffect(() => {
    const isValid = !!appointmentType && !!date && !!time;
    onValidationChange(isValid);
    if (isValid) {
        onDataChange({ appointmentType, date, time });
    }
  }, [appointmentType, date, time, onValidationChange, onDataChange]);


  return (
    <div className="apple-card">
      <div className="space-y-6">
        <div>
          <label className="apple-subheadline font-medium text-gray-900 mb-3 block">Appointment Type</label>
          <Listbox value={appointmentType} onChange={(value) => setFormData({ ...formData, appointmentType: value })}>
            <div className="relative">
              <Listbox.Button className="apple-input w-full text-left flex justify-between items-center">
                <span className="apple-body">{appointmentType.label}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                {appointmentTypes.map((type) => (
                  <Listbox.Option 
                    key={type.value} 
                    value={type} 
                    className={({ active, selected }) => 
                      `cursor-pointer select-none p-4 apple-body ${
                        active ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                      } ${selected ? 'bg-blue-600 text-white' : ''}`
                    }
                  >
                    {type.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
        
        <div>
          <label className="apple-subheadline font-medium text-gray-900 mb-3 block">Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="MMMM d, yyyy"
            className="apple-input w-full"
            placeholderText="Select appointment date"
            minDate={new Date()}
            required
          />
        </div>
        
        <div>
          <label className="apple-subheadline font-medium text-gray-900 mb-3 block">Time</label>
          <DatePicker
            selected={time}
            onChange={(time) => setFormData({ ...formData, time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="apple-input w-full"
            placeholderText="Select appointment time"
            required
          />
        </div>
      </div>
    </div>
  );
}