import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  try {
    const rates = store.getInterestRates();
    const settings = store.getSettings();
    return NextResponse.json({
      success: true,
      data: rates,
      disclaimer: settings.disclaimer,
      bankDisclosure: settings.bankDisclosure,
      lastUpdated: settings.lastUpdated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch interest rates' },
      { status: 500 }
    );
  }
}
