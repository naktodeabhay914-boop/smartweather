import { useEffect, useState } from 'react';
import type { Theme } from '@/types';
import { storage } from '@/lib/storage';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => storage.getTheme());

  useEffect(() => {
    storage.setTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}
