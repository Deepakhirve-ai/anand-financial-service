import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      city,
      loanType,
      loanAmount,
      monthlyIncome,
      employmentType,
      businessType,
      propertyType,
      existingEMI,
      preferredContactTime,
      message,
      consent
    } = body;

    if (!name || !phone || !email || !city || !loanType || !loanAmount) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields (Name, Phone, Email, City, Loan Type, Loan Amount).' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, message: 'Consent is required to submit an enquiry.' },
        { status: 400 }
      );
    }

    const newEnquiry = store.addEnquiry({
      name,
      phone,
      email,
      city,
      loanType,
      loanAmount: Number(loanAmount),
      monthlyIncome: Number(monthlyIncome || 0),
      employmentType: employmentType || 'Not specified',
      businessType,
      propertyType,
      existingEMI: Number(existingEMI || 0),
      preferredContactTime,
      message,
      consent: true
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your enquiry has been submitted successfully.',
      enquiryNumber: newEnquiry.enquiryNumber,
      data: newEnquiry
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
