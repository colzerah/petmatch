export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'solid' | 'link' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  action?: 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
  disabled?: boolean;
}
