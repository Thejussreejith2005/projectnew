const API_URL = 'http://localhost:5000/api';

// Helper function to get token
function getToken() {
  return localStorage.getItem('token');
}

// Helper function for authenticated requests
async function authFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(url, { ...options, headers });
}

// Login Function
async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect based on role
      if (data.user.role === 'super-admin') {
        window.location.href = 'admin-dashboard.html';
      } else if (data.user.role === 'section-admin') {
        window.location.href = 'section-admin.html';
      } else {
        window.location.href = 'student-dashboard.html';
      }
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please try again.');
  }
}

// Fetch Notices
async function fetchNotices(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.section) params.append('section', filters.section);
    if (filters.search) params.append('search', filters.search);
    
    const response = await fetch(`${API_URL}/notices?${params}`);
    const data = await response.json();
    
    if (data.success) {
      return data.notices;
    }
    return [];
  } catch (error) {
    console.error('Fetch notices error:', error);
    return [];
  }
}

// Create Notice
async function createNotice(noticeData) {
  try {
    const response = await authFetch(`${API_URL}/notices`, {
      method: 'POST',
      body: JSON.stringify(noticeData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Notice created successfully!');
      window.location.href = 'section-admin.html';
    } else {
      alert(data.message || 'Failed to create notice');
    }
  } catch (error) {
    console.error('Create notice error:', error);
    alert('Failed to create notice');
  }
}

// Update Notice
async function updateNotice(id, noticeData) {
  try {
    const response = await authFetch(`${API_URL}/notices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(noticeData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Notice updated successfully!');
      return true;
    } else {
      alert(data.message || 'Failed to update notice');
      return false;
    }
  } catch (error) {
    console.error('Update notice error:', error);
    alert('Failed to update notice');
    return false;
  }
}

// Delete Notice
async function deleteNotice(id) {
  try {
    const response = await authFetch(`${API_URL}/notices/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Notice deleted successfully!');
      return true;
    } else {
      alert(data.message || 'Failed to delete notice');
      return false;
    }
  } catch (error) {
    console.error('Delete notice error:', error);
    alert('Failed to delete notice');
    return false;
  }
}

// Check if user is logged in
function checkAuth() {
  const token = getToken();
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    window.location.href = 'index.html';
    return null;
  }
  
  return JSON.parse(user);
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}