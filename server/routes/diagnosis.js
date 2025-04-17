const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Diagnosis = require('../models/Diagnosis');
const User = require('../models/User');
const { analyzeSymptoms } = require('../services/aiDiagnosisService');

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

// Get AI diagnosis for symptoms
router.post('/analyze', auth, async (req, res) => {
    try {
        const { symptoms } = req.body;
        
        if (!symptoms || symptoms.trim() === '') {
            return res.status(400).json({ message: 'Symptoms description is required' });
        }
        
        // Get AI diagnosis
        const diagnosisResult = analyzeSymptoms(symptoms);
        
        // Store diagnosis in database
        const savedDiagnosis = await Diagnosis.create({
            userId: req.userId,
            condition: diagnosisResult.condition,
            confidence: diagnosisResult.confidence,
            symptoms: diagnosisResult.symptoms,
            recommendations: diagnosisResult.recommendations,
            date: new Date()
        });
        
        res.status(201).json({
            id: savedDiagnosis.id,
            ...diagnosisResult
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating diagnosis', error: error.message });
    }
});

// Get diagnosis history for a user
router.get('/history', auth, async (req, res) => {
    try {
        const diagnoses = await Diagnosis.findAll({
            where: { userId: req.userId },
            order: [['date', 'DESC']],
            limit: 10 // Limit to most recent 10 diagnoses
        });
        
        res.json(diagnoses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diagnosis history', error: error.message });
    }
});

// Get a specific diagnosis by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const diagnosis = await Diagnosis.findOne({
            where: { 
                id: req.params.id,
                userId: req.userId
            }
        });
        
        if (!diagnosis) {
            return res.status(404).json({ message: 'Diagnosis not found' });
        }
        
        res.json(diagnosis);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diagnosis', error: error.message });
    }
});

module.exports = router;