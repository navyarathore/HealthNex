const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const diagnosisService = require('./services/diagnosisService');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration - using maximally permissive settings for testing
app.use(cors({
  origin: '*',  // Allow all origins for maximum compatibility during testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`[SERVER] ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint - respond immediately without waiting for any dependencies
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    serverTime: new Date().toISOString(),
    aiStatus: diagnosisService.isGeminiInitialized() ? 'connected' : 'disconnected',
    databaseStatus: global.dbConnected ? 'connected' : 'disconnected'
  });
});

// API status endpoint - also responds immediately
app.get('/api/diagnosis/status', (req, res) => {
  res.status(200).json({ 
    status: 'available',
    message: 'Diagnosis service is available',
    aiStatus: diagnosisService.isGeminiInitialized() ? 'AI mode' : 'fallback mode'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'HealthNex API Server',
    status: 'running',
    endpoints: [
      '/health - Server health check',
      '/api/diagnosis/status - Check diagnosis service status',
      '/api/diagnosis/analyze (POST) - Analyze symptoms'
    ]
  });
});

// Diagnosis endpoint that falls back to mock data if AI fails
app.post('/api/diagnosis/analyze', async (req, res) => {
  console.log('Received diagnosis request with symptoms:', 
    req.body.symptoms?.map(s => `${s.description} (${s.severity}/10)`).join(', '));
  
  try {
    // First try AI-powered diagnosis if available
    if (diagnosisService.isGeminiInitialized()) {
      try {
        console.log('Using AI-powered diagnosis...');
        const aiResult = await diagnosisService.generateDiagnosis(req.body.symptoms);
        return res.status(200).json(aiResult);
      } catch (aiError) {
        console.error('AI diagnosis failed, falling back to mock diagnosis:', aiError.message);
        // Fall through to mock diagnosis
      }
    }
    
    // Fallback to mock diagnosis
    console.log('Using mock diagnosis (AI not available)');
    const mockDiagnosisText = generateMockDiagnosis(req.body.symptoms);
    
    // Check if this is an emergency situation
    const isEmergency = 
      mockDiagnosisText.includes("IMPORTANT SAFETY WARNING") || 
      mockDiagnosisText.includes("seek emergency medical attention immediately");
    
    // Generate tailored recommendations based on symptoms
    const recommendations = [];
    
    // Core recommendations for everyone
    recommendations.push("Rest and stay hydrated");
    
    // Add specific recommendations based on symptoms
    const hasFever = req.body.symptoms?.some(s => s.description.toLowerCase().includes('fever'));
    const hasPain = req.body.symptoms?.some(s => 
      s.description.toLowerCase().includes('pain') || 
      s.description.toLowerCase().includes('ache') || 
      s.description.toLowerCase().includes('headache')
    );
    const hasRespiratory = req.body.symptoms?.some(s => 
      s.description.toLowerCase().includes('cough') || 
      s.description.toLowerCase().includes('throat') || 
      s.description.toLowerCase().includes('breath')
    );
    const hasGI = req.body.symptoms?.some(s => 
      s.description.toLowerCase().includes('nausea') || 
      s.description.toLowerCase().includes('vomit') || 
      s.description.toLowerCase().includes('diarrhea')
    );
    
    if (hasFever) {
      recommendations.push("Take fever-reducing medication as directed");
      recommendations.push("Monitor temperature regularly");
    }
    
    if (hasPain) {
      recommendations.push("Consider appropriate pain relief medication if needed");
    }
    
    if (hasRespiratory) {
      recommendations.push("Use a humidifier to ease respiratory symptoms");
      recommendations.push("Consider over-the-counter cough/cold medications appropriate for your symptoms");
    }
    
    if (hasGI) {
      recommendations.push("Maintain hydration with small, frequent sips of clear fluids");
      recommendations.push("Follow the BRAT diet (Bananas, Rice, Applesauce, Toast)");
    }
    
    // Add medical follow-up recommendation for everyone
    recommendations.push("Consult with a healthcare provider if symptoms persist or worsen");
    
    // Add emergency recommendation if needed
    if (isEmergency) {
      recommendations.unshift("SEEK EMERGENCY MEDICAL ATTENTION IMMEDIATELY");
    }
    
    const mockDiagnosis = {
      id: 'mock-' + Date.now(),
      message: isEmergency ? "EMERGENCY SITUATION DETECTED" : "Diagnosis completed (fallback mode)",
      assessment: mockDiagnosisText,
      symptoms: req.body.symptoms?.map(s => s.description) || [],
      recommendations: recommendations,
      isEmergency: isEmergency
    };
    
    res.status(200).json(mockDiagnosis);
  } catch (error) {
    console.error('Error generating diagnosis:', error);
    res.status(500).json({ 
      message: 'Failed to generate diagnosis', 
      error: error.message
    });
  }
});

