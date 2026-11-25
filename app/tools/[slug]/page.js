import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TOOLS, BUSINESSES, toolBySlug } from '../../../lib/data';
import ToolLoader from '../../../components/ToolLoader';
import JsonLd from '../../../components/JsonLd';

export const dynamicParams = false;
export const generateStaticParams = () => TOOLS.map((t) => ({ slug: t.slug }));

export function generateMetadata({ params }) {
  const t = toolBySlug(params.slug);
  if (!t) return {};
  return { title: t.title, description: t.desc, alternates: { canonical: `/tools/${t.slug}` }, openGraph: { title: t.title, description: t.desc, type: 'website' } };
}

export default function ToolPage({ params }) {
  const t = toolBySlug(params.slug);
  if (!t) notFound();
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const users = BUSINESSES.filter((b) => b.uses.some(([s]) => s === t.slug)).slice(0, 8);
  return (
    <main>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: t.title, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', url: `${site}/tools/${t.slug}`, description: t.desc, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
      <section className="page-head">
        <p className="crumb"><Link href="/">Bizpad</Link> / {t.name}</p>
        <h1>{t.title}</h1>
        <p className="lead">{t.desc}</p>
      </section>
      <section className="block tight"><ToolLoader slug={t.slug} /></section>
      <section className="block prose">
        <h2>How it works</h2>
        <ol>{t.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        <h2>Questions</h2>
        {t.faqs.map(([q, a]) => (<div key={q}><h3>{q}</h3><p>{a}</p></div>))}
        {users.length > 0 && (<><h2>Used by</h2><ul className="chips">{users.map((b) => <li key={b.slug}><Link href={`/for/${b.slug}`}>{b.name}</Link></li>)}</ul></>)}
        <h2>More tools</h2>
        <ul className="chips">{TOOLS.filter((x) => x.slug !== t.slug).map((x) => <li key={x.slug}><Link href={`/tools/${x.slug}`}>{x.name}</Link></li>)}</ul>
      </section>
    </main>
  );
}
