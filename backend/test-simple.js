const http = require('http');

function apiRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        try {
          console.log('Response:', JSON.parse(body));
        } catch {
          console.log('Response:', body);
        }
        resolve(JSON.parse(body));
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function test() {
  console.log('\n1️⃣ Testing GET /api/notices');
  await apiRequest('/api/notices');
  
  console.log('\n2️⃣ Testing POST /api/auth/register');
  await apiRequest('/api/auth/register', 'POST', {
    username: 'superadmin',
    password: 'super123',
    role: 'super-admin'
  });
  
  console.log('\n3️⃣ Testing POST /api/auth/login');
  await apiRequest('/api/auth/login', 'POST', {
    username: 'superadmin',
    password: 'super123'
  });
}

test().catch(console.error);
