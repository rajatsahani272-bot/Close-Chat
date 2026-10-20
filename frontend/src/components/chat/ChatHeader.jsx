
import { ArrowLeft, MoreVertical } from 'lucide-react';
import Avatar from '../common/Avatar';
import './ChatHeader.css';

function ChatHeader({
  friend,
  onBack,
  onOpenActions,
}) {
  if (!friend) return null;

  return (
    <header className="chat-header">
      <div className="chat-header__identity">
        {onBack && (
          <button
            type="button"
            className="chat-header__back"
            onClick={onBack}
            aria-label="Back to conversations"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <Avatar
          name={friend.fullName || friend.username}
          src={friend.avatar}
          size="md"
        />

        <div className="chat-header__details">
          <h2>{friend.fullName || friend.username}</h2>
          <span>@{friend.username}</span>
        </div>
      </div>

      {onOpenActions && (
        <button
          type="button"
          className="chat-header__actions"
          onClick={onOpenActions}
          aria-label="Chat actions"
        >
          <MoreVertical size={20} />
        </button>
      )}
    </header>
  );
}

export default ChatHeader;
