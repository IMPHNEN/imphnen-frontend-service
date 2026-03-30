import { decryptText, encryptText } from "./aesclient";

const SECRET_KEY = 'imphnen-hackathon-2025';

export const encodeCertificateId = async (teamId: string, submissionId: string, userId: string): Promise<string> => {
  const combined = `${teamId}::${submissionId}::${userId}`;
  return encryptText(combined, SECRET_KEY);
};

export const encodeWinnerCertificateId = async (teamId: string): Promise<string> => {
  const combined = `winner::${teamId}`;
  return encryptText(combined, SECRET_KEY);
};

export const decodeCertificateId = async (certId: string): Promise<{ teamId: string; submissionId: string; userId: string }> => {
  try {
    const decoded = await decryptText(certId, SECRET_KEY);
    const parts = decoded.split('::');

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

export const decodeWinnerCertificateId = async (certId: string): Promise<{ teamId: string }> => {
  try {
    const decoded = await decryptText(certId, SECRET_KEY);
    const parts = decoded.split('::');

    if (parts.length === 2 && parts[0] === 'winner') {
      return { teamId: parts[1] };
    }

    throw new Error('Invalid winner certificate format');
  } catch {
    throw new Error('Invalid certificate ID');
  }
};

export const encodeCertificateIdWithTimestamp = (teamId: string, createdAt: string): string => {
  const combined = `${teamId}::${createdAt}`;
  return Buffer.from(combined).toString('base64');
};
