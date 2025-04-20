const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sequelize = require('../config/database');
const crypto = require('crypto'); // For generating IDs in memory mode

// Helper function to get user store based on connection status
const getUserStore = () => {
  return global.dbConnected ? null : global.inMemoryDB.users;
};

// Helper function to generate a secure hash (for password comparison in memory mode)
const generateHash = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Test database connection
router.get('/test', async (req, res) => {
    try {
        if (global.dbConnected) {
            await sequelize.authenticate();
            res.json({ message: 'Database connection successful' });
        } else {
            res.json({ message: 'Using in-memory data store', mode: 'memory' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

// Get current user
router.get('/me', auth, async (req, res) => {
    try {
        if (global.dbConnected) {
            const user = await User.findByPk(req.userId, {
                attributes: ['id', 'name', 'email']
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } else {
            const users = getUserStore();
            const user = users.find(u => u.id === req.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Return without password
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        if (global.dbConnected) {
            // Database mode
            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const user = await User.create({ email, password, name });

            // Generate token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
                expiresIn: '24h'
            });

            res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
        } else {
            // In-memory mode
            const users = getUserStore();
            
            // Check if user already exists
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const newUser = {
                id: crypto.randomUUID(),
                email,
                password: generateHash(password),
                name,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            users.push(newUser);

            // Generate token
            const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || 'your-secret-key', {
                expiresIn: '24h'
            });

            // Return without password
            const { password: pwd, ...userWithoutPassword } = newUser;
            res.status(201).json({ token, user: userWithoutPassword });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (global.dbConnected) {
            // Database mode
            // Find user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
                expiresIn: '24h'
            });

            res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        } else {
            // In-memory mode
            const users = getUserStore();
            
            // Find user
            const user = users.find(u => u.email === email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password (simple hash comparison for in-memory mode)
            const hashedPassword = generateHash(password);
            if (user.password !== hashedPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
                expiresIn: '24h'
            });

            // Return without password
            const { password: pwd, ...userWithoutPassword } = user;
            res.json({ token, user: userWithoutPassword });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;