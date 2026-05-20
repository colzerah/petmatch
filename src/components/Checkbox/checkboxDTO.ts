export interface CheckboxProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  isChecked?: boolean;
  value: string;
  onChange?: (checked: boolean) => void;
}
