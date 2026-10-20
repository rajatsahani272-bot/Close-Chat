
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AuthLayout.css';

function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <main className="auth-layout">
      <div className="auth-layout__container">
        <Link to="/" className="auth-layout__brand">
          <span className="auth-layout__brand-icon">
            <MessageCircle size={22} />
          </span>

          <span>CloseChat</span>
        </Link>

        <section className="auth-layout__card">
          <div className="auth-layout__heading">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <div className="auth-layout__content">
            {children}
          </div>

          {footer && (
            <div className="auth-layout__footer">
              {footer}
            </div>
          )}
        </section>

        <p className="auth-layout__copyright">
          Private conversations. Just your people.
        </p>
      </div>
    </main>
  );
}

export default AuthLayout;
