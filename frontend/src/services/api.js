const API_BASE = '/api';

/**
 * Helper to perform JSON fetch with standardized error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }
    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`[API] Error calling ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Student Profile
  getStudent: () => request('/student'),
  updateStudent: (updates) =>
    request('/student', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  // Timetable
  getTimetable: (day) => {
    const query = day ? `?day=${encodeURIComponent(day)}` : '';
    return request(`/timetable${query}`);
  },

  // Notices
  getNotices: (category, search) => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return request(`/notices${qs}`);
  },
  markNoticeRead: (id) =>
    request(`/notices/${id}/read`, {
      method: 'PATCH',
    }),
  markAllNoticesRead: () =>
    request('/notices/mark-all-read', {
      method: 'POST',
    }),

  // Subjects
  getSubjects: (type) => {
    const query = type && type !== 'All' ? `?type=${encodeURIComponent(type)}` : '';
    return request(`/subjects${query}`);
  },
  getSubjectById: (id) => request(`/subjects/${id}`),

  // Homework
  getHomework: (status) => {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return request(`/homework${query}`);
  },
  submitHomework: (id) =>
    request(`/homework/${id}/submit`, {
      method: 'PATCH',
    }),

  // Assemblies
  getAssemblies: () => request('/assemblies'),

  // Results
  getResults: () => request('/results'),

  // Health
  checkHealth: () => request('/health'),
};

export default api;
