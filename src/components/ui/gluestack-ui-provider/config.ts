'use client';
import { vars } from 'nativewind';

function hexToRgb(hex: string): string {
  // Remove o # se existir
  const cleanHex = hex.replace('#', '');

  // Converte para RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  console.log('RETURN', `${r} ${g} ${b}`);
  return `${r} ${g} ${b}`;
}

export const config = {
  light: vars({
    '--color-primary-0': hexToRgb('#FFC48E'),
    '--color-primary-50': hexToRgb('#FFAF62'),
    '--color-primary-100': hexToRgb('#F1A054'),
    '--color-primary-200': hexToRgb('#E19146'),
    '--color-primary-300': hexToRgb('#D08338'),
    '--color-primary-400': hexToRgb('#C0752A'),
    '--color-primary-500': hexToRgb('#B86E23'),
    '--color-primary-600': hexToRgb('#A05A0B'),
    '--color-primary-700': hexToRgb('#904C00'),
    '--color-primary-800': hexToRgb('#813F00'),
    '--color-primary-900': hexToRgb('#723300'),
    '--color-primary-950': hexToRgb('#5D2B00'),

    /* Secondary  */
    '--color-secondary-0': hexToRgb('#FFF9F5'),
    '--color-secondary-50': hexToRgb('#FFF4ED'),
    '--color-secondary-100': hexToRgb('#FFEEE0'),
    '--color-secondary-200': hexToRgb('#FFE4CC'),
    '--color-secondary-300': hexToRgb('#FFD4B3'),
    '--color-secondary-400': hexToRgb('#FFC499'),
    '--color-secondary-500': hexToRgb('#FFB380'),
    '--color-secondary-600': hexToRgb('#E09970'),
    '--color-secondary-700': hexToRgb('#C08060'),
    '--color-secondary-800': hexToRgb('#A06650'),
    '--color-secondary-900': hexToRgb('#704D40'),
    '--color-secondary-950': hexToRgb('#503330'),

    /* Tertiary */
    '--color-tertiary-0': hexToRgb('#F5F9F0'),
    '--color-tertiary-50': hexToRgb('#EBF4E0'),
    '--color-tertiary-100': hexToRgb('#DDECC8'),
    '--color-tertiary-200': hexToRgb('#C8E0A8'),
    '--color-tertiary-300': hexToRgb('#B0D188'),
    '--color-tertiary-400': hexToRgb('#98C268'),
    '--color-tertiary-500': hexToRgb('#7FAA4D'),
    '--color-tertiary-600': hexToRgb('#6B9040'),
    '--color-tertiary-700': hexToRgb('#577633'),
    '--color-tertiary-800': hexToRgb('#435C28'),
    '--color-tertiary-900': hexToRgb('#30421D'),
    '--color-tertiary-950': hexToRgb('#1D2812'),

    /* Error */
    '--color-error-0': hexToRgb('#FFF5F5'),
    '--color-error-50': hexToRgb('#FFEBEB'),
    '--color-error-100': hexToRgb('#FFDDDD'),
    '--color-error-200': hexToRgb('#FFC2C2'),
    '--color-error-300': hexToRgb('#FF9999'),
    '--color-error-400': hexToRgb('#FF6B6B'),
    '--color-error-500': hexToRgb('#E63946'),
    '--color-error-600': hexToRgb('#CC2936'),
    '--color-error-700': hexToRgb('#A61E28'),
    '--color-error-800': hexToRgb('#80141D'),
    '--color-error-900': hexToRgb('#5A0F15'),
    '--color-error-950': hexToRgb('#330A0D'),

    /* Success */
    '--color-success-0': hexToRgb('#F0FDF4'),
    '--color-success-50': hexToRgb('#DCFCE7'),
    '--color-success-100': hexToRgb('#BBF7D0'),
    '--color-success-200': hexToRgb('#86EFAC'),
    '--color-success-300': hexToRgb('#4ADE80'),
    '--color-success-400': hexToRgb('#22C55E'),
    '--color-success-500': hexToRgb('#16A34A'),
    '--color-success-600': hexToRgb('#15803D'),
    '--color-success-700': hexToRgb('#166534'),
    '--color-success-800': hexToRgb('#14532D'),
    '--color-success-900': hexToRgb('#0F3A21'),
    '--color-success-950': hexToRgb('#082014'),

    /* Warning */
    '--color-warning-0': hexToRgb('#FFFBEB'),
    '--color-warning-50': hexToRgb('#FFF5D6'),
    '--color-warning-100': hexToRgb('#FFEDB3'),
    '--color-warning-200': hexToRgb('#FFE280'),
    '--color-warning-300': hexToRgb('#FFD24D'),
    '--color-warning-400': hexToRgb('#FFC01A'),
    '--color-warning-500': hexToRgb('#F59E0B'),
    '--color-warning-600': hexToRgb('#D97706'),
    '--color-warning-700': hexToRgb('#B45309'),
    '--color-warning-800': hexToRgb('#92400E'),
    '--color-warning-900': hexToRgb('#78350F'),
    '--color-warning-950': hexToRgb('#451A03'),

    /* Info */
    '--color-info-0': hexToRgb('#F0F9FF'),
    '--color-info-50': hexToRgb('#E0F2FE'),
    '--color-info-100': hexToRgb('#BAE6FD'),
    '--color-info-200': hexToRgb('#7DD3FC'),
    '--color-info-300': hexToRgb('#38BDF8'),
    '--color-info-400': hexToRgb('#0EA5E9'),
    '--color-info-500': hexToRgb('#0284C7'),
    '--color-info-600': hexToRgb('#0369A1'),
    '--color-info-700': hexToRgb('#075985'),
    '--color-info-800': hexToRgb('#0C4A6E'),
    '--color-info-900': hexToRgb('#0A3A56'),
    '--color-info-950': hexToRgb('#082635'),

    /* Typography */
    '--color-typography-0': hexToRgb('#FAFAF9'),
    '--color-typography-50': hexToRgb('#F5F5F4'),
    '--color-typography-100': hexToRgb('#E7E5E4'),
    '--color-typography-200': hexToRgb('#D6D3D1'),
    '--color-typography-300': hexToRgb('#A8A29E'),
    '--color-typography-400': hexToRgb('#78716C'),
    '--color-typography-500': hexToRgb('#57534E'),
    '--color-typography-600': hexToRgb('#44403C'),
    '--color-typography-700': hexToRgb('#292524'),
    '--color-typography-800': hexToRgb('#1C1917'),
    '--color-typography-900': hexToRgb('#0C0A09'),
    '--color-typography-950': hexToRgb('#000000'),

    /* Outline */
    '--color-outline-0': hexToRgb('#FAFAF9'),
    '--color-outline-50': hexToRgb('#F5F5F4'),
    '--color-outline-100': hexToRgb('#E7E5E4'),
    '--color-outline-200': hexToRgb('#D6D3D1'),
    '--color-outline-300': hexToRgb('#A8A29E'),
    '--color-outline-400': hexToRgb('#78716C'),
    '--color-outline-500': hexToRgb('#57534E'),
    '--color-outline-600': hexToRgb('#44403C'),
    '--color-outline-700': hexToRgb('#292524'),
    '--color-outline-800': hexToRgb('#1C1917'),
    '--color-outline-900': hexToRgb('#0C0A09'),
    '--color-outline-950': hexToRgb('#000000'),

    /* Background */
    '--color-background-0': hexToRgb('#FFFFFF'),
    '--color-background-50': hexToRgb('#FAFAF9'),
    '--color-background-100': hexToRgb('#F5F5F4'),
    '--color-background-200': hexToRgb('#E7E5E4'),
    '--color-background-300': hexToRgb('#D6D3D1'),
    '--color-background-400': hexToRgb('#A8A29E'),
    '--color-background-500': hexToRgb('#78716C'),
    '--color-background-600': hexToRgb('#57534E'),
    '--color-background-700': hexToRgb('#44403C'),
    '--color-background-800': hexToRgb('#292524'),
    '--color-background-900': hexToRgb('#1C1917'),
    '--color-background-950': hexToRgb('#0C0A09'),

    /* Background Special */
    '--color-background-error': hexToRgb('#FFF5F5'),
    '--color-background-warning': hexToRgb('#FFFBEB'),
    '--color-background-success': hexToRgb('#F0FDF4'),
    '--color-background-muted': hexToRgb('#FAFAF9'),
    '--color-background-info': hexToRgb('#F0F9FF'),

    /* Focus Ring Indicator  */
    '--color-indicator-primary': hexToRgb('#D08338'),
    '--color-indicator-info': hexToRgb('#0EA5E9'),
    '--color-indicator-error': hexToRgb('#E63946'),
  }),
  dark: vars({
    '--color-primary-0': hexToRgb('#5D2B00'),
    '--color-primary-50': hexToRgb('#723300'),
    '--color-primary-100': hexToRgb('#813F00'),
    '--color-primary-200': hexToRgb('#904C00'),
    '--color-primary-300': hexToRgb('#A05A0B'),
    '--color-primary-400': hexToRgb('#B86E23'),
    '--color-primary-500': hexToRgb('#C0752A'),
    '--color-primary-600': hexToRgb('#D08338'),
    '--color-primary-700': hexToRgb('#E19146'),
    '--color-primary-800': hexToRgb('#F1A054'),
    '--color-primary-900': hexToRgb('#FFAF62'),
    '--color-primary-950': hexToRgb('#FFC48E'),

    /* Secondary  */
    '--color-secondary-0': hexToRgb('#503330'),
    '--color-secondary-50': hexToRgb('#704D40'),
    '--color-secondary-100': hexToRgb('#A06650'),
    '--color-secondary-200': hexToRgb('#C08060'),
    '--color-secondary-300': hexToRgb('#E09970'),
    '--color-secondary-400': hexToRgb('#FFB380'),
    '--color-secondary-500': hexToRgb('#FFC499'),
    '--color-secondary-600': hexToRgb('#FFD4B3'),
    '--color-secondary-700': hexToRgb('#FFE4CC'),
    '--color-secondary-800': hexToRgb('#FFEEE0'),
    '--color-secondary-900': hexToRgb('#FFF4ED'),
    '--color-secondary-950': hexToRgb('#FFF9F5'),

    /* Tertiary */
    '--color-tertiary-0': hexToRgb('#1D2812'),
    '--color-tertiary-50': hexToRgb('#30421D'),
    '--color-tertiary-100': hexToRgb('#435C28'),
    '--color-tertiary-200': hexToRgb('#577633'),
    '--color-tertiary-300': hexToRgb('#6B9040'),
    '--color-tertiary-400': hexToRgb('#7FAA4D'),
    '--color-tertiary-500': hexToRgb('#98C268'),
    '--color-tertiary-600': hexToRgb('#B0D188'),
    '--color-tertiary-700': hexToRgb('#C8E0A8'),
    '--color-tertiary-800': hexToRgb('#DDECC8'),
    '--color-tertiary-900': hexToRgb('#EBF4E0'),
    '--color-tertiary-950': hexToRgb('#F5F9F0'),

    /* Error */
    '--color-error-0': hexToRgb('#330A0D'),
    '--color-error-50': hexToRgb('#5A0F15'),
    '--color-error-100': hexToRgb('#80141D'),
    '--color-error-200': hexToRgb('#A61E28'),
    '--color-error-300': hexToRgb('#CC2936'),
    '--color-error-400': hexToRgb('#E63946'),
    '--color-error-500': hexToRgb('#FF6B6B'),
    '--color-error-600': hexToRgb('#FF9999'),
    '--color-error-700': hexToRgb('#FFC2C2'),
    '--color-error-800': hexToRgb('#FFDDDD'),
    '--color-error-900': hexToRgb('#FFEBEB'),
    '--color-error-950': hexToRgb('#FFF5F5'),

    /* Success */
    '--color-success-0': hexToRgb('#082014'),
    '--color-success-50': hexToRgb('#0F3A21'),
    '--color-success-100': hexToRgb('#14532D'),
    '--color-success-200': hexToRgb('#166534'),
    '--color-success-300': hexToRgb('#15803D'),
    '--color-success-400': hexToRgb('#16A34A'),
    '--color-success-500': hexToRgb('#22C55E'),
    '--color-success-600': hexToRgb('#4ADE80'),
    '--color-success-700': hexToRgb('#86EFAC'),
    '--color-success-800': hexToRgb('#BBF7D0'),
    '--color-success-900': hexToRgb('#DCFCE7'),
    '--color-success-950': hexToRgb('#F0FDF4'),

    /* Warning */
    '--color-warning-0': hexToRgb('#451A03'),
    '--color-warning-50': hexToRgb('#78350F'),
    '--color-warning-100': hexToRgb('#92400E'),
    '--color-warning-200': hexToRgb('#B45309'),
    '--color-warning-300': hexToRgb('#D97706'),
    '--color-warning-400': hexToRgb('#F59E0B'),
    '--color-warning-500': hexToRgb('#FFC01A'),
    '--color-warning-600': hexToRgb('#FFD24D'),
    '--color-warning-700': hexToRgb('#FFE280'),
    '--color-warning-800': hexToRgb('#FFEDB3'),
    '--color-warning-900': hexToRgb('#FFF5D6'),
    '--color-warning-950': hexToRgb('#FFFBEB'),

    /* Info */
    '--color-info-0': hexToRgb('#082635'),
    '--color-info-50': hexToRgb('#0A3A56'),
    '--color-info-100': hexToRgb('#0C4A6E'),
    '--color-info-200': hexToRgb('#075985'),
    '--color-info-300': hexToRgb('#0369A1'),
    '--color-info-400': hexToRgb('#0284C7'),
    '--color-info-500': hexToRgb('#0EA5E9'),
    '--color-info-600': hexToRgb('#38BDF8'),
    '--color-info-700': hexToRgb('#7DD3FC'),
    '--color-info-800': hexToRgb('#BAE6FD'),
    '--color-info-900': hexToRgb('#E0F2FE'),
    '--color-info-950': hexToRgb('#F0F9FF'),

    /* Typography */
    '--color-typography-0': hexToRgb('#000000'),
    '--color-typography-50': hexToRgb('#0C0A09'),
    '--color-typography-100': hexToRgb('#1C1917'),
    '--color-typography-200': hexToRgb('#292524'),
    '--color-typography-300': hexToRgb('#44403C'),
    '--color-typography-400': hexToRgb('#57534E'),
    '--color-typography-500': hexToRgb('#78716C'),
    '--color-typography-600': hexToRgb('#A8A29E'),
    '--color-typography-700': hexToRgb('#D6D3D1'),
    '--color-typography-800': hexToRgb('#E7E5E4'),
    '--color-typography-900': hexToRgb('#F5F5F4'),
    '--color-typography-950': hexToRgb('#FAFAF9'),

    /* Outline */
    '--color-outline-0': hexToRgb('#000000'),
    '--color-outline-50': hexToRgb('#0C0A09'),
    '--color-outline-100': hexToRgb('#1C1917'),
    '--color-outline-200': hexToRgb('#292524'),
    '--color-outline-300': hexToRgb('#44403C'),
    '--color-outline-400': hexToRgb('#57534E'),
    '--color-outline-500': hexToRgb('#78716C'),
    '--color-outline-600': hexToRgb('#A8A29E'),
    '--color-outline-700': hexToRgb('#D6D3D1'),
    '--color-outline-800': hexToRgb('#E7E5E4'),
    '--color-outline-900': hexToRgb('#F5F5F4'),
    '--color-outline-950': hexToRgb('#FAFAF9'),

    /* Background */
    '--color-background-0': hexToRgb('#0C0A09'),
    '--color-background-50': hexToRgb('#1C1917'),
    '--color-background-100': hexToRgb('#292524'),
    '--color-background-200': hexToRgb('#44403C'),
    '--color-background-300': hexToRgb('#57534E'),
    '--color-background-400': hexToRgb('#78716C'),
    '--color-background-500': hexToRgb('#A8A29E'),
    '--color-background-600': hexToRgb('#D6D3D1'),
    '--color-background-700': hexToRgb('#E7E5E4'),
    '--color-background-800': hexToRgb('#F5F5F4'),
    '--color-background-900': hexToRgb('#FAFAF9'),
    '--color-background-950': hexToRgb('#FFFFFF'),

    /* Background Special */
    '--color-background-error': hexToRgb('#330A0D'),
    '--color-background-warning': hexToRgb('#451A03'),
    '--color-background-success': hexToRgb('#082014'),
    '--color-background-muted': hexToRgb('#292524'),
    '--color-background-info': hexToRgb('#082635'),

    /* Focus Ring Indicator  */
    '--color-indicator-primary': hexToRgb('#F1A054'),
    '--color-indicator-info': hexToRgb('#38BDF8'),
    '--color-indicator-error': hexToRgb('#FF6B6B'),
  }),
};
