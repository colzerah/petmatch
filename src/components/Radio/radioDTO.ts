export interface RadioProps {
  value: string;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: () => void;
}
