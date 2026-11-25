'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const Ctx = createContext({ pro: false, busy: false, activate: async () => '', deactivate: () => {} });
export const usePro = () => useContext(Ctx);

async function check(key) {
  const r = await fetch('/api/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) });
  const d = await r.json();
  return d.valid === true;
}

export default function ProProvider({ children }) {
  const [pro, setPro] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let k = null;
    try { k = localStorage.getItem('bizpad_license'); } catch {}
    if (k) check(k).then(setPro).catch(() => {});
  }, []);
  const activate = useCallback(async (key) => {
    setBusy(true);
    try {
      if (await check(key)) {
        localStorage.setItem('bizpad_license', key.trim());
        setPro(true);
        return 'Pro unlocked on this device.';
      }
      return 'That key was not recognised. Check it and try again.';
    } catch {
      return 'Could not reach the server. Check your connection and try again.';
    } finally { setBusy(false); }
  }, []);
  const deactivate = useCallback(() => {
    try { localStorage.removeItem('bizpad_license'); } catch {}
    setPro(false);
  }, []);
  return <Ctx.Provider value={{ pro, busy, activate, deactivate }}>{children}</Ctx.Provider>;
}
