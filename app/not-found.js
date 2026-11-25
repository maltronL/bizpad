import Link from 'next/link';
export default function NotFound() {
  return (<main><section className="page-head"><h1>Page not found</h1><p className="lead">That page does not exist. <Link href="/">Go to the Bizpad home page</Link> or open the <Link href="/tools/sales-book">sales book</Link>.</p></section></main>);
}
