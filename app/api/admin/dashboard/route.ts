import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  try {
    const enquiries = store.getEnquiries();
    const loans = store.getLoans();
    const settings = store.getSettings();

    const totalEnquiries = enquiries.length;
    const newEnquiries = enquiries.filter(e => e.status === 'New').length;
    const homeLoanEnquiries = enquiries.filter(e => e.loanType === 'Home Loan').length;
    const businessLoanEnquiries = enquiries.filter(e => e.loanType === 'Business Loan').length;
    const lapEnquiries = enquiries.filter(e => e.loanType === 'Loan Against Property').length;
    const activeLoanProducts = loans.filter(l => l.status === 'ACTIVE').length;

    // Find latest rate update date
    const lastRateUpdate = settings.lastUpdated;

    return NextResponse.json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        homeLoanEnquiries,
        businessLoanEnquiries,
        lapEnquiries,
        activeLoanProducts,
        lastRateUpdate
      },
      recentEnquiries: enquiries.slice(0, 5),
      rateHistory: store.getRateHistory().slice(0, 5)
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
