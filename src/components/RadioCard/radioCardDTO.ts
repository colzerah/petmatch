interface RadioCardOption {
  value: string;
  title: string;
  subTitle?: string;
  disabled?: boolean;
}

export interface RadioCardProps {
  options: RadioCardOption[];
  value: string;
  onChange: (value: string) => void;
}
