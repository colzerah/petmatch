export interface ActionSheetItem {
  value: string;
}

export interface ActionSheetProps {
  title: string;
  items: ActionSheetItem[];
  isOpen?: boolean;
  onClose?: () => void;
  snapPoints?: Array<number>;
}
