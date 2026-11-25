import './globals.css';
import Link from 'next/link';
import ProProvider from '../components/ProProvider';
import { TOOLS, BUSINESSES } from '../lib/data';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(site),
  title: { default: 'Bizpad – Free business tools for shops, sellers and small businesses', template: '%s | Bizpad' },
  description: 'Free receipts, sales book, debtors book, stock list and price calculator for tuckshops, airtime sellers, street vendors and small businesses. Works on your phone.',
  applicationName: 'Bizpad',
  openGraph: { type: 'website', siteName: 'Bizpad', title: 'Bizpad – Free business tools for small businesses', description: 'Receipts, sales book, debtors and stock for small shops. Free on your phone.' },
  alternates: { canonical: '/' }
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#1747d6' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProProvider>
          <header className="top">
            <Link href="/" className="brand">Bizpad</Link>
            <nav aria-label="Main"><Link href="/#tools">Tools</Link><Link href="/#for">Who it’s for</Link><Link href="/#pro">Pro</Link></nav>
          </header>
          {children}
          <footer className="foot">
            <div>
              <h2>Tools</h2>
              <ul>{TOOLS.map((t) => <li key={t.slug}><Link href={`/tools/${t.slug}`}>{t.name}</Link></li>)}</ul>
            </div>
            <div>
              <h2>Made for</h2>
              <ul>{BUSINESSES.map((b) => <li key={b.slug}><Link href={`/for/${b.slug}`}>{b.name}</Link></li>)}</ul>
            </div>
            <p className="small">© {new Date().getFullYear()} Bizpad. Your records stay on your own device.</p>
          </footer>
        </ProProvider>
      </body>
    </html>
  );
}
