"use client";

"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Appointment {
    id: string;
    swapId: string;
    userId: string;
    appointmentType: string;
    date: string;
    time: string;
    createdAt: string;
    updatedAt: string;
}

export default function ConfirmPage() {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchLatestAppointment = async () => {
            if (session?.user?.id) {
                try {
                    const response = await fetch(`/api/appointments?userId=${session.user.id}`);
                    if (response.ok) {
                        const apps = await response.json();
                        if (apps.length > 0) {
                            setAppointment(apps[0]);
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch appointment', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (session) {
            fetchLatestAppointment();
        } else if (session === null) {
            setLoading(false);
        }
    }, [session]);

  return (
    <div className="min-h-screen p-5 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-black mb-4">Swap Request Submitted!</h1>
        <p className="text-green-600 font-semibold mb-2">Thank you for using SWAPPED.</p>
        <p className="text-gray-500 mb-6">We have received your request and will send you an email to confirm your appointment. The price is not final until we complete our inspections</p>
        
        {loading ? (
            <p>Loading appointment details...</p>
        ) : appointment ? (
            <div className="text-left my-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Your Appointment Details:</h3>
                <p><strong>Type:</strong> {appointment.appointmentType}</p>
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
            </div>
        ) : (
            <p>Could not retrieve appointment details.</p>
        )}

        <Link href="/tradein" legacyBehavior>
          <a className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Start New Trade-in</a>
        </Link>
      </div>
    </div>
  );
}
