import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const conditions = await prisma.phoneCondition.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(conditions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch phone conditions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, value, description, priceModifier } = body;

    if (!label || !value || priceModifier === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const condition = await prisma.phoneCondition.create({
      data: {
        label,
        value,
        description,
        priceModifier,
      },
    });

    return NextResponse.json(condition, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create phone condition' }, { status: 500 });
  }
}
