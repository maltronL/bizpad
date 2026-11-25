'use client';
import { useMemo, useState } from 'react';
import { useStore } from '../lib/store';
import { usePro } from './ProProvider';
import UnlockBox from './UnlockBox';
import CurrencyPicker from './CurrencyPicker';
import { money, num, today, plus, uid, wa } from '../lib/fmt';

const COLORS = ['#1747d6', '#0f766e', '#9333ea', '#be123c', '#b45309', '#10233f'];
const PREFIX = { Invoice: 'INV', Receipt: 'REC', Quotation: 'QUO' };
const METHODS = ['Cash', 'EcoCash', 'Card', 'Bank transfer', 'Other'];
const initial = () => ({
  type: 'Receipt', number: 'REC-001', issued: today(), due: plus(7), currency: 'USD', method: 'Cash',
  fromName: '', fromPhone: '', fromAddress: '', toName: '', toPhone: '',
  items: [{ id: 'first', desc: '', qty: 1, rate: 0 }], tax: 0,
  notes: 'Thank you for your business.', color: COLORS[0], logo: ''
});

export default function DocMaker() {
  const [d, setD, ready] = useStore('bizpad_doc', initial());
  const { pro } = usePro();
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setD((p) => ({ ...p, [k]: e.target.value }));
  const setItem = (id, k, v) => setD((p) => ({ ...p, items: p.items.map((i) => (i.id === id ? { ...i, [k]: v } : i)) }));
  const { sub, taxAmt, total } = useMemo(() => {
    const s = (d.items || []).reduce((a, i) => a + num(i.qty) * num(i.rate), 0);
    const t = s * (num(d.tax) / 100);
    return { sub: s, taxAmt: t, total: s + t };
  }, [d.items, d.tax]);
  if (!ready) return <div className="loading">Opening your notebook…</div>;

  const accent = pro ? d.color : COLORS[0];
  const totalLabel = d.type === 'Receipt' ? 'Total paid' : d.type === 'Invoice' ? 'Total due' : 'Total';
  const changeType = (e) => {
    const type = e.target.value;
    setD((p) => ({ ...p, type, number: /^(INV|REC|QUO)-/.test(p.number) ? p.number.replace(/^[A-Z]{3}/, PREFIX[type]) : p.number }));
  };
  const share = () => {
    const lines = d.items.filter((i) => i.desc || num(i.rate)).map((i) => `${num(i.qty)} x ${i.desc || 'Item'} = ${money(num(i.qty) * num(i.rate), d.currency)}`);
    const text = [`${d.type} ${d.number}`, d.fromName, '', ...lines, '', `${totalLabel}: ${money(total, d.currency)}`, d.type === 'Invoice' ? `Please pay by ${d.due}` : '', d.type === 'Receipt' ? `Paid by ${d.method}` : '', d.notes].filter((x, i, a) => x !== '' || a[i - 1] !== '').join('\n');
    window.open(wa(text, d.toPhone), '_blank', 'noopener');
  };
  const onLogo = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 500 * 1024) { setMsg('Logo must be under 500 KB.'); return; }
    const rd = new FileReader();
    rd.onload = () => { setD((p) => ({ ...p, logo: String(rd.result) })); setMsg(''); };
    rd.readAsDataURL(f);
  };

  return (
    <div className="workspace">
      <div className="card form">
        <div className="row">
          <label>Document
            <select value={d.type} onChange={changeType}>{Object.keys(PREFIX).map((t) => <option key={t}>{t}</option>)}</select>
          </label>
          <label>Number<input value={d.number} onChange={set('number')} /></label>
        </div>
        <div className="row">
          <CurrencyPicker value={d.currency} onChange={(v) => setD((p) => ({ ...p, currency: v }))} />
          <label>Date<input type="date" value={d.issued} onChange={set('issued')} /></label>
        </div>
        {d.type !== 'Receipt' && <label>{d.type === 'Invoice' ? 'Pay by' : 'Valid until'}<input type="date" value={d.due} onChange={set('due')} /></label>}
        {d.type === 'Receipt' && <label>Paid by<select value={d.method} onChange={set('method')}>{METHODS.map((m) => <option key={m}>{m}</option>)}</select></label>}

        <h3>Your business</h3>
        <label>Name<input value={d.fromName} onChange={set('fromName')} /></label>
        <div className="row">
          <label>Phone<input inputMode="tel" value={d.fromPhone} onChange={set('fromPhone')} /></label>
          <label>Address<input value={d.fromAddress} onChange={set('fromAddress')} /></label>
        </div>
        <h3>Customer</h3>
        <div className="row">
          <label>Name<input value={d.toName} onChange={set('toName')} /></label>
          <label>WhatsApp number<input inputMode="tel" value={d.toPhone} onChange={set('toPhone')} /></label>
        </div>

        <h3>Items</h3>
        {d.items.map((i) => (
          <div className="item" key={i.id}>
            <input aria-label="Description" placeholder="What was sold" value={i.desc} onChange={(e) => setItem(i.id, 'desc', e.target.value)} />
            <input aria-label="Quantity" inputMode="decimal" value={i.qty} onChange={(e) => setItem(i.id, 'qty', e.target.value)} />
            <input aria-label="Price each" inputMode="decimal" value={i.rate} onChange={(e) => setItem(i.id, 'rate', e.target.value)} />
            <button type="button" className="ghost" aria-label="Remove item" onClick={() => setD((p) => ({ ...p, items: p.items.filter((x) => x.id !== i.id) }))}>×</button>
          </div>
        ))}
        <button type="button" className="ghost" onClick={() => setD((p) => ({ ...p, items: [...p.items, { id: uid(), desc: '', qty: 1, rate: 0 }] }))}>Add item</button>
        <div className="row">
          <label>Tax or VAT %<input inputMode="decimal" value={d.tax} onChange={set('tax')} /></label>
          <span />
        </div>
        <label>Note<textarea rows="2" value={d.notes} onChange={set('notes')} /></label>

        <h3>Your branding</h3>
        {pro ? (
          <>
            <label>Logo (PNG or JPG, under 500 KB)<input type="file" accept="image/png,image/jpeg" onChange={onLogo} /></label>
            <div className="swatches" role="group" aria-label="Brand colour">
              {COLORS.map((c) => (
                <button key={c} type="button" aria-label={`Colour ${c}`} aria-pressed={d.color === c} className={d.color === c ? 'sw on' : 'sw'} style={{ background: c }} onClick={() => setD((p) => ({ ...p, color: c }))} />
              ))}
            </div>
            {d.logo && <button type="button" className="ghost" onClick={() => setD((p) => ({ ...p, logo: '' }))}>Remove logo</button>}
          </>
        ) : <UnlockBox note="Pro adds your logo and colour and removes the Bizpad footer." />}
        {msg && <p className="msg" role="status">{msg}</p>}
      </div>

      <div className="preview">
        <div className="row">
          <button type="button" className="btn big" onClick={share}>Send on WhatsApp</button>
          <button type="button" className="btn big alt" onClick={() => window.print()}>Save as PDF</button>
        </div>
        <article className="sheet" style={{ '--doc': accent }}>
          <header className="sheet-head">
            <div>
              {pro && d.logo && <img src={d.logo} alt="" className="logo" />}
              <h2>{d.type}</h2>
              <p className="muted">{d.number}</p>
            </div>
            <div className="right">
              <p><strong>{d.fromName || 'Your business'}</strong></p>
              {d.fromPhone && <p>{d.fromPhone}</p>}
              {d.fromAddress && <p>{d.fromAddress}</p>}
            </div>
          </header>
          <div className="meta">
            <div><p className="muted">For</p><p><strong>{d.toName || 'Customer'}</strong></p></div>
            <div className="right">
              <p className="muted">Date</p><p>{d.issued}</p>
              {d.type === 'Invoice' && <><p className="muted">Pay by</p><p>{d.due}</p></>}
              {d.type === 'Quotation' && <><p className="muted">Valid until</p><p>{d.due}</p></>}
              {d.type === 'Receipt' && <><p className="muted">Paid by</p><p>{d.method}</p></>}
            </div>
          </div>
          <table>
            <thead><tr><th>Item</th><th className="num">Qty</th><th className="num">Price</th><th className="num">Amount</th></tr></thead>
            <tbody>
              {d.items.map((i) => (
                <tr key={i.id}><td>{i.desc || '—'}</td><td className="num">{num(i.qty)}</td><td className="num">{money(num(i.rate), d.currency)}</td><td className="num">{money(num(i.qty) * num(i.rate), d.currency)}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="totals">
            {num(d.tax) > 0 && <p><span>Subtotal</span><span>{money(sub, d.currency)}</span></p>}
            {num(d.tax) > 0 && <p><span>Tax ({num(d.tax)}%)</span><span>{money(taxAmt, d.currency)}</span></p>}
            <p className="grand"><span>{totalLabel}</span><span>{money(total, d.currency)}</span></p>
          </div>
          {d.notes && <p className="notes pre">{d.notes}</p>}
          {!pro && <p className="mark">Made free with Bizpad</p>}
        </article>
      </div>
    </div>
  );
}
