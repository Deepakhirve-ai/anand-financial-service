import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const updated = store.updateLoan(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Loan product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated, message: 'Loan product updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update loan product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const deleted = store.deleteLoan(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Loan product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Loan product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete loan product' },
      { status: 500 }
    );
  }
}
