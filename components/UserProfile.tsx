"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-sm font-medium text-gray-700">
          {session.user?.name}
        </span>
        <div className="relative group">
          <Image
            src={session.user?.image ?? "/swapped-logo.png"}
            alt={session.user?.name ?? "User Avatar"}
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-300 cursor-pointer"
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
            <button
              onClick={() => signOut()}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      Sign In
    </button>
  );
}
