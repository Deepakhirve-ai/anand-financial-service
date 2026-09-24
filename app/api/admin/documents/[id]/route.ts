import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const updated = store.updateDocument(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated, message: 'Document updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update document' },
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
    const deleted = store.deleteDocument(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Document deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete document' },
      { status: 500 }
    );
  }
}
