import { TOOLS, BUSINESSES } from '../lib/data';
const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export default function sitemap() {
  const now = new Date();
  return [
    { url: site, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...TOOLS.map((t) => ({ url: `${site}/tools/${t.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 })),
    ...BUSINESSES.map((b) => ({ url: `${site}/for/${b.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 }))
  ];
}
