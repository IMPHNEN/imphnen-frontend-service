import { generateCertificateHash } from './crypto';

/**
 * Generate a certificate URL for a user and team
 * @param userId - User ID
 * @param teamId - Team ID
 * @param baseUrl - Base URL (optional, defaults to current origin)
 * @returns Certificate URL
 */
export const generateCertificateUrl = (
  userId: string,
  teamId: string,
  baseUrl?: string
): string => {
  const certId = generateCertificateHash(userId, teamId);
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}/certificate/${certId}`;
};
