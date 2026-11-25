'use client';
import { useState } from 'react';
import { usePro } from './ProProvider';

export default function UnlockBox({ note }) {
  const { activate, busy } = usePro();
  const [key, setKey] = useState('');
  const [msg, setMsg] = useState('');
  return (
    <div className="unlock">
      {note && <p>{note}</p>}
      <div className="row">
        <input aria-label="License key" placeholder="License key" value={key} onChange={(e) => setKey(e.target.value)} />
        <button type="button" className="btn" disabled={busy || !key.trim()} onClick={async () => setMsg(await activate(key))}>Unlock</button>
      </div>
      <a href="/#pro">Get a key</a>
      {msg && <p className="msg" role="status">{msg}</p>}
    </div>
  );
}
