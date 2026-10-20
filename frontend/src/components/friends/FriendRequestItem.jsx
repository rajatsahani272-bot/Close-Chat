
import { Check, X } from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import './FriendRequestItem.css';

function FriendRequestItem({
  request,
  type = 'incoming',
  onAccept,
  onReject,
  onCancel,
}) {
  if (!request) return null;

  const user =
    type === 'incoming'
      ? request.sender
      : request.recipient;

  if (!user) return null;

  const name = user.fullName || user.username || 'User';

  return (
    <article className="friend-request-item">
      <Avatar name={name} src={user.avatar} size="md" />

      <div className="friend-request-item__details">
        <h3>{name}</h3>
        <span>@{user.username}</span>
      </div>

      <div className="friend-request-item__actions">
        {type === 'incoming' && (
          <>
            <Button
              size="sm"
              onClick={() => onAccept?.(request._id)}
            >
              <Check size={15} />
              Accept
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => onReject?.(request._id)}
            >
              <X size={15} />
              Reject
            </Button>
          </>
        )}

        {type === 'outgoing' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onCancel?.(request._id)}
          >
            Cancel request
          </Button>
        )}
      </div>
    </article>
  );
}

export default FriendRequestItem;
