import Link from 'next/link';

export default function ConfirmPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-neutral-800 rounded-2xl shadow-2xl p-8 text-center border border-neutral-700">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Swap Request Submitted!</h1>
        <p className="text-neon-green font-semibold mb-2">Thank you for using SWAPPED.</p>
        <p className="text-gray-300 mb-6">We have received your request and will contact you soon to finalize your swap and appointment.</p>
        <Link href="/tradein" legacyBehavior>
          <a className="bg-purple-700 hover:bg-neon-green text-white font-bold py-2 px-6 rounded transition border-2 border-neon-green">Start New Trade-in</a>
        </Link>
      </div>
      <style jsx global>{`
        .text-neon-green { color: #39ff14; }
        .bg-neon-green { background-color: #39ff14; }
        .border-neon-green { border-color: #39ff14; }
      `}</style>
    </div>
  );
}
