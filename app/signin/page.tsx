"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>;
  }

  if (session) {
    router.push('/tradein');
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center">
      <div className="bg-neutral-800 rounded-2xl shadow-2xl p-8 text-center border border-neutral-700 w-full max-w-md">
        <Image src="/chrome-icon.png" alt="Chrome Icon" width={48} height={48} className="mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Sign in to SWAPPED</h1>
        <button
          onClick={() => signIn('google')}
          className="w-full bg-neon-green hover:bg-purple-700 text-black font-bold py-2 px-4 rounded transition border-2 border-purple-700"
        >
          Sign in with Google
        </button>
      </div>
      <style jsx global>{`
        .bg-neon-green { background-color: #39ff14; }
      `}</style>
    </div>
  );
}
