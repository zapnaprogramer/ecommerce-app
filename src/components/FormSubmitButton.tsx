"use client";

// useFormStatus may not be present in your installed React/TypeScript lib types; ignore the type error if needed.
// @ts-ignore
import { useFormStatus } from "react-dom";

import { ComponentProps } from "react";



type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={`btn-primary btn ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}

export { default as FormSubmitButton } from "./FormSubmitButton";