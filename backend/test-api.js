import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    // Test 1: Get notices (should be empty initially)
    console.log('Testing GET /api/notices...');
    const response = await fetch(`${API_URL}/notices`);
    const data = await response.json();
    console.log('✓ Notices:', data);
    console.log('');
    
    // Test 2: Register a user
    console.log('Testing POST /api/auth/register...');
    const registerResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testadmin',
        password: 'test123',
        role: 'section-admin',
        section: 'Examination'
      })
    });
    const registerData = await registerResponse.json();
    console.log('✓ Register:', registerData);
    
  } catch (error) {
    console.error('✗ Error:', error.message);
  }
}

testAPI();