export const dynamic = 'force-dynamic';

export async function POST(req) {
  let key = '';
  try {
    const body = await req.json();
    key = String(body.key || '').trim();
  } catch {
    return Response.json({ valid: false }, { status: 400 });
  }
  if (!key || key.length > 200) return Response.json({ valid: false });

  const manual = (process.env.LICENSE_KEYS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (manual.includes(key)) return Response.json({ valid: true });

  if (process.env.LEMONSQUEEZY_VALIDATE === '1') {
    try {
      const res = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ license_key: key }).toString(),
        cache: 'no-store'
      });
      const data = await res.json();
      return Response.json({ valid: data.valid === true });
    } catch {
      return Response.json({ valid: false });
    }
  }
  return Response.json({ valid: false });
}
