/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        immix: {
          darker: '#0a0a0a',
          dark: '#0f0f0f',
          light: '#1a1a1a',
          blue: '#0073FF',
          'blue-light': '#3D8FFF',
          'blue-dark': '#0056CC',
          purple: '#6B46FF',
          'purple-dark': '#5130CC',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', '1rem'],
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.5rem'],
        lg: ['1.125rem', '1.75rem'],
        xl: ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
        '4xl': ['2.25rem', '2.5rem'],
        '5xl': ['3rem', '1'],
        '6xl': ['3.75rem', '1'],
        '7xl': ['4.5rem', '1'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 115, 255, 0.35)',
        'glow-lg': '0 0 40px rgba(0, 115, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(107, 70, 255, 0.35)',
        'glow-purple-lg': '0 0 40px rgba(107, 70, 255, 0.5)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-in-left': 'slideInLeft 0.6s ease-out both',
        'slide-in-right': 'slideInRight 0.6s ease-out both',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        'shimmer-slow': 'shimmer 6s ease-in-out infinite',
        'glow-teal': 'glowTeal 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 115, 255, 0.35)',
            textShadow: '0 0 10px rgba(0, 115, 255, 0.35)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 115, 255, 0.6)',
            textShadow: '0 0 20px rgba(0, 115, 255, 0.6)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowTeal: {
          '0%, 100%': { textShadow: '0 0 20px rgba(20, 184, 166, 0.4)' },
          '50%': { textShadow: '0 0 40px rgba(20, 184, 166, 0.7), 0 0 80px rgba(20, 184, 166, 0.3)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
