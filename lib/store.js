'use client';
import { useEffect, useState } from 'react';
export function useStore(key, initial) {
  const [v, setV] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const s = localStorage.getItem(key); if (s !== null) setV(JSON.parse(s)); } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [v, ready, key]);
  return [v, setV, ready];
}
