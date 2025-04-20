const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a more robust database connection with fallback options
const sequelize = new Sequelize(
  process.env.DB_NAME || 'healthnex_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // Add retry options for more resilient connections
    retry: {
      max: 3,
      timeout: 30000
    },
    // Set a connection timeout
    dialectOptions: {
      connectTimeout: 10000
    }
  }
);

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.error('The server will continue to run in limited mode without database functionality.');
    console.error('Make sure your MySQL server is running and check your database credentials.');
    return false;
  }
};

// Export both the sequelize instance and the connection testing function
module.exports = sequelize;
module.exports.testConnection = testConnection;