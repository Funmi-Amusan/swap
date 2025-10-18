import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const swapId = searchParams.get('swapId');

  if (!swapId) {
    return NextResponse.json({ error: 'swapId is required' }, { status: 400 });
  }

  try {
    const swap = await prisma.swap.findUnique({
      where: { id: swapId },
      include: { appointment: true }
    });

    if (!swap) {
      return NextResponse.json({ error: 'Swap not found' }, { status: 404 });
    }

    return NextResponse.json(swap);
  } catch (error) {
    console.error('Error fetching swap:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      tradeInPhone,
      newPhone,
      contactEmail,
      swapMethod,
      tradeInValue,
      newPhonePrice,
      amountToPay,
    } = data;

    if (!tradeInPhone || !newPhone || tradeInValue === undefined || newPhonePrice === undefined || amountToPay === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Store contactEmail and swapMethod in the tradeInPhone JSON for now
    const tradeInPhoneWithExtras = {
      ...tradeInPhone,
      contactEmail,
      swapMethod,
    };

    const swap = await prisma.swap.create({
      data: {
        tradeInPhone: tradeInPhoneWithExtras,
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
