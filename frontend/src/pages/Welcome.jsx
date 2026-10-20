
import { Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Users } from 'lucide-react';
import Button from '../components/common/Button';
import './Welcome.css';

function Welcome() {
  return (
    <main className="welcome-page">
      <header className="welcome-page__header">
        <Link to="/" className="welcome-page__brand">
          <MessageCircle size={23} />
          <span>CloseChat</span>
        </Link>

        <div className="welcome-page__header-actions">
          <Link to="/login">Log in</Link>
          <Button onClick={() => window.location.assign('/register')}>
            Get started
          </Button>
        </div>
      </header>

      <section className="welcome-page__hero">
        <span className="welcome-page__eyebrow">
          <ShieldCheck size={15} />
          A quieter space for your people
        </span>

        <h1>
          Your conversations.
          <br />
          <span>Your circle.</span>
        </h1>

        <p>
          A simple, private place to message the friends you choose.
          No crowded feeds. Just meaningful conversations.
        </p>

        <div className="welcome-page__actions">
          <Link to="/register" className="welcome-page__primary">
            Create your account
          </Link>
          <Link to="/login" className="welcome-page__secondary">
            I already have an account
          </Link>
        </div>

        <div className="welcome-page__features">
          <div>
            <Users size={19} />
            <span>Friends only</span>
          </div>
          <div>
            <MessageCircle size={19} />
            <span>One-to-one chat</span>
          </div>
          <div>
            <ShieldCheck size={19} />
            <span>Privacy focused</span>
          </div>
        </div>
      </section>

      <footer className="welcome-page__footer">
        CloseChat · Conversations made personal.
      </footer>
    </main>
  );
}

export default Welcome;
