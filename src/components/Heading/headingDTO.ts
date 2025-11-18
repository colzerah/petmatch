export const HEADING_SIZES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
] as const;

export type HeadingSize = (typeof HEADING_SIZES)[number];

export interface HeadingProps {
  title: string;
  size?: HeadingSize;
}