// Generate a mock diagnosis based on symptoms
function generateMockDiagnosis(symptoms) {
  if (!symptoms || symptoms.length === 0) {
    return "Unable to provide assessment without symptom information.";
  }
  
  // Check for common symptom patterns
  const hasHeadache = symptoms.some(s => s.description.toLowerCase().includes('headache'));
  const hasFever = symptoms.some(s => s.description.toLowerCase().includes('fever'));
  const hasCough = symptoms.some(s => s.description.toLowerCase().includes('cough'));
  const hasSoreThroat = symptoms.some(s => s.description.toLowerCase().includes('throat'));
  const hasNausea = symptoms.some(s => s.description.toLowerCase().includes('nausea'));
  const hasFatigue = symptoms.some(s => s.description.toLowerCase().includes('fatigue') || 
                                 s.description.toLowerCase().includes('tired'));
  const hasRash = symptoms.some(s => s.description.toLowerCase().includes('rash') || 
                               s.description.toLowerCase().includes('skin') || 
                               s.description.toLowerCase().includes('hives'));
  const hasChestPain = symptoms.some(s => s.description.toLowerCase().includes('chest pain') || 
                                    s.description.toLowerCase().includes('chest discomfort'));
  const hasShortness = symptoms.some(s => s.description.toLowerCase().includes('breath') || 
                                   s.description.toLowerCase().includes('breathing') || 
                                   s.description.toLowerCase().includes('shortness'));
  const hasDizziness = symptoms.some(s => s.description.toLowerCase().includes('dizz') || 
                                   s.description.toLowerCase().includes('lightheaded') || 
                                   s.description.toLowerCase().includes('faint'));
  const hasAbdominalPain = symptoms.some(s => s.description.toLowerCase().includes('stomach') || 
                                       s.description.toLowerCase().includes('abdomen') || 
                                       s.description.toLowerCase().includes('abdominal'));
  const hasDiarrhea = symptoms.some(s => s.description.toLowerCase().includes('diarrhea'));
  const hasVomiting = symptoms.some(s => s.description.toLowerCase().includes('vomit'));
  const hasEarPain = symptoms.some(s => s.description.toLowerCase().includes('ear pain') || 
                                 s.description.toLowerCase().includes('earache'));
  const hasJointPain = symptoms.some(s => s.description.toLowerCase().includes('joint') || 
                                   s.description.toLowerCase().includes('arthritis'));
  const hasBackPain = symptoms.some(s => s.description.toLowerCase().includes('back pain'));
  const hasChills = symptoms.some(s => s.description.toLowerCase().includes('chill'));
  const hasSweats = symptoms.some(s => s.description.toLowerCase().includes('sweat'));
  
  // Check if any symptoms have severity >= 8 (indicating potentially serious condition)
  const hasHighSeveritySymptom = symptoms.some(s => s.severity >= 8);
  
  let assessment = "Based on the symptoms you've reported, here's a preliminary assessment:\n\n";
  
  // Emergency warning for chest pain with shortness of breath
  if (hasChestPain && hasShortness) {
    assessment = "⚠️ **IMPORTANT SAFETY WARNING** ⚠️\n\n";
    assessment += "The combination of chest pain and shortness of breath could indicate a serious medical condition that requires immediate evaluation, such as a heart attack or pulmonary embolism.\n\n";
    assessment += "**Please seek emergency medical attention immediately.**\n\n";
    assessment += "In the meantime:\n";
    assessment += "- Call emergency services (911 in the US)\n";
    assessment += "- Remain as calm as possible\n";
    assessment += "- If advised by a healthcare provider and not contraindicated, consider taking aspirin\n";
    assessment += "- Make sure emergency responders can access your location\n\n";
    
    // Return early for this emergency scenario
    return assessment;
  }
  
  // Check for various symptom patterns and provide appropriate assessments
  if (hasFever && hasCough && hasSoreThroat) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Upper Respiratory Infection (Common Cold)** - High likelihood\n";
    assessment += "   * Your combination of fever, cough, and sore throat is consistent with a viral upper respiratory infection.\n";
    assessment += "   * These typically resolve within 7-10 days with rest and hydration.\n\n";
    assessment += "2. **Influenza** - Medium likelihood\n";
    assessment += "   * If symptoms came on suddenly and are severe, influenza should be considered.\n";
    assessment += "   * Antiviral medications are most effective if started within 48 hours of symptom onset.\n\n";
    assessment += "3. **COVID-19** - Should be considered\n";
    assessment += "   * Your symptoms are consistent with COVID-19, which remains in circulation.\n";
    assessment += "   * Consider testing, especially if you've had known exposures.\n\n";
  } else if (hasHeadache && hasFever) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Viral Illness** - High likelihood\n";
    assessment += "   * Headache with fever is commonly seen in many viral infections.\n";
    assessment += "   * Rest, fluids, and over-the-counter fever reducers are typically recommended.\n\n";
    assessment += "2. **Migraine with Fever** - Medium likelihood\n";
    assessment += "   * If the headache is severe, one-sided, or associated with light/sound sensitivity.\n";
    assessment += "   * Migraines can sometimes be accompanied by an elevated temperature.\n\n";
  } else if (hasNausea && hasHeadache) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Migraine** - Medium likelihood\n";
    assessment += "   * Nausea and headache are classic migraine symptoms.\n";
    assessment += "   * If you have a history of migraines, this pattern would be consistent.\n\n";
    assessment += "2. **Gastroenteritis** - Medium likelihood\n";
    assessment += "   * If accompanied by other digestive symptoms, this could indicate a stomach bug.\n";
    assessment += "   * Hydration is particularly important with gastrointestinal symptoms.\n\n";
  } else if (hasFatigue && hasCough) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Bronchitis** - Medium likelihood\n";
    assessment += "   * Persistent cough with fatigue can indicate bronchial inflammation.\n";
    assessment += "   * Most cases are viral and resolve with supportive care.\n\n";
    assessment += "2. **Early Pneumonia** - Lower likelihood\n";
    assessment += "   * Worth considering if symptoms are severe or worsening.\n";
    assessment += "   * Would typically also include fever and possibly shortness of breath.\n\n";
  } else if (hasRash && hasFever) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Viral Exanthem** - High likelihood\n";
    assessment += "   * Many viral infections can cause both fever and rash.\n";
    assessment += "   * Most are self-limiting and resolve with supportive care.\n\n";
    assessment += "2. **Allergic Reaction** - Medium likelihood\n";
    assessment += "   * Particularly if you've recently started a new medication or been exposed to a new substance.\n";
    assessment += "   * If the rash is spreading rapidly or associated with facial/throat swelling, seek immediate medical care.\n\n";
    assessment += "3. **Rheumatologic Condition** - Lower likelihood\n";
    assessment += "   * Some autoimmune conditions can present with both rash and fever.\n";
    assessment += "   * These typically require medical evaluation.\n\n";
  } else if (hasEarPain) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Otitis Media (Middle Ear Infection)** - High likelihood\n";
    assessment += "   * Ear pain is the most common symptom of middle ear infection.\n";
    assessment += "   * Often accompanied by reduced hearing and sometimes fever.\n";
    assessment += "   * May require antibiotics if bacterial in origin.\n\n";
    assessment += "2. **Otitis Externa (Swimmer's Ear)** - Medium likelihood\n";
    assessment += "   * Inflammation of the outer ear canal often causing pain, especially with movement of the outer ear.\n";
    assessment += "   * More common in people who swim frequently or live in humid environments.\n";
    assessment += "   * Usually treated with antibiotic ear drops.\n\n";
  } else if (hasDiarrhea && (hasVomiting || hasNausea)) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Gastroenteritis (Stomach Flu)** - High likelihood\n";
    assessment += "   * Viral gastroenteritis is a common cause of diarrhea and vomiting/nausea.\n";
    assessment += "   * Typically self-limiting but dehydration is the main concern.\n";
    assessment += "   * Maintain hydration with small, frequent sips of clear fluids.\n\n";
    assessment += "2. **Food Poisoning** - Medium likelihood\n";
    assessment += "   * Especially if symptoms began shortly after eating (typically within 6 hours).\n";
    assessment += "   * May affect others who consumed the same food.\n\n";
    assessment += "3. **Medication Side Effect** - Lower likelihood\n";
    assessment += "   * Some medications, including antibiotics, can cause gastrointestinal upset.\n";
    assessment += "   * Review any recently started medications.\n\n";
  } else if (hasJointPain && hasFatigue) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Rheumatoid Arthritis** - Medium likelihood\n";
    assessment += "   * Inflammatory joint disease often accompanied by fatigue.\n";
    assessment += "   * Typically affects joints symmetrically (same joint on both sides).\n";
    assessment += "   * Morning stiffness lasting more than an hour is characteristic.\n\n";
    assessment += "2. **Fibromyalgia** - Medium likelihood\n";
    assessment += "   * Characterized by widespread pain and fatigue.\n";
    assessment += "   * Often accompanied by sleep disturbances and cognitive difficulties.\n\n";
    assessment += "3. **Systemic Lupus Erythematosus** - Lower likelihood\n";
    assessment += "   * Autoimmune condition that can cause joint pain and fatigue.\n";
    assessment += "   * Often accompanied by other symptoms like rash and fever.\n\n";
  } else if (hasBackPain) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Muscle Strain** - High likelihood\n";
    assessment += "   * Most commonly caused by improper lifting, sudden movements, or poor posture.\n";
    assessment += "   * Usually resolves within a few days to weeks with rest and appropriate pain management.\n\n";
    assessment += "2. **Disc Issue** - Medium likelihood\n";
    assessment += "   * If pain radiates down the leg (sciatica) or is associated with numbness/tingling.\n";
    assessment += "   * Often worse with sitting and bending forward.\n\n";
    assessment += "3. **Kidney Infection** - Lower likelihood\n";
    assessment += "   * If pain is in the flank area and accompanied by fever, urinary symptoms.\n";
    assessment += "   * Requires medical evaluation and typically antibiotics.\n\n";
  } else if (hasFever && hasChills && hasSweats) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Influenza** - High likelihood\n";
    assessment += "   * Classic flu symptoms include fever, chills, and sweats.\n";
    assessment += "   * Often accompanied by body aches, headache, and fatigue.\n";
    assessment += "   * Antiviral medications may be beneficial if started early.\n\n";
    assessment += "2. **Bacterial Infection** - Medium likelihood\n";
    assessment += "   * Various bacterial infections can cause fever with chills and sweats.\n";
    assessment += "   * Location of other symptoms may help determine the source.\n";
    assessment += "   * May require antibiotics depending on the type and severity.\n\n";
    assessment += "3. **Malaria** - Lower likelihood (depends on travel history)\n";
    assessment += "   * Should be considered in those with recent travel to endemic areas.\n";
    assessment += "   * Typically causes cyclical fevers with severe chills and sweats.\n";
    assessment += "   * Requires specific testing and treatment.\n\n";
  } else if (hasAbdominalPain && hasFever) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Appendicitis** - Medium likelihood\n";
    assessment += "   * Particularly if pain is in the right lower quadrant and worsening.\n";
    assessment += "   * Often associated with loss of appetite and nausea.\n";
    assessment += "   * Requires prompt medical evaluation as it may need surgical intervention.\n\n";
    assessment += "2. **Urinary Tract Infection** - Medium likelihood\n";
    assessment += "   * More common in women.\n";
    assessment += "   * Often accompanied by urinary symptoms (frequency, urgency, burning).\n";
    assessment += "   * Typically requires antibiotics.\n\n";
    assessment += "3. **Diverticulitis** - Lower likelihood\n";
    assessment += "   * More common in older adults.\n";
    assessment += "   * Pain often in the left lower quadrant.\n";
    assessment += "   * May require antibiotics and dietary modifications.\n\n";
  } else if (hasDizziness && hasHeadache) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Vestibular Migraine** - Medium likelihood\n";
    assessment += "   * Migraine variant that prominently features dizziness or vertigo.\n";
    assessment += "   * May or may not include the typical headache of migraine.\n\n";
    assessment += "2. **Inner Ear Disorder** - Medium likelihood\n";
    assessment += "   * Conditions like labyrinthitis or BPPV can cause significant dizziness.\n";
    assessment += "   * The headache may be secondary to the dizziness/discomfort.\n\n";
    assessment += "3. **Dehydration or Low Blood Sugar** - Medium likelihood\n";
    assessment += "   * Both can cause dizziness and headache.\n";
    assessment += "   * Try hydrating and eating a balanced meal to see if symptoms improve.\n\n";
  } else if (hasCough && hasShortness) {
    assessment += "### Possible Conditions\n\n";
    assessment += "1. **Asthma Exacerbation** - Medium likelihood\n";
    assessment += "   * If you have a history of asthma, this may represent a flare.\n";
    assessment += "   * Often triggered by respiratory infections, allergens, or exercise.\n";
    assessment += "   * Use rescue inhalers as prescribed and seek medical care if not improving.\n\n";
    assessment += "2. **Bronchitis** - Medium likelihood\n";
    assessment += "   * Inflammation of the airways causing cough and sometimes shortness of breath.\n";
    assessment += "   * Usually viral and self-limiting.\n\n";
    assessment += "3. **Pneumonia** - Medium likelihood\n";
    assessment += "   * Infection of the lung tissue.\n";
    assessment += "   * Often associated with fever and sometimes chest pain.\n";
    assessment += "   * May require antibiotics if bacterial in origin.\n\n";
  } else {
    assessment += "Your reported symptoms don't match a specific common pattern. Based on the information provided, here are some general considerations:\n\n";
    assessment += "- Your symptoms might represent a mild viral illness or early stage of a developing condition\n";
    assessment += "- Monitor for any changes or new symptoms\n";
    assessment += "- Consider consulting with a healthcare provider if symptoms persist or worsen\n\n";
  }
  
  // Add personalized recommendations based on symptom severity
  assessment += "### Recommendations\n\n";
  
  if (hasHighSeveritySymptom) {
    assessment += "**Note:** One or more of your symptoms is rated at a high severity level. Consider seeking medical evaluation sooner rather than later, especially if these symptoms are new or worsening.\n\n";
  }
  
  if (hasFever) {
    assessment += "* **For fever management:**\n";
    assessment += "  - Stay well-hydrated\n";
    assessment += "  - Consider over-the-counter fever reducers like acetaminophen or ibuprofen as directed\n";
    assessment += "  - Use lightweight clothing and bedding\n";
    assessment += "  - Seek medical attention for very high fevers (>103°F/39.4°C) or fevers lasting more than 3 days\n\n";
  }
  
  if (hasRash) {
    assessment += "* **For rash management:**\n";
    assessment += "  - Avoid scratching to prevent skin damage\n";
    assessment += "  - Try cool compresses for relief\n";
    assessment += "  - Consider over-the-counter hydrocortisone cream for itching\n";
    assessment += "  - Seek immediate medical care if the rash is spreading rapidly or accompanied by facial swelling\n\n";
  }
  
  if (hasNausea || hasVomiting || hasDiarrhea) {
    assessment += "* **For gastrointestinal symptoms:**\n";
    assessment += "  - Stay hydrated with small, frequent sips of clear fluids\n";
    assessment += "  - Try the BRAT diet (Bananas, Rice, Applesauce, Toast)\n";
    assessment += "  - Avoid dairy, caffeine, alcohol, and fatty or spicy foods\n";
    assessment += "  - Seek medical attention for severe dehydration signs or symptoms lasting more than 2-3 days\n\n";
  }
  
  if (hasCough) {
    assessment += "* **For cough management:**\n";
    assessment += "  - Stay well-hydrated\n";
    assessment += "  - Use honey (if over 1 year of age) to soothe throat irritation\n";
    assessment += "  - Consider over-the-counter cough suppressants for nighttime relief\n";
    assessment += "  - Humidify the air in your home\n\n";
  }
  
  if (hasHeadache) {
    assessment += "* **For headache management:**\n";
    assessment += "  - Rest in a quiet, dark room\n";
    assessment += "  - Apply cool compresses to the forehead\n";
    assessment += "  - Stay hydrated\n";
    assessment += "  - Consider over-the-counter pain relievers as directed\n\n";
  }
  
  if (hasBackPain || hasJointPain) {
    assessment += "* **For pain management:**\n";
    assessment += "  - Rest the affected area but avoid complete immobility\n";
    assessment += "  - Apply ice for the first 48-72 hours, then consider heat\n";
    assessment += "  - Consider over-the-counter anti-inflammatory medications if not contraindicated\n";
    assessment += "  - Use proper body mechanics when moving\n\n";
  }
  
  assessment += "### Important Notes\n\n";
  assessment += "* This is not a definitive diagnosis - only a healthcare provider can provide that after proper evaluation\n";
  assessment += "* If symptoms worsen significantly or new concerning symptoms develop, seek appropriate medical attention\n";
  assessment += "* This assessment is based solely on the symptoms you've reported and has limitations\n";
  assessment += "* If emergency warning signs develop (severe shortness of breath, chest pain, confusion, etc.), seek emergency care immediately\n";
  
  return assessment;
}

