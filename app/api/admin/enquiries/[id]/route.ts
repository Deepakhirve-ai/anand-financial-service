import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const { status, adminNotes } = body;

    const updated = store.updateEnquiryStatus(id, status, adminNotes);

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated, message: 'Enquiry status updated' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update enquiry' },
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
    const deleted = store.deleteEnquiry(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}
