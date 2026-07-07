require('dotenv').config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

async function checkSchema() {
  const https = require('https');
  const urlObj = new URL(`${url}/rest/v1/contact_messages`);
  
  const postData = JSON.stringify({
    name: "Test Schema",
    email: "test@worlify.ngo",
    subject: "Test Column Verification",
    message: "Verifying if subject column exists"
  });

  const options = {
    hostname: urlObj.hostname,
    port: 443,
    path: urlObj.pathname,
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'Prefer': 'return=representation'
    }
  };
  
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        console.log("Response status code:", res.statusCode);
        console.log("Response body:", parsed);
      } catch (e) {
        console.error("Failed to parse response:", e.message);
        console.log("Raw body:", data);
      }
    });
  });
  
  req.on('error', (err) => {
    console.error("HTTPS request error:", err.message);
  });
  
  req.write(postData);
  req.end();
}

checkSchema();
