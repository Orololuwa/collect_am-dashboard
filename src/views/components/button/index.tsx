import cn from "classnames";
import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  outline?: boolean;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button: React.FC<ButtonProps> = ({
  size = "medium",
  variant = "primary",
  type = "button",
  disabled,
  outline,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn({
        [`border-[1px] text-sm transition-colors`]: true,
        "px-4 py-1": size === "small",
        "px-6 py-2": size === "medium",
        "px-8 py-3": size === "large",
        "bg-main-primary-400 text-main-secondary-400 border-main-primary-400  hover:bg-transparent hover:text-main-primary-400":
          variant === "primary",
        "bg-state-danger-400 text-base-light-100 border-state-danger-400  hover:bg-transparent hover:text-state-danger-400":
          variant === "danger",
        "bg-main-secondary-400 text-base-light-100 border-main-secondary-400  hover:bg-transparent hover:text-main-secondary-400":
          variant === "secondary" && !outline,
        "bg-transparent rounded-none text-main-secondary-400 border-main-primary-400  hover:bg-transparent hover:text-main-primary-400":
          outline,
        "rounded-md": type === "submit",
        "rounded-3xl": type !== "submit",
        [`${className}`]: className
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export * from "./iconButtons";
