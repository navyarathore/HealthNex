import axios from 'axios';

// Define server URLs - will try multiple URLs if the primary fails
const SERVER_URLS = [
  'http://localhost:1234',  // Primary server URL
  'http://127.0.0.1:1234',  // Alternative localhost format
  'http://localhost:3000'   // Fallback port (if your server runs on 3000)
];

// Create a configurable axios instance
const createApiInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 15000, // Increased timeout for slower connections
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      console.log('🚀 API Request:', config.method.toUpperCase(), config.url, config.baseURL + config.url);
      
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Token found and added to request');
      } else {
        console.warn('No authentication token found in localStorage');
      }
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log('✅ API Response:', response.status);
      return response;
    },
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('❌ Response Error:', error.response.status, error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('❌ Network Error - No Response, is the server running?');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('❌ Request Setup Error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Start with the primary URL
let currentUrlIndex = 0;
let api = createApiInstance(SERVER_URLS[currentUrlIndex]);

// Add health check function to verify server connection
export const checkServerConnection = async () => {
  for (let i = 0; i < SERVER_URLS.length; i++) {
    const testApi = createApiInstance(SERVER_URLS[i]);
    try {
      console.log(`Testing connection to ${SERVER_URLS[i]}...`);
      const response = await testApi.get('/health', { timeout: 5000 });
      
      if (response.status === 200) {
        console.log(`✅ Server at ${SERVER_URLS[i]} is available!`);
        
        // If this isn't our current API, update it
        if (i !== currentUrlIndex) {
          currentUrlIndex = i;
          api = createApiInstance(SERVER_URLS[i]);
          console.log(`Switched API to use ${SERVER_URLS[i]}`);
        }
        
        return {
          connected: true,
          baseURL: SERVER_URLS[i],
          serverInfo: response.data
        };
      }
    } catch (error) {
      console.error(`❌ Failed to connect to ${SERVER_URLS[i]}:`, error.message);
    }
  }
  
  return {
    connected: false,
    message: "Unable to connect to any server endpoint. Please ensure the server is running."
  };
};

// Enhanced API object with retry logic
const enhancedApi = {
  get: async (url, config) => {
    try {
      return await api.get(url, config);
    } catch (error) {
      if (!error.response && error.code === 'ECONNABORTED') {
        // Try to reconnect if connection timed out
        const connectionCheck = await checkServerConnection();
        if (connectionCheck.connected) {
          // Retry with the new connection
          return await api.get(url, config);
        }
      }
      throw error;
    }
  },
  post: async (url, data, config) => {
    try {
      return await api.post(url, data, config);
    } catch (error) {
      if (!error.response && error.code === 'ECONNABORTED') {
        // Try to reconnect if connection timed out
        const connectionCheck = await checkServerConnection();
        if (connectionCheck.connected) {
          // Retry with the new connection
          return await api.post(url, data, config);
        }
      }
      throw error;
    }
  },
  put: async (url, data, config) => {
    try {
      return await api.put(url, data, config);
    } catch (error) {
      if (!error.response && error.code === 'ECONNABORTED') {
        const connectionCheck = await checkServerConnection();
        if (connectionCheck.connected) {
          return await api.put(url, data, config);
        }
      }
      throw error;
    }
  },
  delete: async (url, config) => {
    try {
      return await api.delete(url, config);
    } catch (error) {
      if (!error.response && error.code === 'ECONNABORTED') {
        const connectionCheck = await checkServerConnection();
        if (connectionCheck.connected) {
          return await api.delete(url, config);
        }
      }
      throw error;
    }
  }
};

// Run a connection check when the app starts
checkServerConnection().then(result => {
  if (result.connected) {
    console.log('Successfully connected to server:', result.baseURL);
  } else {
    console.error('Failed to connect to any server. Check if the server is running.');
  }
});

export default enhancedApi;