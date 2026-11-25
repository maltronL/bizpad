import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BUSINESSES, bizBySlug, toolBySlug } from '../../../lib/data';
import JsonLd from '../../../components/JsonLd';

export const dynamicParams = false;
export const generateStaticParams = () => BUSINESSES.map((b) => ({ slug: b.slug }));

export function generateMetadata({ params }) {
  const b = bizBySlug(params.slug);
  if (!b) return {};
  return { title: b.h1, description: b.intro, alternates: { canonical: `/for/${b.slug}` }, openGraph: { title: b.h1, description: b.intro, type: 'website' } };
}

export default function ForPage({ params }) {
  const b = bizBySlug(params.slug);
  if (!b) notFound();
  return (
    <main>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: b.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
      <section className="page-head">
        <p className="crumb"><Link href="/">Bizpad</Link> / {b.name}</p>
        <h1>{b.h1}</h1>
        <p className="lead">{b.intro}</p>
      </section>
      <section className="block prose">
        <h2>Problems we hear about</h2>
        <ul>{b.pains.map((p) => <li key={p}>{p}</li>)}</ul>
        <h2>What to use</h2>
        <div className="grid">
          {b.uses.map(([slug, how]) => {
            const t = toolBySlug(slug);
            return (<Link key={slug} href={`/tools/${slug}`} className="tool"><h3>{t.name}</h3><p>{how}</p></Link>);
          })}
        </div>
        <h2>Questions</h2>
        {b.faq.map(([q, a]) => (<div key={q}><h3>{q}</h3><p>{a}</p></div>))}
        <h2>Other businesses</h2>
        <ul className="chips">{BUSINESSES.filter((x) => x.slug !== b.slug).map((x) => <li key={x.slug}><Link href={`/for/${x.slug}`}>{x.name}</Link></li>)}</ul>
      </section>
    </main>
  );
}
