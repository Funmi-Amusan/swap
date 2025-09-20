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
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 text-black font-sans">
        <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Schedule Appointment</h1>
            <p className="text-gray-500 text-sm">Select a date and time for your appointment.</p>
        </div>
      <div className="space-y-5">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Appointment Type</label>
          <Listbox value={appointmentType} onChange={(value) => setFormData({ ...formData, appointmentType: value })}>
            <Listbox.Button className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-black text-left flex justify-between items-center">
              {appointmentType.label}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              </span>
            </Listbox.Button>
            <Listbox.Options className="mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {appointmentTypes.map((type) => (
                <Listbox.Option key={type.value} value={type} className={({ active }) => `cursor-pointer select-none p-2 ${active ? 'bg-blue-500 text-white' : 'text-black'}`}>
                  {type.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="MMMM d, yyyy"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-black"
            placeholderText="Select date"
            minDate={new Date()}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Time</label>
          <DatePicker
            selected={time}
            onChange={(time) => setFormData({ ...formData, time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-black"
            placeholderText="Select time"
            required
          />
        </div>
      </div>
    </div>
  );
}