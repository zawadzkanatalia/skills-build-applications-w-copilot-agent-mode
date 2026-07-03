const DEFAULT_API_BASE_URL = 'http://localhost:8000';

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return DEFAULT_API_BASE_URL;
}

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export async function fetchCollection(path) {
  const response = await fetch(buildApiUrl(path), {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const preferredKeys = [
      'results',
      'items',
      'data',
      'records',
      'docs',
      'activities',
      'users',
      'teams',
      'leaderboard',
      'workouts',
    ];
    const fallbackKey = path.split('/').filter(Boolean).pop();

    if (fallbackKey) {
      preferredKeys.unshift(fallbackKey);
    }

    for (const key of preferredKeys) {
      if (Array.isArray(payload[key])) {
        return payload[key];
      }
    }

    const nestedCollection = Object.values(payload).find((value) => Array.isArray(value));
    if (nestedCollection) {
      return nestedCollection;
    }
  }

  return [];
}