// Using routes only for auth and symptoms - diagnoses handled directly in server.js for reliability
const authRoutes = require('./routes/auth');
const symptomRoutes = require('./routes/symptoms');

// Register route handlers 
app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomRoutes);

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
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Create a function to start the server with port fallback
const startServer = (port) => {
  try {
    const server = app.listen(port, () => {
      console.log(`\n=== HealthNex AI Server ===`);
      console.log(`Server running at http://localhost:${port}`);
      console.log(`AI Status: ${diagnosisService.isGeminiInitialized() ? 'Connected ✅' : 'Fallback Mode ⚠️'}`);
      console.log(`DB Status: ${global.dbConnected ? 'Connected ✅' : 'Disconnected ⚠️'}`);
      console.log('\nAvailable endpoints:');
      console.log(`- GET  http://localhost:${port}/health`);
      console.log(`- GET  http://localhost:${port}/api/diagnosis/status`);
      console.log(`- POST http://localhost:${port}/api/diagnosis/analyze`);
      console.log('\nPress Ctrl+C to stop the server');
    });
    
    // Handle server errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use.`);
        
        // If specifically trying to use port 1234 and it fails, inform the user
        if (port === 1234) {
          console.log(`\nTo fix this problem, you can either:`);
          console.log(`1. Close the application using port 1234`);
          console.log(`2. Specify a different port when starting the server with:`);
          console.log(`   PORT=3000 node reliable-server.js\n`);
          
          // Check if PORT environment variable is explicitly set
          if (process.env.PORT) {
            console.log(`Attempting to use environment-specified port: ${process.env.PORT}...`);
            startServer(parseInt(process.env.PORT));
          } else {
            console.log(`Terminating server process. Please free port 1234 or specify a different port.`);
            process.exit(1);
          }
        } else {
          console.error('Failed to bind to alternative port. Please free up a port and try again.');
          process.exit(1);
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

// Initialize services in parallel
global.dbConnected = false;

// Initialize database in the background without blocking server startup
(async function initDatabase() {
  try {
    console.log('Attempting to connect to database...');
    await sequelize.authenticate();
    console.log('Database connection established');
    
    // Sync database models in the background
    try {
      await sequelize.sync({ alter: false }); // Use alter: false for safer startup
      console.log('Database synced successfully');
      global.dbConnected = true;
    } catch (syncError) {
      console.error('Failed to sync database:', syncError.message);
    }
  } catch (err) {
    console.error('Unable to connect to database:', err.message);
    console.log('Server will operate without database functionality');
  }
})();

// Initialize AI in the background without blocking server startup
(async function initAI() {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      console.warn('⚠️ No valid Gemini API key found in .env file');
      console.warn('AI diagnosis will use fallback mode');
      return;
    }
    
    console.log('Initializing Gemini AI...');
    await diagnosisService.initializeGeminiAPI(GEMINI_API_KEY);
    console.log('✅ Gemini AI initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error.message);
    console.log('Diagnosis service will use fallback mode');
  }
})();

// Start the server immediately (don't wait for DB or AI initialization)
console.log('Starting server...');
// Use PORT from environment variable if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;
startServer(PORT);