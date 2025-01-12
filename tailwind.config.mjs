/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'oxford-blue': '#14213d',
        'orange-web': '#fca311',
        platinum: '#e5e5e5',
        white: '#ffffff',
      },
     
    },
  },
  safelist: [
    'bg-yellow-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-red-400',
    'bg-green-100',
    'bg-red-100',
    'border-green-400',
    'border-red-400',
    'text-green-700',
    'text-red-700',
  
  ],
  aspectRatio: {
    '1/1': '1 / 1',
  },
  plugins: [],
};
