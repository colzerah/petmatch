import { IconName } from '@/dtos/iconDTO';

const MENU_PLACEMENTS = [
  'top',
  'bottom',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
  'right top',
  'right bottom',
  'left top',
  'left bottom',
] as const;
export type MenuPlacement = (typeof MENU_PLACEMENTS)[number];

export interface MenuItem {
  value: string;
  iconName?: IconName;
}

export interface MenuProps {
  items: MenuItem[];
  placement?: MenuPlacement;
  offset?: number;
  crossOffset?: number;
  disabledKeys?: string[];
  title?: string;
  onOpen?: () => void;
  onClose?: () => void;
}
