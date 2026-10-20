
import FriendRequestItem from './FriendRequestItem';
import EmptyState from '../common/EmptyState';
import Loader from '../common/Loader';
import './FriendRequestList.css';

function FriendRequestList({
  requests = [],
  type = 'incoming',
  loading = false,
  onAccept,
  onReject,
  onCancel,
}) {
  if (loading) {
    return (
      <div className="friend-request-list__loading">
        <Loader />
      </div>
    );
  }

  if (!requests.length) {
    const incoming = type === 'incoming';

    return (
      <EmptyState
        title={incoming ? 'No incoming requests' : 'No pending requests'}
        description={
          incoming
            ? 'New friend requests will appear here.'
            : 'Friend requests you send will appear here.'
        }
      />
    );
  }

  return (
    <div className="friend-request-list">
      {requests.map((request) => (
        <FriendRequestItem
          key={request._id}
          request={request}
          type={type}
          onAccept={onAccept}
          onReject={onReject}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}

export default FriendRequestList;
