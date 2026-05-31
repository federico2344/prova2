import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: ['brightness-0', 'invert', 'mix-blend-multiply'],

  theme: {
    screens: {
      xs: '390px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        olive: {
          DEFAULT: '#5A5A3C',
          light: '#7A7A52',
        },
        // Brand color (configurabile via CMS → restaurant.theme.colorBrand)
        terracotta: {
          DEFAULT: 'rgb(var(--c-brand) / <alpha-value>)',
          dark:    '#6B0F0F',
        },
        blush: '#EDE0D0',
        // Configurabili via CMS
        cream:   'rgb(var(--c-cream) / <alpha-value>)',
        charcoal:'rgb(var(--c-charcoal) / <alpha-value>)',
        gold:    'rgb(var(--c-gold) / <alpha-value>)',
        price:   'rgb(var(--c-price) / <alpha-value>)',
      },

      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },

      maxWidth: {
        content: '1200px',
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.charcoal'),
            '--tw-prose-headings': theme('colors.charcoal'),
            '--tw-prose-links': theme('colors.terracotta.DEFAULT'),
            '--tw-prose-bold': theme('colors.charcoal'),
            '--tw-prose-counters': theme('colors.charcoal'),
            '--tw-prose-bullets': theme('colors.gold'),
            '--tw-prose-quotes': theme('colors.charcoal'),
            '--tw-prose-code': theme('colors.terracotta.DEFAULT'),
            lineHeight: '1.75',
            h2: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '600',
              marginTop: '3rem',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: `1px solid ${theme('colors.blush')}`,
              scrollMarginTop: '5rem',
            },
            h3: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '0.5rem',
              fontSize: '1.15rem',
            },
            p: { marginTop: '1rem', marginBottom: '1rem' },
            ul: { marginTop: '0.75rem', marginBottom: '1.25rem' },
            ol: { marginTop: '0.75rem', marginBottom: '1.25rem' },
            'li > p': { marginTop: '0.25rem', marginBottom: '0.25rem' },
            code: {
              backgroundColor: theme('colors.cream'),
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '500',
              fontSize: '0.9em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
          },
        },
      }),
    },
  },

  plugins: [typography],
}
