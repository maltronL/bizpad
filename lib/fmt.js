export const CURRENCIES = ['USD', 'ZWG', 'ZAR', 'EUR', 'GBP', 'KES', 'NGN', 'BWP', 'MZN', 'INR', 'AUD', 'CAD'];
export const today = () => new Date().toISOString().slice(0, 10);
export const plus = (d) => new Date(Date.now() + d * 864e5).toISOString().slice(0, 10);
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
export const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };
export function money(n, cur = 'USD') {
  try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: cur }).format(n || 0); }
  catch { return cur + ' ' + (Number(n) || 0).toFixed(2); }
}
export function download(name, text, type = 'text/csv') {
  const b = new Blob([text], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(b); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}
export const csvEsc = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';
export function wa(text, phone) {
  let p = String(phone || '').replace(/[^\d]/g, '');
  if (p.startsWith('0')) p = '263' + p.slice(1); // Zimbabwe default; use full international format for other countries
  return 'https://wa.me/' + p + '?text=' + encodeURIComponent(text);
}
