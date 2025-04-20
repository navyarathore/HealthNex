/**
 * Diagnosis Service
 * Handles interactions with Google's Generative AI (Gemini) for symptom analysis
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { SYSTEM_CONTEXT, DIAGNOSTIC_PROMPTS, SPECIALIZED_PROMPTS } = require('./geminiPrompts');

// Initialize the Google Generative AI with your API key
let genAI;
let geminiProModel;
let isInitialized = false;

/**
 * Check if the Gemini API has been properly initialized
 * @returns {boolean} - Whether the API is initialized and ready to use
 */
function isGeminiInitialized() {
  return isInitialized && geminiProModel !== undefined;
}

/**
 * Initialize the Gemini API with the provided API key
 * @param {string} apiKey - The Gemini API key
 */
function initializeGeminiAPI(apiKey) {
  if (!apiKey) {
    throw new Error('Gemini API key is required');
  }
  
  try {
    console.log('Initializing Gemini API with key length:', apiKey.length);
    
    // Use the latest API version (v1 instead of v1beta)
    genAI = new GoogleGenerativeAI(apiKey);
    
    // The model name may have changed in newer versions
    // Try the current model naming convention first
    geminiProModel = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
      }
    });
    
    // Test the API connection with a simple prompt to verify it works
    geminiProModel.generateContent("Hello, please respond with 'API Connection Successful'")
      .then(result => {
        console.log('✅ Gemini API test response:', result.response.text());
        isInitialized = true;
        console.log('Gemini API initialized and tested successfully');
      })
      .catch(primaryError => {
        console.error('❌ Primary model test failed:', primaryError);
        console.log('Attempting to use alternate model name (gemini-pro)...');
        
        // If the newer model fails, try the older model name as fallback
        try {
          geminiProModel = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig: {
              temperature: 0.4,
              topP: 0.95,
              topK: 40,
            }
          });
          
          geminiProModel.generateContent("Hello, please respond with 'API Connection Successful'")
            .then(result => {
              console.log('✅ Fallback model test response:', result.response.text());
              isInitialized = true;
              console.log('Gemini API initialized with fallback model successfully');
            })
            .catch(fallbackError => {
              console.error('❌ Fallback model test failed:', fallbackError);
              isInitialized = false;
              throw fallbackError;
            });
        } catch (error) {
          console.error('❌ Failed to initialize fallback model:', error);
          isInitialized = false;
          throw error;
        }
      });
    
    return geminiProModel;
  } catch (error) {
    isInitialized = false;
    console.error('Failed to initialize Gemini API:', error);
    throw error;
  }
}

/**
 * Generate an initial diagnosis based on patient symptoms
 * @param {Array} symptoms - Array of symptom objects
 * @param {Object} patientInfo - Patient demographic and medical history
 * @returns {Object} - The diagnosis results
 */
async function generateInitialDiagnosis(symptoms, patientInfo) {
  if (!isGeminiInitialized()) {
    throw new Error('Gemini API not initialized. Call initializeGeminiAPI first.');
  }

  try {
    console.log('Generating diagnosis for symptoms:', 
                symptoms.map(s => `${s.description} (${s.severity}/10)`).join(', '));
    
    const prompt = DIAGNOSTIC_PROMPTS.initialAssessment(symptoms, patientInfo);
    console.log('Using prompt of length:', prompt.length);
    
    const result = await geminiProModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('Diagnosis generated successfully with length:', text.length);
    
    return {
      analysis: text,
      timestamp: new Date(),
      promptType: 'initialAssessment'
    };
  } catch (error) {
    console.error('Error generating diagnosis:', error);
    throw new Error(`Failed to generate diagnosis: ${error.message}`);
  }
}

/**
 * Generate follow-up questions based on initial diagnosis
 * @param {Array} symptoms - Array of symptom objects
 * @param {Object} patientInfo - Patient demographic and medical history
 * @param {string} previousResponse - The previous diagnosis response
 * @returns {Object} - The follow-up questions
 */
async function generateFollowUpQuestions(symptoms, patientInfo, previousResponse) {
  if (!isGeminiInitialized()) {
    throw new Error('Gemini API not initialized. Call initializeGeminiAPI first.');
  }

  try {
    const prompt = DIAGNOSTIC_PROMPTS.followUpQuestions(symptoms, patientInfo, previousResponse);
    
    const result = await geminiProModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return {
      questions: text,
      timestamp: new Date(),
      promptType: 'followUpQuestions'
    };
  } catch (error) {
    console.error('Error generating follow-up questions:', error);
    throw new Error(`Failed to generate follow-up questions: ${error.message}`);
  }
}

/**
 * Generate a detailed analysis of a specific condition
 * @param {Array} symptoms - Array of symptom objects
 * @param {Object} patientInfo - Patient demographic and medical history
 * @param {string} condition - The condition to analyze
 * @returns {Object} - The condition analysis
 */
async function analyzeCondition(symptoms, patientInfo, condition) {
  if (!isGeminiInitialized()) {
    throw new Error('Gemini API not initialized. Call initializeGeminiAPI first.');
  }

  try {
    const prompt = DIAGNOSTIC_PROMPTS.conditionAnalysis(symptoms, patientInfo, condition);
    
    const result = await geminiProModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return {
      analysis: text,
      condition: condition,
      timestamp: new Date(),
      promptType: 'conditionAnalysis'
    };
  } catch (error) {
    console.error('Error analyzing condition:', error);
    throw new Error(`Failed to analyze condition: ${error.message}`);
  }
}

