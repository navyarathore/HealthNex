const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Diagnosis = require('../models/Diagnosis');
const User = require('../models/User');
const diagnosisService = require('../services/diagnosisService');
const crypto = require('crypto'); // For generating IDs in memory mode

// Helper function to get diagnosis store based on connection status
const getDiagnosisStore = () => {
  return global.dbConnected ? null : global.inMemoryDB.diagnoses;
};

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Please authenticate with a proper token' });
        }
        
        const token = authHeader.replace('Bearer ', '');
        
        // Handle both real tokens and the mock token
        if (token === 'mock-jwt-token-for-testing-123456789') {
            // This is the mock token from AuthContext.js
            console.log('Using mock authentication token');
            req.userId = 'test-user-123';
            next();
            return;
        }
        
        // For real tokens, verify with JWT
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            req.userId = decoded.userId;
            next();
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError.message);
            return res.status(401).json({ message: 'Token invalid or expired' });
        }
    } catch (error) {
        console.error('Auth error:', error.message);
        res.status(401).json({ message: 'Please authenticate' });
    }
};

// Check if Gemini API is properly initialized
const checkGeminiAvailability = (req, res, next) => {
    try {
        if (!diagnosisService.isGeminiInitialized()) {
            return res.status(503).json({ 
                message: 'AI diagnosis service is temporarily unavailable',
                reason: 'Gemini API not initialized. Please check server logs for details.',
                fallbackMode: true
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

// Check API status
router.get('/status', (req, res) => {
    try {
        const isAvailable = diagnosisService.isGeminiInitialized();
        if (isAvailable) {
            res.json({ 
                status: 'available',
                message: 'AI diagnosis service is available'
            });
        } else {
            res.status(503).json({ 
                status: 'unavailable',
                message: 'AI diagnosis service is temporarily unavailable',
                reason: 'Gemini API not initialized',
                fallbackMode: true
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Error checking API status', 
            error: error.message 
        });
    }
});

// Get diagnosis for symptoms
router.post('/analyze', auth, checkGeminiAvailability, async (req, res) => {
    try {
        const { symptoms, patientInfo } = req.body;
        
        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({ message: 'Valid symptoms array is required' });
        }
        
        // Generate complete diagnosis with our new function
        const diagnosisResult = await diagnosisService.generateDiagnosis(symptoms, patientInfo);
        
        if (global.dbConnected) {
            // Database mode - Store diagnosis in database
            const savedDiagnosis = await Diagnosis.create({
                userId: req.userId,
                condition: "AI Assessment",
                confidence: 70, // Default confidence
                symptoms: diagnosisResult.symptoms,
                recommendations: diagnosisResult.recommendations,
                message: diagnosisResult.assessment,
                date: new Date(),
                isEmergency: diagnosisResult.isEmergency
            });
            
            res.status(201).json({
                id: savedDiagnosis.id,
                message: diagnosisResult.message,
                assessment: diagnosisResult.assessment,
                recommendations: diagnosisResult.recommendations,
                isEmergency: diagnosisResult.isEmergency
            });
        } else {
            // In-memory mode
            const diagnoses = getDiagnosisStore();
            const newDiagnosis = {
                id: crypto.randomUUID(),
                userId: req.userId,
                condition: "AI Assessment",
                confidence: 70, // Default confidence
                symptoms: diagnosisResult.symptoms,
                recommendations: diagnosisResult.recommendations,
                message: diagnosisResult.assessment,
                date: new Date(),
                isEmergency: diagnosisResult.isEmergency,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            diagnoses.push(newDiagnosis);
            
            res.status(201).json({
                id: newDiagnosis.id,
                message: diagnosisResult.message,
                assessment: diagnosisResult.assessment,
                recommendations: diagnosisResult.recommendations,
                isEmergency: diagnosisResult.isEmergency
            });
        }
    } catch (error) {
        console.error('Error in /analyze endpoint:', error);
        
        // Provide more detailed error information for debugging
        console.error('Error details:', JSON.stringify({
            message: error.message,
            stack: error.stack,
            name: error.name
        }));
        
        // Create a fallback diagnosis if AI fails
        try {
            // Simple fallback response
            const fallbackDiagnosis = {
                id: 'fallback-' + Date.now(),
                message: "We couldn't process your symptoms with our AI at this time",
                assessment: "Our diagnostic system is experiencing technical difficulties. " +
                           "This doesn't mean your symptoms aren't important. " + 
                           "Please consider the following general recommendations.",
                recommendations: [
                    "If symptoms are severe (difficulty breathing, severe pain, etc.), seek immediate medical care",
                    "For non-severe symptoms, consult with a healthcare provider",
                    "Rest and stay hydrated",
                    "Monitor your symptoms for any changes",
                    "Try our symptom checker again later"
                ],
                isEmergency: false,
                fallbackMode: true
            };
            
            if (global.dbConnected) {
                // Store fallback in database if possible
                if (req.userId && symptoms) {
                    const savedFallback = await Diagnosis.create({
                        userId: req.userId,
                        condition: "System Unavailable - Fallback Response",
                        confidence: 0,
                        symptoms: symptoms.map(s => s.description),
                        recommendations: fallbackDiagnosis.recommendations,
                        message: fallbackDiagnosis.assessment,
                        date: new Date(),
                        isEmergency: false
                    });
                    fallbackDiagnosis.id = savedFallback.id;
                }
            } else {
                // In-memory mode
                const diagnoses = getDiagnosisStore();
                const fallbackObj = {
                    id: crypto.randomUUID(),
                    userId: req.userId,
                    condition: "System Unavailable - Fallback Response",
                    confidence: 0,
                    symptoms: symptoms ? symptoms.map(s => s.description) : [],
                    recommendations: fallbackDiagnosis.recommendations,
                    message: fallbackDiagnosis.assessment,
                    date: new Date(),
                    isEmergency: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                
                diagnoses.push(fallbackObj);
                fallbackDiagnosis.id = fallbackObj.id;
            }
            
            res.status(500).json(fallbackDiagnosis);
        } catch (fallbackError) {
            // If even the fallback fails, send simple error
            console.error('Fallback error:', fallbackError);
            res.status(500).json({ 
                message: 'Error generating diagnosis', 
                error: error.message,
                fallbackMode: true
            });
        }
    }
});

// Get follow-up questions for a diagnosis
router.post('/follow-up/:diagnosisId', auth, checkGeminiAvailability, async (req, res) => {
    try {
        const diagnosisId = req.params.diagnosisId;
        const { symptoms, patientInfo } = req.body;
        
        let diagnosis;
        
        if (global.dbConnected) {
            // Database mode
            diagnosis = await Diagnosis.findOne({
                where: { 
                    id: diagnosisId,
                    userId: req.userId
                }
            });
        } else {
            // In-memory mode
            const diagnoses = getDiagnosisStore();
            diagnosis = diagnoses.find(d => d.id === diagnosisId && d.userId === req.userId);
        }
        
        if (!diagnosis) {
            return res.status(404).json({ message: 'Diagnosis not found' });
        }
        
        // Generate follow-up questions
        const followUpResult = await diagnosisService.generateFollowUpQuestions(
            symptoms, 
            patientInfo, 
            diagnosis.message
        );
        
        res.json({
            diagnosisId: diagnosisId,
            followUpQuestions: followUpResult.questions
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating follow-up questions', error: error.message });
    }
});

// Get analysis for a specific condition
router.post('/analyze-condition', auth, checkGeminiAvailability, async (req, res) => {
    try {
        const { symptoms, patientInfo, condition } = req.body;
        
        if (!condition) {
            return res.status(400).json({ message: 'Condition is required' });
        }
        
        // Generate condition analysis
        const analysisResult = await diagnosisService.analyzeCondition(
            symptoms,
            patientInfo,
            condition
        );
        
        res.json({
            condition: condition,
            analysis: analysisResult.analysis
        });
    } catch (error) {
        res.status(500).json({ message: 'Error analyzing condition', error: error.message });
    }
});

// Get treatment information for a condition
router.get('/treatment/:condition', auth, checkGeminiAvailability, async (req, res) => {
    try {
        const condition = req.params.condition;
        
        if (!condition) {
            return res.status(400).json({ message: 'Condition is required' });
        }
        
        // Get treatment information
        const treatmentInfo = await diagnosisService.getTreatmentInfo(condition);
        
        res.json({
            condition: condition,
            treatmentInfo: treatmentInfo.treatmentInfo
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching treatment information', error: error.message });
    }
});

// Get specialized assessment
router.post('/specialized/:domain', auth, checkGeminiAvailability, async (req, res) => {
    try {
        const domain = req.params.domain;
        const { symptoms, patientInfo } = req.body;
        
        if (!domain) {
            return res.status(400).json({ message: 'Specialized domain is required' });
        }
        
        // Get specialized assessment
        const assessmentResult = await diagnosisService.getSpecializedAssessment(
            domain,
            symptoms,
            patientInfo
        );
        
        res.json({
            domain: domain,
            assessment: assessmentResult.assessment
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating specialized assessment', error: error.message });
    }
});

// Get diagnosis history for a user
router.get('/history', auth, async (req, res) => {
    try {
        if (global.dbConnected) {
            // Database mode
            const diagnoses = await Diagnosis.findAll({
                where: { userId: req.userId },
                order: [['date', 'DESC']],
                limit: 10 // Limit to most recent 10 diagnoses
            });
            
            res.json(diagnoses);
        } else {
            // In-memory mode
            const diagnoses = getDiagnosisStore();
            const userDiagnoses = diagnoses
                .filter(d => d.userId === req.userId)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 10); // Limit to most recent 10 diagnoses
                
            res.json(userDiagnoses);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diagnosis history', error: error.message });
    }
});

// Get a specific diagnosis by ID
router.get('/:id', auth, async (req, res) => {
    try {
        if (global.dbConnected) {
            // Database mode
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
        } else {
            // In-memory mode
            const diagnoses = getDiagnosisStore();
            const diagnosis = diagnoses.find(d => 
                d.id === req.params.id && d.userId === req.userId
            );
            
            if (!diagnosis) {
                return res.status(404).json({ message: 'Diagnosis not found' });
            }
            
            res.json(diagnosis);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diagnosis', error: error.message });
    }
});

module.exports = router;