/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        border: 'var(--border)',
        card: 'var(--card)',
        input: 'var(--input)',
        'muted-foreground': 'var(--muted-foreground)',
        'muted-primary': 'var(--muted-primary)',
        'secondary-button': 'var(--secondary-button)',
      },
    },
  },
  plugins: [],
};
