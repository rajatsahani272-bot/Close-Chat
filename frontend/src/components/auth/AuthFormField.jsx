
import Input from '../common/Input';
import './AuthFormField.css';

function AuthFormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  autoComplete,
  required = true,
  maxLength,
  minLength,
}) {
  return (
    <div className="auth-form-field">
      <Input
        label={label}
        name={name}
        inputType={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        hint={hint}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
      />
    </div>
  );
}

export default AuthFormField;
