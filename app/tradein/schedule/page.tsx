"use client";

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppointmentScheduler, AppointmentDetails, AppointmentFormData } from '../../../components/AppointmentScheduler';

function SchedulePageContent() {
    const [isStepValid, setIsStepValid] = useState(false);
    const [appointmentData, setAppointmentData] = useState<AppointmentDetails | null>(null);
    const [appointmentFormData, setAppointmentFormData] = useState<AppointmentFormData>({
        appointmentType: { value: 'house_call', label: 'Certified Expert House Call' },
        date: null,
        time: null,
    });
    const router = useRouter();
    const searchParams = useSearchParams();
    const swapId = searchParams.get('swapId');

    const handleNext = async () => {
    if (!swapId || !appointmentData) return;

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    swapId,
                    appointmentType: appointmentData.appointmentType.label,
                    date: appointmentData.date,
                    time: appointmentData.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }),
            });

            if (response.ok) {
                router.push('/tradein/confirm');
            } else {
                console.error('Failed to save appointment');
            }
        } catch (error) {
            console.error('Error saving appointment:', error);
        }
    };

    const handleBack = () => {
        router.back();
    };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="apple-title mb-2">Schedule Appointment</h1>
          <p className="apple-body text-gray-600">Choose when we should inspect your device</p>
        </div>
        
        <AppointmentScheduler 
            formData={appointmentFormData}
            setFormData={setAppointmentFormData}
            onDataChange={setAppointmentData} 
            onValidationChange={setIsStepValid} 
        />
        <div className="flex gap-3 mt-8">
            <button 
                onClick={handleBack}
                className="apple-button-secondary flex-1"
            >
                Back
            </button>
            <button 
                onClick={handleNext}
                disabled={!isStepValid}
                className="apple-button-primary flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
            >
                Confirm & Finish
            </button>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SchedulePageContent />
        </Suspense>
    )
}
