const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Symptom = require('../models/Symptom');
const User = require('../models/User');
const crypto = require('crypto'); // For generating IDs in memory mode

// Helper function to get symptom store based on connection status
const getSymptomStore = () => {
  return global.dbConnected ? null : global.inMemoryDB.symptoms;
};

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

// Add new symptom
router.post('/', auth, async (req, res) => {
    try {
        if (global.dbConnected) {
            // Database mode
            const symptom = await Symptom.create({
                ...req.body,
                userId: req.userId
            });
            res.status(201).json(symptom);
        } else {
            // In-memory mode
            const symptoms = getSymptomStore();
            const newSymptom = {
                id: crypto.randomUUID(),
                ...req.body,
                userId: req.userId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            symptoms.push(newSymptom);
            res.status(201).json(newSymptom);
        }
    } catch (error) {
        res.status(400).json({ message: 'Error adding symptom', error: error.message });
    }
});

// Get all symptoms for a user
router.get('/', auth, async (req, res) => {
    try {
        if (global.dbConnected) {
            // Database mode
            const symptoms = await Symptom.findAll({
                where: { userId: req.userId },
                order: [['date', 'DESC']]
            });
            res.json(symptoms);
        } else {
            // In-memory mode
            const symptoms = getSymptomStore();
            const userSymptoms = symptoms
                .filter(s => s.userId === req.userId)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            res.json(userSymptoms);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching symptoms', error: error.message });
    }
});

// Update a symptom
router.patch('/:id', auth, async (req, res) => {
    try {
        if (global.dbConnected) {
            // Database mode
            const symptom = await Symptom.findOne({
                where: { id: req.params.id, userId: req.userId }
            });
            
            if (!symptom) {
                return res.status(404).json({ message: 'Symptom not found' });
            }

            await symptom.update(req.body);
            res.json(symptom);
        } else {
            // In-memory mode
            const symptoms = getSymptomStore();
            const symptomIndex = symptoms.findIndex(s => 
                s.id === req.params.id && s.userId === req.userId
            );
            
            if (symptomIndex === -1) {
                return res.status(404).json({ message: 'Symptom not found' });
            }

            // Update the symptom
            symptoms[symptomIndex] = {
                ...symptoms[symptomIndex],
                ...req.body,
                updatedAt: new Date()
            };
            
            res.json(symptoms[symptomIndex]);
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating symptom', error: error.message });
    }
});

// Delete a symptom
router.delete('/:id', auth, async (req, res) => {
    try {
        if (global.dbConnected) {
            // Database mode
            const symptom = await Symptom.findOne({
                where: { id: req.params.id, userId: req.userId }
            });
            
            if (!symptom) {
                return res.status(404).json({ message: 'Symptom not found' });
            }

            await symptom.destroy();
            res.json({ message: 'Symptom deleted successfully' });
        } else {
            // In-memory mode
            const symptoms = getSymptomStore();
            const symptomIndex = symptoms.findIndex(s => 
                s.id === req.params.id && s.userId === req.userId
            );
            
            if (symptomIndex === -1) {
                return res.status(404).json({ message: 'Symptom not found' });
            }

            // Remove the symptom
            symptoms.splice(symptomIndex, 1);
            res.json({ message: 'Symptom deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting symptom', error: error.message });
    }
});

module.exports = router;