import React from "react";
import clsx from "clsx";

export interface TextFieldProps {
  inputDynamicClassName?: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (value: any) => void;
  label?: string;
}

export function TextField({
  inputDynamicClassName = "",
  type,
  name,
  value,
  onChange,
  label,
  ...rest
}: TextFieldProps) {
  const classes = clsx({
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50":
      true,
    [inputDynamicClassName]: inputDynamicClassName,
  });
  return (
    <div className="flex items-center justify-between space-x-3 h-12">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type || "text"}
        className={classes}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
