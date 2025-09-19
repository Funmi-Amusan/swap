import { AppointmentScheduler } from '../../../components/AppointmentScheduler';
import Link from 'next/link';

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <AppointmentScheduler />
        <div className="mt-8 flex justify-center">
          <Link href="/tradein/confirm" legacyBehavior>
            <a className="bg-purple-700 hover:bg-neon-green text-white font-bold py-2 px-6 rounded transition border-2 border-neon-green">Next: Confirm & Finish</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
