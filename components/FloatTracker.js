'use client';
import { useStore } from '../lib/store';
import CurrencyPicker from './CurrencyPicker';
import { money, num } from '../lib/fmt';

const blank = { opening: '', topups: '', sold: '', actual: '', rate: '5' };

export default function FloatTracker() {
  const [cur, setCur, r1] = useStore('bizpad_cur', 'USD');
  const [f, setF, r2] = useStore('bizpad_float', blank);
  if (!r1 || !r2) return <div className="loading">Opening your notebook…</div>;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const expected = num(f.opening) + num(f.topups) - num(f.sold);
  const diff = num(f.actual) - expected;
  const earn = num(f.sold) * (num(f.rate) / 100);
  const filled = f.actual !== '';

  return (
    <div className="workspace">
      <div className="card form">
        <CurrencyPicker value={cur} onChange={setCur} />
        <p className="muted">Works for airtime, data bundles, EcoCash, OneMoney or any float you top up and sell from.</p>
        <label>Float at start of day<input inputMode="decimal" value={f.opening} onChange={set('opening')} /></label>
        <label>Topped up today<input inputMode="decimal" value={f.topups} onChange={set('topups')} /></label>
        <label>Total sold today<input inputMode="decimal" value={f.sold} onChange={set('sold')} /></label>
        <label>Float actually left now (check your phone)<input inputMode="decimal" value={f.actual} onChange={set('actual')} /></label>
        <label>Your commission %<input inputMode="decimal" value={f.rate} onChange={set('rate')} /></label>
        <button type="button" className="ghost" onClick={() => setF({ ...blank, rate: f.rate })}>Start a new day</button>
      </div>
      <div className="card">
        <div className="stats">
          <div><span>Float you should have left</span><strong>{money(expected, cur)}</strong></div>
          <div className="hl"><span>Commission earned</span><strong>{money(earn, cur)}</strong></div>
        </div>
        {filled ? (
          Math.abs(diff) < 0.005 ? <p className="ok">Balanced. Your float matches your sales.</p> :
          diff < 0 ? <p className="bad">Short by {money(-diff, cur)}. Check for sales not written down, wrong-number top-ups or reversals.</p> :
          <p className="warn">{money(diff, cur)} extra. You may have missed writing a top-up or a sale.</p>
        ) : <p className="muted">Enter the float left on your phone to see if everything adds up.</p>}
      </div>
    </div>
  );
}
