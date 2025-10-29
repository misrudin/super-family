import { NextApiRequest } from 'next';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Mendapatkan informasi user yang sudah terautentikasi dari middleware headers
 * @param req NextApiRequest object
 * @returns AuthenticatedUser atau null jika tidak ada
 */
export function getAuthenticatedUser(req: NextApiRequest): AuthenticatedUser | null {
  const userId = req.headers['x-user-id'] as string;
  const userEmail = req.headers['x-user-email'] as string;
  const userRole = req.headers['x-user-role'] as string;

  if (!userId || !userEmail || !userRole) {
    return null;
  }

  return {
    id: userId,
    email: userEmail,
    role: userRole,
  };
}

/**
 * Middleware helper untuk memeriksa apakah user memiliki role tertentu
 * @param req NextApiRequest object
 * @param requiredRole Role yang diperlukan
 * @returns boolean
 */
export function hasRole(req: NextApiRequest, requiredRole: string): boolean {
  const user = getAuthenticatedUser(req);
  return user?.role === requiredRole;
}

/**
 * Middleware helper untuk memeriksa apakah user adalah admin
 * @param req NextApiRequest object
 * @returns boolean
 */
export function isAdmin(req: NextApiRequest): boolean {
  return hasRole(req, 'admin');
}

/**
 * Middleware helper untuk memeriksa apakah user adalah member
 * @param req NextApiRequest object
 * @returns boolean
 */
export function isMember(req: NextApiRequest): boolean {
  return hasRole(req, 'member');
}
