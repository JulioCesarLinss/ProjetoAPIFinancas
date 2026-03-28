/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores originais do tema escuro
        cashDark: '#0a0a0a',
        cashGreen: '#00FF7F',
        cashGray: '#999',
        cashLightGray: '#e0e0e0',
        cashDeep: '#131313', 
      },
      boxShadow: {
        // Sombra para o elemento elevado (o formulário principal)
        'neumorphism': '8px 8px 16px #000000, -8px -8px 16px #202020',
        // Sombra interna para os inputs (dando o efeito de afundado)
        'neumorphism-inner': 'inset 4px 4px 8px #000000, inset -4px -4px 8px #202020',
        // Sombra para botões "elevados"
        'neumorphism-btn': '6px 6px 12px #000000, -6px -6px 12px #202020',
      },
    },
  },
  plugins: [],
}