const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Symptom = require('../models/Symptom');
const User = require('../models/User');

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
        const symptom = await Symptom.create({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json(symptom);
    } catch (error) {
        res.status(400).json({ message: 'Error adding symptom', error: error.message });
    }
});

// Get all symptoms for a user
router.get('/', auth, async (req, res) => {
    try {
        const symptoms = await Symptom.findAll({
            where: { userId: req.userId },
            order: [['date', 'DESC']]
        });
        res.json(symptoms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching symptoms', error: error.message });
    }
});

// Update a symptom
router.patch('/:id', auth, async (req, res) => {
    try {
        const symptom = await Symptom.findOne({
            where: { id: req.params.id, userId: req.userId }
        });
        
        if (!symptom) {
            return res.status(404).json({ message: 'Symptom not found' });
        }

        await symptom.update(req.body);
        res.json(symptom);
    } catch (error) {
        res.status(400).json({ message: 'Error updating symptom', error: error.message });
    }
});

// Delete a symptom
router.delete('/:id', auth, async (req, res) => {
    try {
        const symptom = await Symptom.findOne({
            where: { id: req.params.id, userId: req.userId }
        });
        
        if (!symptom) {
            return res.status(404).json({ message: 'Symptom not found' });
        }

        await symptom.destroy();
        res.json({ message: 'Symptom deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting symptom', error: error.message });
    }
});

module.exports = router; 