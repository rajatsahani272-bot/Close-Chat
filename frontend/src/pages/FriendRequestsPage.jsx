
import { useEffect, useState } from 'react';
import FriendRequestList from '../components/friends/FriendRequestList';
import friendService from '../services/friendService';
import './FriendRequestsPage.css';

function FriendRequestsPage() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [activeTab, setActiveTab] = useState('incoming');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadRequests() {
    setLoading(true);
    setError('');

    try {
      const [received, sent] = await Promise.all([
        friendService.getRequests('incoming'),
        friendService.getRequests('outgoing'),
      ]);

      setIncoming(received);
      setOutgoing(sent);
    } catch (err) {
      setError(err.message || 'Could not load friend requests.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function performAction(action, requestId) {
    setError('');

    try {
      await action(requestId);
      await loadRequests();
    } catch (err) {
      setError(err.message || 'Unable to update the request.');
    }
  }

  const requests = activeTab === 'incoming' ? incoming : outgoing;

  return (
    <section className="friend-requests-page">
      <header className="friend-requests-page__header">
        <h1>Friend requests</h1>
        <p>Manage the people who want to connect with you.</p>
      </header>

      <div className="friend-requests-page__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'incoming'}
          className={activeTab === 'incoming' ? 'is-active' : ''}
          onClick={() => setActiveTab('incoming')}
        >
          Received ({incoming.length})
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'outgoing'}
          className={activeTab === 'outgoing' ? 'is-active' : ''}
          onClick={() => setActiveTab('outgoing')}
        >
          Sent ({outgoing.length})
        </button>
      </div>

      {error && <p className="friend-requests-page__error" role="alert">{error}</p>}

      <FriendRequestList
        requests={requests}
        type={activeTab}
        loading={loading}
        onAccept={(id) => performAction(friendService.acceptRequest, id)}
        onReject={(id) => performAction(friendService.rejectRequest, id)}
        onCancel={(id) => performAction(friendService.cancelRequest, id)}
      />
    </section>
  );
}

export default FriendRequestsPage;
