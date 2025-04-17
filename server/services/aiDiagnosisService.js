/**
 * Mock AI Diagnosis Service
 * 
 * This service simulates an AI-powered medical diagnosis system.
 * In a production environment, this would connect to a real medical AI API.
 */

// A simple database of conditions and their associated symptoms
const conditionsDatabase = [
  {
    condition: "Common Cold",
    symptoms: ["cough", "runny nose", "sore throat", "congestion", "sneezing", "headache"],
    confidence: () => Math.floor(Math.random() * 15) + 70, // 70-85% confidence
    recommendations: [
      "Get plenty of rest",
      "Stay hydrated",
      "Take over-the-counter cold medicine as directed",
      "Use a humidifier to ease congestion",
      "Monitor symptoms and consult a doctor if they worsen"
    ]
  },
  {
    condition: "Influenza (Flu)",
    symptoms: ["fever", "chills", "body aches", "cough", "fatigue", "headache"],
    confidence: () => Math.floor(Math.random() * 15) + 75, // 75-90% confidence
    recommendations: [
      "Rest and avoid physical exertion",
      "Stay hydrated with water and clear fluids",
      "Take fever-reducing medications as needed",
      "Consider antiviral medications within 48 hours of symptom onset",
      "Isolate to prevent spreading to others"
    ]
  },
  {
    condition: "Allergies",
    symptoms: ["sneezing", "itchy eyes", "runny nose", "congestion", "watery eyes"],
    confidence: () => Math.floor(Math.random() * 20) + 75, // 75-95% confidence
    recommendations: [
      "Avoid known allergens when possible",
      "Take antihistamines as directed",
      "Use nasal sprays for symptom relief",
      "Keep windows closed during high pollen seasons",
      "Consider seeing an allergist for testing"
    ]
  },
  {
    condition: "Migraine",
    symptoms: ["headache", "sensitivity to light", "nausea", "aura", "vision disturbances"],
    confidence: () => Math.floor(Math.random() * 15) + 80, // 80-95% confidence
    recommendations: [
      "Rest in a quiet, dark room",
      "Apply cold compresses to the forehead",
      "Take prescribed migraine medications",
      "Keep a headache diary to identify triggers",
      "Stay hydrated and maintain regular sleep patterns"
    ]
  },
  {
    condition: "Gastroenteritis",
    symptoms: ["vomiting", "diarrhea", "nausea", "stomach cramps", "mild fever"],
    confidence: () => Math.floor(Math.random() * 20) + 70, // 70-90% confidence
    recommendations: [
      "Stay hydrated with small, frequent sips of clear fluids",
      "Avoid solid foods until vomiting subsides",
      "Gradually reintroduce bland foods like rice and toast",
      "Get plenty of rest",
      "Seek medical attention if symptoms persist beyond 3 days"
    ]
  },
  {
    condition: "Tension Headache",
    symptoms: ["headache", "pressure around temples", "neck pain", "stress", "anxiety"],
    confidence: () => Math.floor(Math.random() * 15) + 75, // 75-90% confidence
    recommendations: [
      "Practice stress management techniques",
      "Use over-the-counter pain relievers as directed",
      "Apply hot or cold compresses",
      "Take breaks from screens and eye strain",
      "Consider massage or stretching for neck tension"
    ]
  }
];

/**
 * Analyzes user symptoms and returns a mock diagnosis
 * @param {string} symptomsText - Text describing user symptoms
 * @returns {Object} Diagnosis result with condition, confidence, symptoms, and recommendations
 */
const analyzeSymptoms = (symptomsText) => {
  // Convert text to lowercase for matching
  const lowercaseText = symptomsText.toLowerCase();
  
  // Calculate matches for each condition
  const matches = conditionsDatabase.map(condition => {
    const matchedSymptoms = condition.symptoms.filter(symptom => 
      lowercaseText.includes(symptom)
    );
    
    return {
      condition: condition.condition,
      matchCount: matchedSymptoms.length,
      matchedSymptoms: matchedSymptoms,
      totalSymptoms: condition.symptoms.length,
      confidence: condition.confidence(),
      recommendations: condition.recommendations
    };
  });
  
  // Sort by number of matched symptoms (descending)
  matches.sort((a, b) => b.matchCount - a.matchCount);
  
  // If no good matches, return a generic response
  if (matches[0].matchCount === 0) {
    return {
      condition: "Unspecified Condition",
      confidence: 30,
      symptoms: ["No specific symptoms matched"],
      recommendations: [
        "Monitor your symptoms",
        "Rest and stay hydrated",
        "Consult with a healthcare provider for an accurate diagnosis"
      ]
    };
  }
  
  // Return the best match
  const bestMatch = matches[0];
  
  return {
    condition: bestMatch.condition,
    confidence: bestMatch.confidence,
    symptoms: bestMatch.matchedSymptoms.map(symptom => 
      symptom.charAt(0).toUpperCase() + symptom.slice(1)
    ),
    recommendations: bestMatch.recommendations
  };
};

module.exports = {
  analyzeSymptoms
};