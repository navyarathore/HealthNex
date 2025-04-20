const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const diagnosisService = require('./services/diagnosisService');
const path = require('path'); // Add path module

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:1234', 'http://127.0.0.1:3000', 'http://127.0.0.1:1234'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.options('*', cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
  }
  next();
});

// Health check endpoint - responds immediately
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    time: new Date().toISOString(),
    aiStatus: diagnosisService.isGeminiInitialized() ? 'connected' : 'disconnected',
    dbStatus: global.dbConnected ? 'connected' : 'disconnected'
  });
});

// Root endpoint for API info
app.get('/api', (req, res) => {
  res.status(200).json({ 
    message: 'HealthNex API Server',
    endpoints: [
      'GET /health - Server health check',
      'GET /api/diagnosis/status - Check diagnosis service status',
      'POST /api/diagnosis/analyze - Analyze symptoms'
    ]
  });
});

// Load routes
const authRoutes = require('./routes/auth');
const symptomRoutes = require('./routes/symptoms');
const diagnosisRoutes = require('./routes/diagnosis');

// Register route handlers
app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/diagnosis', diagnosisRoutes);

// Serve static files from the React app build directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Check if we should serve static files in development for testing
if (process.env.SERVE_STATIC === 'true') {
  console.log('Serving static files from client/build directory');
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// The "catchall" handler: for any request that doesn't match an API route,
// send back the index.html file from the React build
app.get('*', (req, res, next) => {
  // Skip this middleware if it's an API request
  if (req.path.startsWith('/api/') || req.path === '/health') {
    return next();
  }
  
  // Check if we're in production or have SERVE_STATIC enabled
  if (process.env.NODE_ENV === 'production' || process.env.SERVE_STATIC === 'true') {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    // In development, send a proper 301/302 redirect rather than proxying the request
    // This avoids the infinite redirect loop
    res.status(307).send({
      message: 'This route is handled by the React frontend. Please use the React dev server directly.',
      reactDevServer: `http://localhost:1234${req.originalUrl}`
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler - must come after all other routes
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    error: 'Not found', 
    message: `Cannot ${req.method} ${req.path}`,
    help: 'Check that you are using the correct HTTP method and endpoint path'
  });
});

// Initialize global tracking variable
global.dbConnected = false;

// Create a function to start the server with port fallback
const startServer = (port) => {
  try {
    const server = app.listen(port, () => {
      console.log(`\n=== HealthNex Server ===`);
      console.log(`Server running on http://localhost:${port}`);
      console.log(`Gemini AI Status: ${diagnosisService.isGeminiInitialized() ? 'Connected ✅' : 'Disconnected ❌'}`);
      console.log(`Database Status: ${global.dbConnected ? 'Connected ✅' : 'Disconnected ❌'}`);
      console.log(`\nAPI Endpoints available at:`);
      console.log(`- http://localhost:${port}/health`);
      console.log(`- http://localhost:${port}/api/diagnosis/status`);
      console.log(`- http://localhost:${port}/api/diagnosis/analyze (POST)`);
      console.log(`\nPress Ctrl+C to stop the server\n`);
    });
    
    // Handle server errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use.`);
        
        if (process.env.PORT) {
          console.log(`Attempting to use environment-specified port: ${process.env.PORT}...`);
          startServer(parseInt(process.env.PORT));
        } else {
          const fallbackPort = port === 1234 ? 3001 : port + 1;
          console.log(`Attempting to use fallback port: ${fallbackPort}...`);
          startServer(fallbackPort);
        }
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
    
    return server;
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Initialize AI
(async function initializeAI() {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      console.error('⚠️ WARNING: Valid Gemini API key not found in environment variables.');
      console.error('Please set a valid GEMINI_API_KEY in your .env file.');
      console.error('AI diagnosis functionality will not work correctly.');
      return;
    }
    
    console.log('Initializing Gemini API...');
    await diagnosisService.initializeGeminiAPI(GEMINI_API_KEY);
    console.log('✅ Gemini API initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Gemini API:', error.message);
    console.error('AI diagnosis functionality will be in fallback mode.');
  }
})();

// Initialize database
(async function initDatabase() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established');
    
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
    global.dbConnected = true;
  } catch (err) {
    console.error('❌ Failed to connect to database:', err.message);
    console.error('Server will operate with in-memory data store mode');
    global.dbConnected = false;
    
    // Setup in-memory data stores as fallback
    global.inMemoryDB = {
      users: [],
      symptoms: [],
      diagnoses: []
    };
    
    console.log('✅ In-memory data store initialized successfully');
  }
})();

// Start the server
const PORT = process.env.PORT || 3000;
startServer(PORT);