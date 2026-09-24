import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'anand_financial_service_jwt_secret_key_2026_secure';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN';
}

export function signAdminToken(user: AdminUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyAdminToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminUser;
    if (decoded && decoded.role === 'ADMIN') {
      return decoded;
    }
    return null;
  } catch (error) {
    return null;
  }
}
