// components/ThemeToggle.js or components/ThemeToggle.tsx

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Sun, Moon } from 'lucide-react';

const DarkToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'dark' ? <Sun size={40} /> : <Moon size={40} />}
    </button>
  );
};

export default DarkToggle;
