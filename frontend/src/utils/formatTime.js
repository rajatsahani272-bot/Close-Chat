
export function formatTime(value) {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeTime(value) {
  if (!value) return '';

  const date = new Date(value);
  const now = new Date();

  if (Number.isNaN(date.getTime())) return '';

  const elapsed = now.getTime() - date.getTime();

  if (elapsed < 0) return formatTime(date);

  if (elapsed < 60_000) return 'Just now';

  if (elapsed < 3_600_000) {
    return `${Math.floor(elapsed / 60_000)}m ago`;
  }

  if (date.toDateString() === now.toDateString()) {
    return formatTime(date);
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
  }).format(date);
}
