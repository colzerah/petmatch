import type { ReactNode } from 'react';

export interface VStackProps {
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  reversed?: boolean;
  children: ReactNode;
}
