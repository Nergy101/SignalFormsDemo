/**
 * Simple API server for name validation
 * Run with: npm run server
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for Angular app (running on different port)
app.use(cors());
app.use(express.json());

// Validation endpoint: GET /verify?name=John
app.get('/verify', (req, res) => {
  const name = req.query.name || '';
  
  console.log(`[${new Date().toISOString()}] Validating name: "${name}"`);
  
  // Simulate server processing delay (500ms - 1500ms)
  const delay = Math.random() * 1000 + 500;
  
  setTimeout(() => {
    // Validation rules (same as fake implementation)
    let valid = true;
    let error = null;
    
    if (name.length < 3) {
      valid = false;
      error = 'Name must be at least 3 characters';
    } else if (name.toLowerCase().includes('test')) {
      valid = false;
      error = 'Name cannot contain "test"';
    }
    
    const response = {
      valid,
      error: error || null,
    };
    
    console.log(`[${new Date().toISOString()}] Validation result for "${name}":`, response);
    
    res.json(response);
  }, delay);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Validation API server running on http://localhost:${PORT}`);
  console.log(`   Endpoint: http://localhost:${PORT}/verify?name=<name>`);
  console.log(`   Health:   http://localhost:${PORT}/health\n`);
});
