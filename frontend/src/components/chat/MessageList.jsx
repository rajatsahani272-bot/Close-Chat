
import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';
import TypingIndicator from './TypingIndicator';
import './MessageList.css';

function MessageList({
  messages = [],
  currentUserId,
  loading = false,
  typing = false,
  onDeleteMessage,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages.length, typing]);

  if (loading) {
    return (
      <div className="message-list__loading">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="message-list"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.length === 0 ? (
        <div className="message-list__empty">
          <EmptyState
            title="Start a conversation"
            description="Send a message to start chatting."
          />
        </div>
      ) : (
        <div className="message-list__items">
          {messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              isOwn={
                String(message.sender?._id ?? message.senderId) ===
                String(currentUserId)
              }
              onDelete={onDeleteMessage}
            />
          ))}
        </div>
      )}

      {typing && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
