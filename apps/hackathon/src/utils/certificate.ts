import { decryptText, encryptText } from "./aesclient";

const SECRET_KEY = 'imphnen-hackathon-2025';

/**
 * Encode teamId, submissionId, and userId into a certificate ID
 * Uses AES encryption for secure encoding
 * @param teamId - The team ID
 * @param submissionId - The submission ID
 * @param userId - The user ID (team member)
 * @returns Encoded certificate ID
 */
export const encodeCertificateId = async (teamId: string, submissionId: string, userId: string): Promise<string> => {
  const combined = `${teamId}::${submissionId}::${userId}`;
  return encryptText(combined, SECRET_KEY);
};

/**
 * Encode winner certificate ID (team-based)
 * @param teamId - Winner team ID
 * @returns Encoded winner certificate ID
 */
export const encodeWinnerCertificateId = async (teamId: string): Promise<string> => {
  const combined = `winner::${teamId}`;
  return encryptText(combined, SECRET_KEY);
};

/**
 * Decode certificate ID back to teamId, submissionId, and userId
 * @param certId - The encoded certificate ID
 * @returns Object containing teamId, submissionId, and userId
 */
export const decodeCertificateId = async (certId: string): Promise<{ teamId: string; submissionId: string; userId: string }> => {
  try {
    const decoded = await decryptText(certId, SECRET_KEY);
    const parts = decoded.split('::');

    // Handle both old format (teamId::submissionId) and new format (teamId::submissionId::userId)
    if (parts.length === 2) {
      const [teamId, submissionId] = parts;
      return { teamId, submissionId, userId: '' };
    } else if (parts.length === 3) {
      const [teamId, submissionId, userId] = parts;
      return { teamId, submissionId, userId };
    }

    throw new Error('Invalid certificate format');
  } catch {
    throw new Error('Invalid certificate ID');
  }
};

/**
 * Decode winner certificate ID back to teamId
 * @param certId - The encoded winner certificate ID
 * @returns Object containing teamId
 */
export const decodeWinnerCertificateId = async (certId: string): Promise<{ teamId: string }> => {
  try {
    const decoded = await decryptText(certId, SECRET_KEY);
    const parts = decoded.split('::');

    // winner::teamId
    if (parts.length === 2 && parts[0] === 'winner') {
      return { teamId: parts[1] };
    }

    throw new Error('Invalid winner certificate format');
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
