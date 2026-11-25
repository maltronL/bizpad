'use client';
import { useState } from 'react';
import { useStore } from '../lib/store';
import CurrencyPicker from './CurrencyPicker';
import { money, num, today, uid, wa } from '../lib/fmt';

export default function Debtors() {
  const [cur, setCur, r1] = useStore('bizpad_cur', 'USD');
  const [rows, setRows, r2] = useStore('bizpad_debtors', []);
  const [biz, setBiz, r3] = useStore('bizpad_bizname', '');
  const [f, setF] = useState({ name: '', phone: '', amount: '', note: '' });
  if (!r1 || !r2 || !r3) return <div className="loading">Opening your notebook…</div>;

  const add = () => {
    const amount = num(f.amount);
    if (!f.name.trim() || amount <= 0) return;
    setRows((p) => [{ id: uid(), date: today(), name: f.name.trim(), phone: f.phone.trim(), amount, note: f.note.trim(), paid: false }, ...p]);
    setF({ name: '', phone: '', amount: '', note: '' });
  };
  const open = rows.filter((r) => !r.paid);
  const owed = open.reduce((a, r) => a + r.amount, 0);
  const part = (r) => {
    const v = num(window.prompt(`How much did ${r.name} pay?`, ''));
    if (v <= 0) return;
    setRows((p) => p.map((x) => (x.id === r.id ? { ...x, amount: Math.max(0, x.amount - v), paid: x.amount - v <= 0 } : x)));
  };
  const remind = (r) => wa(`Hello ${r.name}, this is a friendly reminder from ${biz || 'us'}. You have ${money(r.amount, cur)} outstanding${r.note ? ' for ' + r.note : ''}. Please pay when you can. Thank you.`, r.phone);

  return (
    <div className="workspace">
      <div className="card form">
        <CurrencyPicker value={cur} onChange={setCur} />
        <label>Your business name (used in reminders)<input value={biz} onChange={(e) => setBiz(e.target.value)} /></label>
        <h3>Add someone who owes you</h3>
        <label>Name<input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <div className="row">
          <label>WhatsApp number<input inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
          <label>Amount owed<input inputMode="decimal" value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value })} /></label>
        </div>
        <label>For what<input value={f.note} placeholder="e.g. groceries, braiding" onChange={(e) => setF({ ...f, note: e.target.value })} /></label>
        <button type="button" className="btn big" onClick={add}>Add to debtors book</button>
      </div>
      <div className="card">
        <div className="stats"><div className="hl"><span>Total owed to you</span><strong>{money(owed, cur)}</strong></div><div><span>People</span><strong>{open.length}</strong></div></div>
        {open.length === 0 && <p className="muted">No one owes you right now.</p>}
        <ul className="list">
          {open.map((r) => (
            <li key={r.id} className="stack">
              <span><strong>{r.name}</strong><small>{r.date}{r.note ? ' · ' + r.note : ''}</small></span>
              <span className="neg">{money(r.amount, cur)}</span>
              <div className="acts">
                <a className="ghost" href={remind(r)} target="_blank" rel="noopener noreferrer">Remind on WhatsApp</a>
                <button type="button" className="ghost" onClick={() => part(r)}>Part payment</button>
                <button type="button" className="ghost" onClick={() => setRows((p) => p.map((x) => (x.id === r.id ? { ...x, paid: true } : x)))}>Paid in full</button>
                <button type="button" className="ghost" aria-label={`Delete ${r.name}`} onClick={() => setRows((p) => p.filter((x) => x.id !== r.id))}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
