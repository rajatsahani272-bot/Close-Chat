
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FriendList from '../components/friends/FriendList';
import Loader from '../components/common/Loader';
import friendService from '../services/friendService';
import './FriendsPage.css';

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    friendService.getFriends()
      .then((result) => {
        if (active) setFriends(result);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Could not load friends.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="friends-page">
      <header className="friends-page__header">
        <div>
          <h1>Your friends</h1>
          <p>People you can message privately.</p>
        </div>
      </header>

      {error && <p className="friends-page__error" role="alert">{error}</p>}

      {loading ? (
        <div className="friends-page__loading"><Loader /></div>
      ) : (
        <FriendList
          friends={friends}
          onOpenChat={(friend) => navigate(`/chat/${friend._id}`)}
          onRemove={async (friendId) => {
            try {
              await friendService.removeFriend(friendId);
              setFriends((current) =>
                current.filter((friend) => friend._id !== friendId)
              );
            } catch (err) {
              setError(err.message || 'Could not remove friend.');
            }
          }}
        />
      )}
    </section>
  );
}

export default FriendsPage;
