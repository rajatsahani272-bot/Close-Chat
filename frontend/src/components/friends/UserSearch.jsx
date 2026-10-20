
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import Input from '../common/Input';
import './UserSearch.css';

function UserSearch({
  onSearch,
  loading = false,
}) {
  const [username, setUsername] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const query = username.trim().replace(/^@/, '');

    if (query) onSearch?.(query);
  }

  function handleClear() {
    setUsername('');
    onSearch?.('');
  }

  return (
    <form className="user-search" onSubmit={handleSubmit}>
      <div className="user-search__field">
        <Input
          label="Search by username"
          name="username"
          placeholder="e.g. rajat_sahani"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="off"
          maxLength={30}
        />

        {username && (
          <button
            type="button"
            className="user-search__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="user-search__submit"
        disabled={loading || !username.trim()}
      >
        <Search size={17} />
        <span>{loading ? 'Searching...' : 'Search'}</span>
      </button>
    </form>
  );
}

export default UserSearch;
