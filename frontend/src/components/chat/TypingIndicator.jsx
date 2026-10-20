
import './TypingIndicator.css';

function TypingIndicator({ name = 'Friend' }) {
  return (
    <div
      className="typing-indicator"
      role="status"
      aria-label={`${name} is typing`}
    >
      <span className="typing-indicator__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>

      <span className="typing-indicator__text">
        {name} is typing
      </span>
    </div>
  );
}

export default TypingIndicator;
