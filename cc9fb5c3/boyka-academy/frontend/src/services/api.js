const API_BASE = 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'حدث خطأ في الاتصال بالخادم');
  }
  return data;
};

export const api = {
  // Auth
  login: (credentials) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then(handleResponse),

  register: (userData) =>
    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }).then(handleResponse),

  // Authorized Fetch Helper
  authFetch: (endpoint, options = {}) => {
    const token = localStorage.getItem('boyka_token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
    return fetch(`${API_BASE}${endpoint}`, { ...options, headers }).then(handleResponse);
  },
};
