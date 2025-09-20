"use client";

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
    const { data: session } = useSession();

    const handleNext = async () => {
        if (!swapId || !session?.user?.id || !appointmentData) return;

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    swapId,
                    userId: session.user.id,
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
    <div className="min-h-screen p-5 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <AppointmentScheduler 
            formData={appointmentFormData}
            setFormData={setAppointmentFormData}
            onDataChange={setAppointmentData} 
            onValidationChange={setIsStepValid} 
        />
        <div className="mt-8 flex justify-between">
            <button 
                onClick={handleBack}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition duration-300"
            >
                Back
            </button>
            <button 
                onClick={handleNext}
                disabled={!isStepValid}
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Next: Confirm & Finish
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
