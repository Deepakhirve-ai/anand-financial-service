import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  try {
    const docs = store.getDocuments();
    return NextResponse.json({ success: true, data: docs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newDoc = store.addDocument(body);
    return NextResponse.json({ success: true, data: newDoc, message: 'Document added successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to add document' },
      { status: 500 }
    );
  }
}
