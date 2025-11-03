import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Chakra UI v3 custom theme (system)
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#eef6ff' },
          100: { value: '#d9eaff' },
          200: { value: '#b8d6ff' },
          300: { value: '#8bbaff' },
          400: { value: '#5d9aff' },
          500: { value: '#3b82f6' }, // primary
          600: { value: '#2e6ed8' },
          700: { value: '#255ab0' },
          800: { value: '#204c8f' },
          900: { value: '#1d3f74' },
        },
        gray: {
          50: { value: '#f9fafb' },
          100: { value: '#f3f4f6' },
          200: { value: '#e5e7eb' },
          300: { value: '#d1d5db' },
          400: { value: '#9ca3af' },
          500: { value: '#6b7280' },
          600: { value: '#4b5563' },
          700: { value: '#374151' },
          800: { value: '#1f2937' },
          900: { value: '#111827' },
        },
        success: { 500: { value: '#16a34a' } },
        warning: { 500: { value: '#ca8a04' } },
        danger: { 500: { value: '#dc2626' } },
      },
      radii: {
        sm: { value: '6px' },
        md: { value: '10px' },
        lg: { value: '14px' },
        full: { value: '9999px' },
      },
      fonts: {
        body: { value: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'" },
        heading: { value: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans'" },
        mono: { value: "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" },
      },
      sizes: {
        container: { value: '500px' },
      },
      spacing: {
        1: { value: '0.25rem' },
        2: { value: '0.5rem' },
        3: { value: '0.75rem' },
        4: { value: '1rem' },
        6: { value: '1.5rem' },
        8: { value: '2rem' },
      },
      shadows: {
        xs: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
        sm: { value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
        md: { value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
        lg: { value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
        xl: { value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
        '2xl': { value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
        inner: { value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' },
        glow: { value: '0 0 20px rgb(59 130 246 / 0.15)' },
        'glow-lg': { value: '0 0 30px rgb(59 130 246 / 0.2)' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { _light: '{colors.gray.50}', _dark: '{colors.gray.900}' },
        },
        cardBg: {
          value: { _light: '{colors.white}', _dark: '{colors.gray.800}' },
        },
        text: {
          value: { _light: '{colors.gray.800}', _dark: '{colors.gray.100}' },
        },
        subtext: {
          value: { _light: '{colors.gray.600}', _dark: '{colors.gray.300}' },
        },
        primary: {
          value: { _light: '{colors.brand.500}', _dark: '{colors.brand.400}' },
        },
        border: {
          value: { _light: '{colors.gray.200}', _dark: '{colors.gray.700}' },
        },
      },
      radii: {
        container: { value: '{radii.lg}' },
      },
      shadows: {
        card: { value: '{shadows.sm}' },
        cardHover: { value: '{shadows.md}' },
        button: { value: '{shadows.xs}' },
        buttonHover: { value: '{shadows.sm}' },
        modal: { value: '{shadows.xl}' },
        dropdown: { value: '{shadows.lg}' },
        glow: { value: '{shadows.glow}' },
        glowHover: { value: '{shadows.glow-lg}' },
        floating: { value: '{shadows.2xl}' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

