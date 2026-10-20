
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
).replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;

  if (options.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  headers.set('Accept', 'application/json');

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      credentials: 'include',
    });
  } catch {
    throw new ApiError(
      'Unable to connect to the server. Please try again.',
      0
    );
  }

  const contentType = response.headers.get('content-type') || '';
  let data = null;

  if (response.status !== 204) {
    if (contentType.includes('application/json')) {
      data = await response.json().catch(() => null);
    } else {
      data = await response.text().catch(() => null);
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === 'object'
        ? data.message || data.error
        : null;

    throw new ApiError(
      message || `Request failed (${response.status}).`,
      response.status,
      data
    );
  }

  return data;
}

const api = {
  get: (path, options = {}) =>
    request(path, { ...options, method: 'GET' }),

  post: (path, body, options = {}) =>
    request(path, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    }),

  patch: (path, body, options = {}) =>
    request(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body ?? {}),
    }),

  delete: (path, options = {}) =>
    request(path, { ...options, method: 'DELETE' }),
};

export default api;
