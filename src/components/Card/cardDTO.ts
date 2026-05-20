import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline" | "ghost" | "elevated";
}
