/* Reprend le thème existant sans charger le catalogue ou le générateur. */
'use strict';
try {
  const saved = localStorage.getItem('ttc_theme');
  const theme = ['dark', 'light'].includes(saved) ? saved :
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
} catch {}
