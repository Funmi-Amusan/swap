"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (session) {
    router.push('/tradein');
    return null;
  }

  return (
    <div className="min-h-screen p-5 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
        <Image src="/swapped-logo.png" alt="SWAPPED Logo" width={120} height={120} className="mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-black mb-2">Sign in to SWAPPED</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in with your Google account to start your phone swap journey.</p>
        <button
          onClick={() => signIn('google')}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
