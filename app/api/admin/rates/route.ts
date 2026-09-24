import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  try {
    const rates = store.getInterestRates();
    const history = store.getRateHistory();
    return NextResponse.json({ success: true, data: rates, history });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch rate management data' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { loanId, minRate, maxRate, startingRate, rateType, processingFee, notes } = body;

    if (!loanId) {
      return NextResponse.json({ success: false, message: 'Loan ID is required' }, { status: 400 });
    }

    const updated = store.updateLoan(loanId, {
      minInterestRate: Number(minRate),
      maxInterestRate: Number(maxRate),
      startingInterestRate: Number(startingRate),
      interestType: rateType,
      processingFee: processingFee
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Loan product not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Interest rate updated successfully for ${updated.name}`,
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update interest rate' },
      { status: 500 }
    );
  }
}
