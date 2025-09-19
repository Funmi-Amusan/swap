import Link from 'next/link';
import { IPhoneCalculator } from '../../components/iphone-calculator';

export default function TradeInPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <IPhoneCalculator />
        <div className="mt-8 flex justify-center">
          <Link href="/tradein/schedule" legacyBehavior>
            <a className="bg-purple-700 hover:bg-neon-green text-white font-bold py-2 px-6 rounded transition border-2 border-neon-green">Next: Schedule Appointment</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
