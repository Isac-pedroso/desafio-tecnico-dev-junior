
import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";

import "./style.css";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children"
> & {
  label: string;
  erro?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      erro,
      type = "text",
      id,
      className = "",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className={`app-input-field ${className}`}>
        <label htmlFor={inputId}>
          {label}
        </label>

        <input
          id={inputId}
          ref={ref}
          type={type}
          className={`app-input ${erro ? "app-input-invalid" : ""}`}
          aria-invalid={!!erro}
          aria-describedby={erro ? errorId : undefined}
          {...props}
        />

        {erro && (
          <span id={errorId} className="app-input-error">
            {erro}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
