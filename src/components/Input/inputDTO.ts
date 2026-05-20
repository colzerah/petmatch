import React from "react";

export interface InputProps {
  variant?: "outline" | "rounded" | "underlined";
  size?: "sm" | "md" | "lg" | "xl";
  type?: "text" | "password";
  placeholder: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  value: string;
  label?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  iconLeft?: React.ComponentType<any>; // resolveu por enquanto
  iconRight?: React.ComponentType<any>; // resolveu por enquanto
}