/**
 * Check if symptoms require emergency attention
 * @param {Array} symptoms - Array of symptom objects
 * @param {Object} patientInfo - Patient demographic and medical history
 * @returns {Object} - The emergency assessment
 */
async function checkForEmergency(symptoms, patientInfo) {
  if (!isGeminiInitialized()) {
    throw new Error('Gemini API not initialized. Call initializeGeminiAPI first.');
  }

  try {
    const prompt = DIAGNOSTIC_PROMPTS.emergencyAssessment(symptoms, patientInfo);
    
    const result = await geminiProModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Determine if emergency is detected based on response
    const isEmergency = text.toLowerCase().includes('emergency') || 
                        text.toLowerCase().includes('immediate medical attention') ||
                        text.toLowerCase().includes('urgent care');
    
    return {
      assessment: text,
      isEmergency: isEmergency,
      timestamp: new Date(),
      promptType: 'emergencyAssessment'
    };
  } catch (error) {
    console.error('Error checking for emergency:', error);
    throw new Error(`Failed to check for emergency: ${error.message}`);
  }
}

/**
 * Get specialized assessment based on medical domain
 * @param {string} domain - The medical domain (e.g., 'cardiology', 'pediatric', 'mentalHealth')
 * @param {Array} symptoms - Array of symptom objects
 * @param {Object} patientInfo - Patient demographic and medical history
 * @returns {Object} - The specialized assessment
 */
async function getSpecializedAssessment(domain, symptoms, patientInfo) {
  if (!isGeminiInitialized()) {
    throw new Error('Gemini API not initialized. Call initializeGeminiAPI first.');
  }

  if (!SPECIALIZED_PROMPTS[domain]) {
    throw new Error(`Specialized prompt for domain '${domain}' not found`);
  }

  try {
    const prompt = SPECIALIZED_PROMPTS[domain](symptoms, patientInfo);
    
    const result = await geminiProModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return {
      assessment: text,
      domain: domain,
      timestamp: new Date(),
      promptType: `specialized_${domain}`
    };
  } catch (error) {
    console.error(`Error generating ${domain} assessment:`, error);
    throw new Error(`Failed to generate ${domain} assessment: ${error.message}`);
  }
}

/**
 * Get treatment information for a specific condition
 * @param {string} condition - The medical condition
 * @returns {Object} - The treatment information
 */
async function getTreatmentInfo(condition) {
  if (!isGeminiInitialized()) {
    throw new Error('Gemini API not initialized. Call initializeGeminiAPI first.');
  }

  try {
    const prompt = DIAGNOSTIC_PROMPTS.treatmentOptions(condition);
    
    const result = await geminiProModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return {
      treatmentInfo: text,
      condition: condition,
      timestamp: new Date(),
      promptType: 'treatmentOptions'
    };
  } catch (error) {
    console.error('Error getting treatment info:', error);
    throw new Error(`Failed to get treatment info: ${error.message}`);
  }
}

/**
 * Main diagnosis function that processes symptoms and generates a complete diagnosis
 * @param {Array} symptoms - Array of symptom objects with description and severity
 * @param {Object} patientInfo - Optional patient information (age, gender, medical history)
 * @returns {Object} - Complete diagnosis with assessment, recommendations, and emergency status
 */
async function generateDiagnosis(symptoms, patientInfo = {}) {
  if (!isGeminiInitialized()) {
    throw new Error('Gemini API not initialized. Call initializeGeminiAPI first.');
  }

  try {
    console.log('Generating complete diagnosis for symptoms:', 
      symptoms.map(s => `${s.description} (${s.severity}/10)`).join(', '));
    
    // Check for emergency conditions first
    const emergencyCheck = await checkForEmergency(symptoms, patientInfo);
    
    // Generate the initial diagnosis
    const initialDiagnosis = await generateInitialDiagnosis(symptoms, patientInfo);
    
    // Extract potential conditions from the diagnosis (simple parsing)
    const diagnosisText = initialDiagnosis.analysis;
    const conditionMatches = diagnosisText.match(/condition|diagnosis|assessment/gi);
    const hasConditions = conditionMatches && conditionMatches.length > 0;
    
    // Extract recommendations
    const recommendationMatches = diagnosisText.match(/recommendations?|advised?|suggested?|should/gi);
    const recommendationsText = recommendationMatches ? 
      diagnosisText.substring(diagnosisText.indexOf(recommendationMatches[0])) : 
      "Rest, stay hydrated, and consult with a healthcare provider if symptoms worsen.";
    
    // Parse recommendations into an array (simple extraction)
    const recommendationsList = recommendationsText
      .split(/\n|\./)
      .map(item => item.trim())
      .filter(item => item.length > 10 && !item.match(/recommendations?|advised?|suggested?|should/gi))
      .slice(0, 5);
    
    // Format final response
    return {
      id: 'diag-' + Date.now(),
      message: "Diagnosis completed",
      assessment: diagnosisText,
      symptoms: symptoms.map(s => s.description),
      recommendations: recommendationsList.length > 0 ? 
        recommendationsList : 
        [
          "Rest and stay hydrated",
          "Monitor your symptoms",
          "Take over-the-counter pain relievers if needed",
          "Consult with a healthcare provider if symptoms worsen"
        ],
      isEmergency: emergencyCheck.isEmergency,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating complete diagnosis:', error);
    throw new Error(`Failed to generate diagnosis: ${error.message}`);
  }
}

module.exports = {
  initializeGeminiAPI,
  isGeminiInitialized,
  generateDiagnosis, // Add this new function to exports
  generateInitialDiagnosis,
  generateFollowUpQuestions,
  analyzeCondition,
  checkForEmergency,
  getSpecializedAssessment,
  getTreatmentInfo
};