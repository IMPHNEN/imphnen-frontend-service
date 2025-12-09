const enc = new TextEncoder();
const dec = new TextDecoder();

function randBytes(len: number): Uint8Array {
  const b = new Uint8Array(len);
  crypto.getRandomValues(b);
  return b;
}

function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function base64ToBuf(b64: string): ArrayBuffer {
  const s = atob(b64);
  const arr = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) arr[i] = s.charCodeAt(i);
  return arr.buffer;
}

async function deriveKeyFromPassphrase(passphrase: string, salt: Uint8Array, iterations = 100_000) {
  const passKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256'
    },
    passKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts plaintext with passphrase -> returns base64(salt||iv||ciphertext)
 */
export async function encryptText(plaintext: string, passphrase: string) {
  const salt = randBytes(16); // 128-bit salt
  const iv = randBytes(12);   // 96-bit IV recommended for GCM
  const key = await deriveKeyFromPassphrase(passphrase, salt);

  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );

  // concat salt + iv + ciphertext
  const out = new Uint8Array(salt.length + iv.length + cipher.byteLength);
  out.set(salt, 0);
  out.set(iv, salt.length);
  out.set(new Uint8Array(cipher), salt.length + iv.length);

  return bufToBase64(out.buffer);
}

/**
 * Decrypts base64(salt||iv||ciphertext) with passphrase -> plaintext
 */
export async function decryptText(b64combined: string, passphrase: string) {
  const combined = new Uint8Array(base64ToBuf(b64combined));
  const salt = combined.slice(0, 16);
  const iv = combined.slice(16, 28);
  const cipher = combined.slice(28);

  const key = await deriveKeyFromPassphrase(passphrase, salt);
  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    cipher
  );
  return dec.decode(plainBuf);
}
