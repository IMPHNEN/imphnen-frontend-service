export async function fetchPostverifyTurnstile(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const params = new URLSearchParams({
    secret: String(process.env.TURNSTILE_SECRET_KEY),
    response: token,
  });
  if (remoteIp) {
    params.append('remoteip', remoteIp);
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    console.error('Turnstile verify HTTP error', res.status);
    return false;
  }

  const data = (await res.json()) as TurnstileVerifyResponse;
  if (!data.success) {
    console.warn('Turnstile failure', data['error-codes']);
    return false;
  }

  return true;
}

interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}
