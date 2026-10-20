
export function normalizeUsername(value = '') {
  return value.trim().replace(/^@/, '').toLowerCase();
}

export function validateUsername(value = '') {
  const username = normalizeUsername(value);

  if (username.length < 3 || username.length > 30) {
    return 'Username must be 3–30 characters long.';
  }

  if (!/^[a-z0-9_]+$/.test(username)) {
    return 'Use only lowercase letters, numbers and underscores.';
  }

  return '';
}

export function validateFullName(value = '') {
  const name = value.trim();

  if (name.length < 2 || name.length > 60) {
    return 'Name must be 2–60 characters long.';
  }

  return '';
}

export function validateEmail(value = '') {
  const email = value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Enter a valid email address.';
  }

  return '';
}

export function validatePassword(value = '') {
  if (value.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (value.length > 128) {
    return 'Password must be 128 characters or fewer.';
  }

  return '';
}

export function validateMessage(value = '') {
  const message = value.trim();

  if (!message) return 'Message cannot be empty.';
  if (message.length > 4000) return 'Message is too long.';

  return '';
}
