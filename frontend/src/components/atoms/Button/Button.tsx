import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "icon"
  | "text"
  | "bullet"
  | "highlight";
type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  type?: "submit" | "button" | "reset";
  buttonText?: string | any;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  isFullWidthOnMobile?: boolean;
  link?: "";
  size?: ButtonSize;
  onClick?: (() => void) | ((...args: any[]) => void);
  isLoading?: boolean;
  additionalButtonClassName?: string;
  fullWidth?: boolean;
  isDisabled?: boolean;
}

export function Button({
  variant,
  size,
  type = "button",
  buttonText,
  link,
  trailingIcon,
  leadingIcon,
  isFullWidthOnMobile,
  onClick,
  isLoading = false,
  additionalButtonClassName,
  fullWidth,
  isDisabled = false,
  children,
  ...rest
}: ButtonProps) {
  const buttonDynamicClassName = twMerge(
    clsx({
      "whitespace-nowrap md:text-base rounded font-semibold hover:bg-none flex gap-1 items-center justify-center py-2.5 px-5":
        true,
      "text-[14px] bg-primary text-white dark:text-gray-800 hover:brightness-90":
        variant === "primary",
      "text-[14px] bg-white border border-gray-800 text-black px-4 py-2.5 md:px-8 h-12 min-w-[150px]":
        variant === "secondary",
      "text-[14px] text-primary hover:brightness-70 dark:text-white px-4 py-2 md:px-8 md:py-3 min-w-[150px]":
        variant === "tertiary",
      "font-base font-base bg-white hover:bg-none text-purple-600 hover:underline dark:bg-transparent dark:text-gray-600":
        variant === "text",
      "text-[14px] flex items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-neutral-600 border-0 p-3":
        variant === "icon",
      "text-[14px] !rounded-[1rem] text-gray-500 dark:text-white dark:bg-gray-900 dark:hover:bg-black dark:border-[1px] hover:bg-gray-200 bg-gray-100 font-base py-2 px-4 md:text-xs dark:border-white border-gray-300":
        variant === "bullet",
      "text-[14px] bg-white text-[#ff6300] px-4 py-2.5 md:px-8 h-12":
        variant === "highlight",
      "px-4 py-1 h-8 md:px-4 md:py-2 md:h-8": size === "small",
      "px-4 py-2.5 md:px-5 md:py-2 h-10": size === "medium",
      "px-5 py-3.5 md:px-10 md:py-3": size === "large",
      "w-fit": !fullWidth || isFullWidthOnMobile,
      "w-full": fullWidth,
      "w-full md:w-fit": isFullWidthOnMobile,
      "opacity-50 cursor-not-allowed": isDisabled || isLoading,
    }),
    additionalButtonClassName
  );

  if (link) {
    return (
      <a href={link}>
        <button
          disabled={isDisabled}
          className={buttonDynamicClassName}
          type={"button"}
          {...rest}
        >
          {children}
          {leadingIcon && <span>{leadingIcon}</span>}
        </button>
      </a>
    );
  }

  return (
    <button
      disabled={isDisabled}
      className={buttonDynamicClassName}
      onClick={onClick}
      type={type ? type : "button"}
      {...rest}
    >
      {isLoading ? <span>its Loading</span> : buttonText || children}
    </button>
  );
}
