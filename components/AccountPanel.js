'use client';
import { useState } from 'react';
import { usePro } from './ProProvider';
import UnlockBox from './UnlockBox';
import { download } from '../lib/fmt';

export default function AccountPanel() {
  const { pro, deactivate } = usePro();
  const [msg, setMsg] = useState('');
  const exportAll = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith('bizpad_') && k !== 'bizpad_license') data[k] = localStorage.getItem(k);
    }
    download('bizpad-backup.json', JSON.stringify(data), 'application/json');
  };
  const importAll = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const data = JSON.parse(String(rd.result));
        Object.entries(data).forEach(([k, v]) => { if (k.startsWith('bizpad_') && k !== 'bizpad_license' && typeof v === 'string') localStorage.setItem(k, v); });
        setMsg('Backup restored. Open any tool to see your data.');
      } catch { setMsg('That file is not a valid Bizpad backup.'); }
    };
    rd.readAsText(f);
  };
  return (
    <div className="card narrow">
      {pro ? (
        <>
          <p className="ok">Pro is active on this device.</p>
          <h3>Backup</h3>
          <p className="muted">Your records live on this phone. Download a backup before changing phones, then restore it on the new one.</p>
          <button type="button" className="btn" onClick={exportAll}>Download backup</button>
          <label>Restore from backup<input type="file" accept="application/json" onChange={importAll} /></label>
          <button type="button" className="ghost" onClick={deactivate}>Remove Pro from this device</button>
        </>
      ) : <UnlockBox note="Enter the license key from your purchase email." />}
      {msg && <p className="msg" role="status">{msg}</p>}
    </div>
  );
}
