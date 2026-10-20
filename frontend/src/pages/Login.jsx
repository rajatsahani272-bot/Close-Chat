
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import AuthLayout from '../components/auth/AuthLayout';
import AuthFormField from '../components/auth/AuthFormField';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/validators';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const emailError = validateEmail(form.email);

    if (emailError) {
      setError(emailError);
      return;
    }

    if (!form.password) {
      setError('Enter your password.');
      return;
    }

    setLoading(true);

    try {
      await login({
        email: form.email.trim(),
        password: form.password,
      });

      navigate(location.state?.from?.pathname || '/chat', {
        replace: true,
      });
    } catch (err) {
      setError(err.message || 'Unable to log in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue your conversations."
      footer={
        <>
          New to CloseChat? <Link to="/register">Create an account</Link>
        </>
      }
    >
      <form className="login-form" onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        {error && (
          <p className="login-form__error" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" block loading={loading} disabled={loading}>
          Log in
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
