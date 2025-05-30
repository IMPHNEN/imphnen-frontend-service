import { headers } from 'next/headers';

export async function getRemoteIp() {
  const hdrs = await headers();
  const xff = hdrs.get('x-forwarded-for');
  if (!xff) return undefined;

  // 'x-forwarded-for' can be a comma-separated list of IPs
  const ips = xff.split(',').map((ip) => ip.trim());
  return ips[0] || undefined;
}
