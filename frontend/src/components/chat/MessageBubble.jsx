
import MessageStatus from './MessageStatus';
import MessageActions from './MessageActions';
import './MessageBubble.css';

function MessageBubble({
  message,
  isOwn = false,
  onDelete,
}) {
  if (!message) return null;

  const text = message.content ?? message.text ?? '';
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <article
      className={`message-row ${isOwn ? 'message-row--own' : 'message-row--other'}`}
    >
      <div className="message-bubble">
        <p className="message-bubble__content">{text}</p>

        <div className="message-bubble__meta">
          <time dateTime={message.createdAt || undefined}>
            {time}
          </time>

          {isOwn && (
            <MessageStatus status={message.status || 'sent'} />
          )}
        </div>
      </div>

      {isOwn && onDelete && (
        <MessageActions
          message={message}
          onDelete={onDelete}
        />
      )}
    </article>
  );
}

export default MessageBubble;
