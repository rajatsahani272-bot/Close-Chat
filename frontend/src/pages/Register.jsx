
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import AuthLayout from '../components/auth/AuthLayout';
import AuthFormField from '../components/auth/AuthFormField';
import { useAuth } from '../hooks/useAuth';
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateUsername,
} from '../utils/validators';
import './Register.css';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === 'username' ? value.toLowerCase() : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const validationError =
      validateFullName(form.fullName) ||
      validateUsername(form.username) ||
      validateEmail(form.email) ||
      validatePassword(form.password);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register({
        fullName: form.fullName.trim(),
        username: form.username.trim().toLowerCase(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      navigate('/chat', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Choose a username your friends can find."
      footer={
        <>
          Already registered? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form className="register-form" onSubmit={handleSubmit}>
        <AuthFormField
          label="Full name"
          name="fullName"
          value={form.fullName}
          onChange={updateField}
          placeholder="Your name"
          autoComplete="name"
          maxLength={60}
        />

        <AuthFormField
          label="Username"
          name="username"
          value={form.username}
          onChange={updateField}
          placeholder="e.g. rajat_sahani"
          autoComplete="username"
          minLength={3}
          maxLength={30}
          hint="3–30 characters: lowercase letters, numbers and underscores."
        />

        <AuthFormField
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <AuthFormField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={updateField}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
        />

        <AuthFormField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={updateField}
          placeholder="Enter password again"
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
        />

        {error && (
          <p className="register-form__error" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" block loading={loading} disabled={loading}>
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Register;
