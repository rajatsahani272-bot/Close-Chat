
import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Input.css";

export default function Input({
  label,
  id,
  error,
  hint,
  type = "text",
  className = "",
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`ui-field ${className}`}>
      {label && (
        <label className="ui-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={`ui-field__control ${error ? "has-error" : ""}`}>
        <input
          {...props}
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          className="ui-field__input"
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
        />

        {isPassword && (
          <button
            type="button"
            className="ui-field__toggle"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="ui-field__error" id={`${inputId}-error`}>
          {error}
        </p>
      )}

      {!error && hint && (
        <p className="ui-field__hint" id={`${inputId}-hint`}>
          {hint}
        </p>
      )}
    </div>
  );
}
