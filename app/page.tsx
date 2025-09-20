"use client";
import { IPhoneCalculator } from "../components/iphone-calculator";
import { useState } from "react";

export default function Home() {
  const [price, setPrice] = useState(0);
  return (
    <main className="min-h-screen p-5 flex items-center justify-center">
      <IPhoneCalculator onPriceChange={setPrice} />
    </main>
  );
}

