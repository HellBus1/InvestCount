/**
 * InvestCount Design System Tokens
 * Single source of truth for all brand colors, typography, spacing, shadows, and radii.
 */

export const theme = {
  colors: {
    // Primary Brand Green - Fresh, trustworthy Indonesian fintech feel
    brand: {
      50: '#F0FDF8',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#34D399',
      500: '#10B981', // Main primary green
      600: '#059669', // Hover / focus green
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
      DEFAULT: '#059669'
    },
    // Neutral Slate - Deep, sophisticated typography and surface hierarchy
    slate: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A', // Primary text
      DEFAULT: '#0F172A'
    },
    // Accent / State Colors
    amber: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      500: '#F59E0B',
      600: '#D97706'
    },
    danger: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      500: '#EF4444',
      600: '#DC2626'
    }
  },
  fonts: {
    display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['"JetBrains Mono"', 'monospace']
  },
  shadows: {
    card: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
    hover: '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
    elevated: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)'
  },
  radius: {
    sm: '0.375rem', // 6px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.25rem', // 20px
    full: '9999px'
  }
} as const

export type Theme = typeof theme
