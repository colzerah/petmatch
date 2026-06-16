export type ColorType = 'primary' | 'secondary' | 'black' | 'white';

export const colorMap: Record<ColorType, string> = {
  primary: '#ff7a18',
  secondary: '#A88A72',
  black: '#000',
  white: '#fff',
};

export interface TypographyProps {
  title: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  sub?: boolean;
  type?: ColorType;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xs'
    | '3xl'
    | '4xl'
    | '5xl'
    | '2xl'
    | '6xl';
}
