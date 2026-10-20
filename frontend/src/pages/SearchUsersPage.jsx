
import { useState } from 'react';
import UserSearch from '../components/friends/UserSearch';
import UserResult from '../components/friends/UserResult';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import friendService from '../services/friendService';
import './SearchUsersPage.css';

function SearchUsersPage() {
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(username) {
    setError('');
    setSearched(Boolean(username));

    if (!username) {
      setUsers([]);
      return;
    }

    setLoading(true);

    try {
      const result = await friendService.searchUsers(username);
      setUsers(result);
    } catch (err) {
      setError(err.message || 'Could not search users.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(userId) {
    setError('');

    try {
      await friendService.sendRequest(userId);
      setStatuses((current) => ({ ...current, [userId]: 'pending' }));
    } catch (err) {
      setError(err.message || 'Could not send request.');
    }
  }

  async function handleCancel(userId) {
    setError('');

    try {
      const request = await friendService.getRequests('outgoing');
      const match = request.find(
        (item) => String(item.recipient?._id) === String(userId)
      );

      if (!match) throw new Error('Pending request not found.');

      await friendService.cancelRequest(match._id);

      setStatuses((current) => ({ ...current, [userId]: 'none' }));
    } catch (err) {
      setError(err.message || 'Could not cancel request.');
    }
  }

  return (
    <section className="search-users-page">
      <header className="search-users-page__header">
        <h1>Find your friends</h1>
        <p>Search by their unique username to send a friend request.</p>
      </header>

      <UserSearch onSearch={handleSearch} loading={loading} />

      {error && <p className="search-users-page__error" role="alert">{error}</p>}

      {loading ? (
        <div className="search-users-page__loading"><Loader /></div>
      ) : (
        <div className="search-users-page__results">
          {users.map((user) => (
            <UserResult
              key={user._id}
              user={user}
              requestStatus={statuses[user._id] || user.requestStatus || 'none'}
              onAddFriend={handleAdd}
              onCancelRequest={handleCancel}
            />
          ))}

          {searched && users.length === 0 && !error && (
            <EmptyState
              title="No users found"
              description="Check the username and try again."
            />
          )}

          {!searched && (
            <EmptyState
              title="Find someone you know"
              description="Enter their username above to get started."
            />
          )}
        </div>
      )}
    </section>
  );
}

export default SearchUsersPage;
