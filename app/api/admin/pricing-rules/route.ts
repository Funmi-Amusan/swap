import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const rules = await prisma.pricingRule.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(rules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing rules' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, baseModel, condition, priceAdjustment, isPercentage } = body;

    if (!name || baseModel === undefined || priceAdjustment === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const rule = await prisma.pricingRule.create({
      data: {
        name,
        description,
        baseModel,
        condition,
        priceAdjustment,
        isPercentage,
      },
    });

    return NextResponse.json(rule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pricing rule' }, { status: 500 });
  }
}
