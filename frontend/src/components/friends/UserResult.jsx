
import { Check, Clock3, UserPlus } from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import './UserResult.css';

function UserResult({
  user,
  requestStatus = 'none',
  onAddFriend,
  onCancelRequest,
}) {
  if (!user) return null;

  const name = user.fullName || user.username || 'User';

  return (
    <article className="user-result">
      <Avatar name={name} src={user.avatar} size="md" />

      <div className="user-result__details">
        <h3>{name}</h3>
        <span>@{user.username}</span>
      </div>

      <div className="user-result__action">
        {requestStatus === 'none' && (
          <Button
            size="sm"
            onClick={() => onAddFriend?.(user._id)}
          >
            <UserPlus size={15} />
            Add
          </Button>
        )}

        {requestStatus === 'pending' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onCancelRequest?.(user._id)}
          >
            <Clock3 size={15} />
            Cancel
          </Button>
        )}

        {requestStatus === 'friends' && (
          <span className="user-result__status">
            <Check size={15} />
            Friends
          </span>
        )}

        {requestStatus === 'incoming' && (
          <span className="user-result__status">
            Request received
          </span>
        )}
      </div>
    </article>
  );
}

export default UserResult;
