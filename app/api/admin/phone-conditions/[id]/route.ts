import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const condition = await prisma.phoneCondition.findUnique({
      where: { id },
    });

    if (!condition) {
      return NextResponse.json({ error: 'Phone condition not found' }, { status: 404 });
    }

    return NextResponse.json(condition);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch phone condition' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const condition = await prisma.phoneCondition.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(condition);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update phone condition' }, { status: 500 });
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

    await prisma.phoneCondition.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete phone condition' }, { status: 500 });
  }
}
