export const ACCORDION_SIZES = ['sm', 'md', 'lg'] as const;
export const ACCORDION_VARIANTS = ['filled', 'unfilled'] as const;
export const ACCORDION_TYPES = ['single', 'multiple'] as const;

export type AccordionSize = (typeof ACCORDION_SIZES)[number];
export type AccordionVariant = (typeof ACCORDION_VARIANTS)[number];
export type AccordionType = (typeof ACCORDION_TYPES)[number];

export interface AccordionItem {
  header: string;
  content: string;
  value: string;
  disabled?: boolean;
}

export interface AccordionProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
  type?: AccordionType;
  isCollapsible?: boolean;
  disabled?: boolean;
  items: AccordionItem[];
  onValueChange?: (value: string[]) => void;
}
