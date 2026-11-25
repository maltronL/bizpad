'use client';
import { useState } from 'react';
import { useStore } from '../lib/store';
import CurrencyPicker from './CurrencyPicker';
import { money, num, today, uid, download, csvEsc } from '../lib/fmt';

const METHODS = ['Cash', 'EcoCash', 'Card', 'Other'];

export default function SalesBook() {
  const [cur, setCur, r1] = useStore('bizpad_cur', 'USD');
  const [rows, setRows, r2] = useStore('bizpad_sales', []);
  const [day, setDay] = useState(today());
  const [f, setF] = useState({ desc: '', amount: '', kind: 'in', method: 'Cash' });
  if (!r1 || !r2) return <div className="loading">Opening your notebook…</div>;

  const add = () => {
    const amount = num(f.amount);
    if (amount <= 0) return;
    setRows((p) => [{ id: uid(), date: day, desc: f.desc.trim() || (f.kind === 'in' ? 'Sale' : 'Expense'), amount, kind: f.kind, method: f.method }, ...p]);
    setF((p) => ({ ...p, desc: '', amount: '' }));
  };
  const dayRows = rows.filter((r) => r.date === day);
  const sum = (arr, k) => arr.filter((r) => r.kind === k).reduce((a, r) => a + r.amount, 0);
  const inn = sum(dayRows, 'in'), out = sum(dayRows, 'out');
  const month = rows.filter((r) => r.date.slice(0, 7) === day.slice(0, 7));
  const mProfit = sum(month, 'in') - sum(month, 'out');
  const byMethod = METHODS.map((m) => [m, dayRows.filter((r) => r.kind === 'in' && r.method === m).reduce((a, r) => a + r.amount, 0)]).filter(([, v]) => v > 0);
  const exportCsv = () => download('bizpad-sales-book.csv', ['Date,Description,Type,Method,Amount', ...rows.map((r) => [r.date, csvEsc(r.desc), r.kind === 'in' ? 'Money in' : 'Money out', r.method, r.amount].join(','))].join('\n'));

  return (
    <div className="workspace">
      <div className="card form">
        <CurrencyPicker value={cur} onChange={setCur} />
        <label>Day<input type="date" value={day} onChange={(e) => setDay(e.target.value)} /></label>
        <div className="seg" role="group" aria-label="Type">
          <button type="button" className={f.kind === 'in' ? 'on' : ''} onClick={() => setF({ ...f, kind: 'in' })}>Money in (sale)</button>
          <button type="button" className={f.kind === 'out' ? 'on' : ''} onClick={() => setF({ ...f, kind: 'out' })}>Money out (expense)</button>
        </div>
        <label>What for<input value={f.desc} placeholder={f.kind === 'in' ? 'e.g. Bread and milk' : 'e.g. Stock from wholesaler'} onChange={(e) => setF({ ...f, desc: e.target.value })} /></label>
        <div className="row">
          <label>Amount<input inputMode="decimal" value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && add()} /></label>
          <label>How paid<select value={f.method} onChange={(e) => setF({ ...f, method: e.target.value })}>{METHODS.map((m) => <option key={m}>{m}</option>)}</select></label>
        </div>
        <button type="button" className="btn big" onClick={add}>Add to book</button>
        <button type="button" className="ghost" onClick={exportCsv} disabled={!rows.length}>Download all as spreadsheet (CSV)</button>
      </div>

      <div className="card">
        <div className="stats">
          <div><span>Money in</span><strong>{money(inn, cur)}</strong></div>
          <div><span>Money out</span><strong>{money(out, cur)}</strong></div>
          <div className="hl"><span>Profit today</span><strong>{money(inn - out, cur)}</strong></div>
        </div>
        {byMethod.length > 0 && <p className="muted">Sales by method: {byMethod.map(([m, v]) => `${m} ${money(v, cur)}`).join(' · ')}</p>}
        <p className="muted">Profit this month: <strong>{money(mProfit, cur)}</strong></p>
        <h3>Entries for {day}</h3>
        {dayRows.length === 0 && <p className="muted">Nothing yet. Add your first sale on the left.</p>}
        <ul className="list">
          {dayRows.map((r) => (
            <li key={r.id}>
              <span>{r.desc}<small>{r.method}</small></span>
              <span className={r.kind === 'in' ? 'pos' : 'neg'}>{r.kind === 'in' ? '+' : '−'}{money(r.amount, cur)}</span>
              <button type="button" className="ghost" aria-label={`Delete ${r.desc}`} onClick={() => setRows((p) => p.filter((x) => x.id !== r.id))}>×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
