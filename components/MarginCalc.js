'use client';
import { useStore } from '../lib/store';
import CurrencyPicker from './CurrencyPicker';
import { money, num } from '../lib/fmt';

export default function MarginCalc() {
  const [cur, setCur, r1] = useStore('bizpad_cur', 'USD');
  const [f, setF, r2] = useStore('bizpad_margin', { pack: '', units: '1', markup: '30', round: '0.05' });
  if (!r1 || !r2) return <div className="loading">Opening your notebook…</div>;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const units = Math.max(1, num(f.units));
  const unitCost = num(f.pack) / units;
  const raw = unitCost * (1 + num(f.markup) / 100);
  const step = num(f.round);
  const price = step > 0 ? Math.round((Math.ceil(raw / step - 1e-9) * step) * 100) / 100 : raw;
  const profit = price - unitCost;
  const margin = price > 0 ? (profit / price) * 100 : 0;

  return (
    <div className="workspace">
      <div className="card form">
        <CurrencyPicker value={cur} onChange={setCur} />
        <label>What you paid (whole pack, box or single item)<input inputMode="decimal" value={f.pack} onChange={set('pack')} /></label>
        <label>How many units in it (use 1 for a single item)<input inputMode="numeric" value={f.units} onChange={set('units')} /></label>
        <label>Markup you want %<input inputMode="decimal" value={f.markup} onChange={set('markup')} /></label>
        <label>Round price up to nearest
          <select value={f.round} onChange={set('round')}>
            <option value="0">No rounding</option><option value="0.05">5 cents</option><option value="0.1">10 cents</option><option value="0.5">50 cents</option><option value="1">1 dollar</option>
          </select>
        </label>
      </div>
      <div className="card">
        <div className="stats">
          <div><span>Cost of one</span><strong>{money(unitCost, cur)}</strong></div>
          <div className="hl"><span>Sell each at</span><strong>{money(price, cur)}</strong></div>
        </div>
        <p>Profit on each: <strong>{money(profit, cur)}</strong></p>
        <p>Profit on the whole pack: <strong>{money(profit * units, cur)}</strong></p>
        <p className="muted">Markup is profit as a share of cost. Margin is profit as a share of the selling price: yours is {margin.toFixed(1)}%.</p>
      </div>
    </div>
  );
}
