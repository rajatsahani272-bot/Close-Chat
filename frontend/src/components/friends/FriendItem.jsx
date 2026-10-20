
import { MessageCircle, UserRound } from 'lucide-react';
import Avatar from '../common/Avatar';
import './FriendItem.css';

function FriendItem({ friend, onOpenChat, onRemove }) {
  if (!friend) return null;

  const name = friend.fullName || friend.username || 'User';

  return (
    <article className="friend-item">
      <Avatar name={name} src={friend.avatar} size="md" />

      <div className="friend-item__details">
        <h3>{name}</h3>
        <span>@{friend.username}</span>
      </div>

      <div className="friend-item__actions">
        {onOpenChat && (
          <button
            type="button"
            className="friend-item__button friend-item__button--primary"
            onClick={() => onOpenChat(friend)}
            aria-label={`Message ${name}`}
          >
            <MessageCircle size={17} />
          </button>
        )}

        {onRemove && (
          <button
            type="button"
            className="friend-item__button"
            onClick={() => onRemove(friend._id)}
            aria-label={`Remove ${name} from friends`}
          >
            <UserRound size={17} />
          </button>
        )}
      </div>
    </article>
  );
}

export default FriendItem;
