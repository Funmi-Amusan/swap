import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      userId,
      tradeInPhone,
      newPhone,
      tradeInValue,
      newPhonePrice,
      amountToPay,
    } = data;

    if (!userId || !tradeInPhone || !newPhone || tradeInValue === undefined || newPhonePrice === undefined || amountToPay === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const swap = await prisma.swap.create({
      data: {
        userId,
        tradeInPhone,
        newPhone,
        tradeInValue,
        newPhonePrice,
        amountToPay,
      },
    });

    return NextResponse.json(swap, { status: 201 });
  } catch (error) {
    console.error('Error creating swap:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
