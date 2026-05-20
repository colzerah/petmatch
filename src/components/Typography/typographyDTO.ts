export interface TypographyProps {
  title: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xs"
    | "3xl"
    | "4xl"
    | "5xl"
    | "2xl"
    | "6xl";
}
