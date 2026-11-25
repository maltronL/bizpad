import AccountPanel from '../../components/AccountPanel';
export const metadata = { title: 'Your Pro account', robots: { index: false, follow: false } };
export default function Account() {
  return (<main><section className="page-head"><h1>Your Pro account</h1></section><section className="block tight"><AccountPanel /></section></main>);
}
