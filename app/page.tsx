import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-5 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to SWAPPED</h1>
        <p className="text-lg text-gray-600 mb-8">
          The easiest way to trade in your old iPhone for a new one. Get an instant estimate and schedule a swap.
        </p>
        <Link href="/tradein" legacyBehavior>
          <a className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg transition duration-300 text-xl">
            Start Your Trade-In
          </a>
        </Link>
      </div>
    </main>
  );
}


