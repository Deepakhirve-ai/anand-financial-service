import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const loan = store.getLoanBySlug(slug);

    if (!loan) {
      return NextResponse.json(
        { success: false, message: 'Loan product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: loan });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch loan details' },
      { status: 500 }
    );
  }
}
