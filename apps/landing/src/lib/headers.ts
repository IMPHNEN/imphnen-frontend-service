import { headers } from 'next/headers';

export async function getRemoteIp() {
  const hdrs = await headers();
  const xff = hdrs.get('x-forwarded-for');
  if (!xff) return undefined;

  const ips = xff.split(',').map((ip) => ip.trim());
  return ips[0] || undefined;
}
