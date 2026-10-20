
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found">
      <MessageCircle size={34} />
      <p className="not-found__code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/">Back to home</Link>
    </main>
  );
}

export default NotFound;
