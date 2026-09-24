import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Default admin validation
    if (email === 'admin@anandfinancial.com' && password === 'Admin@123456') {
      const user = {
        id: 'admin-1',
        email: 'admin@anandfinancial.com',
        name: 'Administrator',
        role: 'ADMIN' as const
      };

      const token = signAdminToken(user);

      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user,
        token
      });

      // Set cookie
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid admin credentials. Please check email and password.' },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
