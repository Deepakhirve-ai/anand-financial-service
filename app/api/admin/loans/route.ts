import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  try {
    const loans = store.getLoans();
    return NextResponse.json({ success: true, data: loans });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch loans' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newLoan = store.addLoan(body);
    return NextResponse.json({ success: true, data: newLoan, message: 'Loan product added successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to add loan product' },
      { status: 500 }
    );
  }
}
