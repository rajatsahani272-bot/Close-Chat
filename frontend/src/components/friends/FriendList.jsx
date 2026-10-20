
import FriendItem from './FriendItem';
import EmptyState from '../common/EmptyState';
import Loader from '../common/Loader';
import './FriendList.css';

function FriendList({
  friends = [],
  loading = false,
  onOpenChat,
  onRemove,
}) {
  if (loading) {
    return (
      <div className="friend-list__loading">
        <Loader />
      </div>
    );
  }

  if (!friends.length) {
    return (
      <EmptyState
        title="No friends yet"
        description="Search for a username to connect with someone."
      />
    );
  }

  return (
    <div className="friend-list">
      {friends.map((friend) => (
        <FriendItem
          key={friend._id}
          friend={friend}
          onOpenChat={onOpenChat}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default FriendList;
