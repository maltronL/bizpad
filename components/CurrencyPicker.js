'use client';
import { CURRENCIES } from '../lib/fmt';
export default function CurrencyPicker({ value, onChange }) {
  return (
    <label>Currency
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
      </select>
    </label>
  );
}
