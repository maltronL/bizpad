'use client';
import { useState } from 'react';
import { useStore } from '../lib/store';
import CurrencyPicker from './CurrencyPicker';
import { money, num, uid, download, csvEsc, wa } from '../lib/fmt';

export default function StockList() {
  const [cur, setCur, r1] = useStore('bizpad_cur', 'USD');
  const [rows, setRows, r2] = useStore('bizpad_stock', []);
  const [f, setF] = useState({ name: '', cost: '', price: '', qty: '', low: '5' });
  if (!r1 || !r2) return <div className="loading">Opening your notebook…</div>;

  const add = () => {
    if (!f.name.trim()) return;
    setRows((p) => [...p, { id: uid(), name: f.name.trim(), cost: num(f.cost), price: num(f.price), qty: num(f.qty), low: num(f.low) }]);
    setF({ name: '', cost: '', price: '', qty: '', low: f.low });
  };
  const adj = (id, d) => setRows((p) => p.map((x) => (x.id === id ? { ...x, qty: Math.max(0, x.qty + d) } : x)));
  const value = rows.reduce((a, r) => a + r.qty * r.cost, 0);
  const lows = rows.filter((r) => r.qty <= r.low);
  const priceText = 'Price list\n' + rows.filter((r) => r.price > 0).map((r) => `${r.name}: ${money(r.price, cur)}`).join('\n');

  return (
    <div className="workspace">
      <div className="card form">
        <CurrencyPicker value={cur} onChange={setCur} />
        <h3>Add a product</h3>
        <label>Product<input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <div className="row">
          <label>You pay (each)<input inputMode="decimal" value={f.cost} onChange={(e) => setF({ ...f, cost: e.target.value })} /></label>
          <label>You sell (each)<input inputMode="decimal" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} /></label>
        </div>
        <div className="row">
          <label>In stock<input inputMode="numeric" value={f.qty} onChange={(e) => setF({ ...f, qty: e.target.value })} /></label>
          <label>Warn me at<input inputMode="numeric" value={f.low} onChange={(e) => setF({ ...f, low: e.target.value })} /></label>
        </div>
        <button type="button" className="btn big" onClick={add}>Add product</button>
        <a className={'ghost' + (rows.length ? '' : ' disabled')} href={rows.length ? wa(priceText) : undefined} target="_blank" rel="noopener noreferrer">Share price list on WhatsApp</a>
        <button type="button" className="ghost" disabled={!rows.length} onClick={() => download('bizpad-stock.csv', ['Product,Cost,Price,In stock', ...rows.map((r) => [csvEsc(r.name), r.cost, r.price, r.qty].join(','))].join('\n'))}>Download as spreadsheet (CSV)</button>
      </div>
      <div className="card">
        <div className="stats"><div><span>Products</span><strong>{rows.length}</strong></div><div><span>Stock value (at cost)</span><strong>{money(value, cur)}</strong></div><div className={lows.length ? 'hl' : ''}><span>Running low</span><strong>{lows.length}</strong></div></div>
        {rows.length === 0 && <p className="muted">Add your first product to start your stock list.</p>}
        <ul className="list">
          {rows.map((r) => (
            <li key={r.id} className="stack">
              <span><strong>{r.name}</strong><small>Sell {money(r.price, cur)} · Profit {money(r.price - r.cost, cur)}{r.price > 0 ? ` (${Math.round(((r.price - r.cost) / r.price) * 100)}%)` : ''}</small></span>
              <span className={r.qty <= r.low ? 'neg' : ''}>{r.qty} left{r.qty <= r.low ? ' – restock' : ''}</span>
              <div className="acts">
                <button type="button" className="ghost" aria-label={`Sold one ${r.name}`} onClick={() => adj(r.id, -1)}>Sold 1</button>
                <button type="button" className="ghost" aria-label={`Add one ${r.name}`} onClick={() => adj(r.id, 1)}>+1</button>
                <button type="button" className="ghost" onClick={() => { const v = num(window.prompt('How many did you receive?', '')); if (v > 0) adj(r.id, v); }}>Received stock</button>
                <button type="button" className="ghost" onClick={() => setRows((p) => p.filter((x) => x.id !== r.id))}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
