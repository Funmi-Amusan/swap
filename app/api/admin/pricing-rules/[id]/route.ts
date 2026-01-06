import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const rule = await prisma.pricingRule.findUnique({
      where: { id },
    });

    if (!rule) {
      return NextResponse.json({ error: 'Pricing rule not found' }, { status: 404 });
    }

    return NextResponse.json(rule);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing rule' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const rule = await prisma.pricingRule.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(rule);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing rule' }, { status: 500 });
  }
}

// Alias PATCH to PUT for compatibility
export const PATCH = PUT;

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    await prisma.pricingRule.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete pricing rule' }, { status: 500 });
  }
}
