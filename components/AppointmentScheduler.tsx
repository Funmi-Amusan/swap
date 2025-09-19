import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Listbox } from '@headlessui/react';

export function AppointmentScheduler() {
  const appointmentTypes = [
    { value: 'house_call', label: 'Certified Expert House Call' },
    { value: 'dispatch_pickup', label: 'Dispatch Pickup' },
    { value: 'walk_in', label: 'Walk-in Customer' },
  ];
  const [appointmentType, setAppointmentType] = useState(appointmentTypes[0]);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto bg-neutral-900 rounded-2xl shadow-2xl p-6 text-white font-sans mt-8 text-center border border-neutral-800">
        <h2 className="text-xl font-bold mb-4 text-neon-green">Appointment Booked!</h2>
        <p className="text-gray-300 mb-2">Your appointment for <span className="font-bold text-neon-green">{date?.toLocaleDateString()}</span> at <span className="font-bold text-neon-green">{time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span> has been scheduled as <span className="font-bold text-purple-700">{appointmentType.label}</span>.</p>
        <p className="text-neon-green font-semibold">Thank you! We will contact you with further details.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-neutral-900 rounded-2xl shadow-2xl p-6 text-white font-sans mt-8 border border-neutral-800">
      <h2 className="text-xl font-bold mb-4 text-center text-purple-700">Schedule Appointment</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-300">Appointment Type</label>
          <Listbox value={appointmentType} onChange={setAppointmentType}>
            <Listbox.Button className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-700 focus:outline-none transition flex justify-between items-center">
              {appointmentType.label}
            </Listbox.Button>
            <Listbox.Options className="mt-1 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg">
              {appointmentTypes.map((type) => (
                <Listbox.Option key={type.value} value={type} className={({ active }) => `cursor-pointer select-none p-2 ${active ? 'bg-purple-700 text-white' : 'text-gray-300'}`}>
                  {type.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-300">Date</label>
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="MMMM d, yyyy"
            className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-700 focus:outline-none transition w-full"
            placeholderText="Select date"
            minDate={new Date()}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-300">Time</label>
          <DatePicker
            selected={time}
            onChange={setTime}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white focus:ring-2 focus:ring-neon-green focus:outline-none transition w-full"
            placeholderText="Select time"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-neon-green text-white font-bold py-2 px-4 rounded transition border-2 border-neon-green"
        >
          Book Appointment
        </button>
      </form>
      <style jsx global>{`
        .text-neon-green { color: #39ff14; }
        .bg-neon-green { background-color: #39ff14; }
        .border-neon-green { border-color: #39ff14; }
      `}</style>
    </div>
  );
}