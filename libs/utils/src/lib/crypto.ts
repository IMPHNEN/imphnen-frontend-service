import CryptoJS from 'crypto-js';

/**
 * Generate certificate hash using HMAC-SHA256
 * @param userId - User ID
 * @param teamId - Team ID
 * @returns Hash string
 */
export const generateCertificateHash = (userId: string, teamId: string): string => {
  const key = 'imphnenxkolosal';
  const message = userId + teamId;

  // Repeat key to match required length (32 bytes for SHA256)
  const repeatedKey = key.repeat(Math.ceil(32 / key.length)).substring(0, 32);

  // Create HMAC-SHA256 hash
  const hash = CryptoJS.HmacSHA256(message, repeatedKey);
  return hash.toString(CryptoJS.enc.Hex);
};

/**
 * Verify if a certificate hash is valid for a given user and team
 * @param certId - Certificate ID to verify
 * @param userId - User ID
 * @param teamId - Team ID
 * @returns True if the certificate is valid
 */
export const verifyCertificateHash = (certId: string, userId: string, teamId: string): boolean => {
  const generatedHash = generateCertificateHash(userId, teamId);
  return generatedHash === certId;
};
