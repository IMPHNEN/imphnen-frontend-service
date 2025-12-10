import { decryptText, encryptText } from "./aesclient";

const SECRET_KEY = 'imphnen-hackathon-2025';

/**
 * Encode teamId and submissionId into a certificate ID
 * Uses base64 encoding for simple obfuscation
 * @param teamId - The team ID
 * @param submissionId - The submission ID
 * @returns Encoded certificate ID
 */
export const encodeCertificateId = async (teamId: string, submissionId: string): Promise<string> => {
  const combined = `${teamId}::${submissionId}`;
  return encryptText(combined, SECRET_KEY);
};

/**
 * Decode certificate ID back to teamId and submissionId
 * @param certId - The encoded certificate ID
 * @returns Object containing teamId and submissionId
 */
export const decodeCertificateId = async (certId: string): Promise<{ teamId: string; submissionId: string }> => {
  try {
    const decoded = await decryptText(certId, SECRET_KEY);
    const [teamId, submissionId] = decoded.split('::');
    return { teamId, submissionId };
  } catch {
    throw new Error('Invalid certificate ID');
  }
};

/**
 * For development: Create a certId using created_at timestamp
 * @param teamId - The team ID
 * @param createdAt - The creation timestamp
 * @returns Encoded certificate ID
 */
export const encodeCertificateIdWithTimestamp = (teamId: string, createdAt: string): string => {
  const combined = `${teamId}::${createdAt}`;
  return Buffer.from(combined).toString('base64');
};
