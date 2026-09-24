import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  try {
    const loans = store.getLoans();
    return NextResponse.json({ success: true, data: loans });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch loan products' },
      { status: 500 }
    );
  }
}
