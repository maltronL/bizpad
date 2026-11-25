import Link from 'next/link';
import { TOOLS, BUSINESSES, SITE_NAME } from '../lib/data';
import JsonLd from '../components/JsonLd';

const checkout = process.env.NEXT_PUBLIC_CHECKOUT_URL || '#pro';
const price = process.env.NEXT_PUBLIC_PRO_PRICE || '$5';

export default function Home() {
  return (
    <main>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' }} />
      <section className="hero">
        <h1>Your shop’s notebook, on your phone.</h1>
        <p>Receipts, daily sales, who owes you, stock and prices. Free to use, no sign-up, and your records stay on your phone.</p>
        <Link className="btn big" href="/tools/sales-book">Open today’s sales book</Link>
      </section>

      <section id="tools" className="block">
        <h2>Everything a small business writes down</h2>
        <div className="grid">
          {TOOLS.map((t) => (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="tool">
              <h3>{t.name}</h3>
              <p>{t.pitch}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="for" className="block">
        <h2>Made for the way you really work</h2>
        <p className="lead">Tuckshop, stall, salon, garage or farm. Pick your business to see how Bizpad fits.</p>
        <ul className="chips">
          {BUSINESSES.map((b) => <li key={b.slug}><Link href={`/for/${b.slug}`}>{b.name}</Link></li>)}
        </ul>
      </section>

      <section id="pro" className="block">
        <h2>Free for everyday use. Pro for a business that looks the part.</h2>
        <div className="plans">
          <div className="card">
            <h3>Free</h3>
            <p className="price">$0</p>
            <ul><li>All six tools, no limits</li><li>Send receipts on WhatsApp</li><li>Download your data as CSV</li><li>Small Bizpad line on documents</li></ul>
          </div>
          <div className="card pro">
            <h3>Pro</h3>
            <p className="price">{price}<span>/month</span></p>
            <ul><li>Your logo and colour on receipts and invoices</li><li>No Bizpad line on documents</li><li>Backup and restore when you change phones</li></ul>
            <a className="btn big" href={checkout}>Get Pro</a>
            <p className="small">After payment you receive a license key. Enter it on the receipts page or in your <Link href="/account">account page</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
