/**
 * HealthNex Diagnostic Prompts for Gemini API
 * 
 * This file contains structured prompts for the Gemini API to perform
 * preliminary health assessments based on user-reported symptoms.
 * 
 * IMPORTANT: These prompts are for educational and informational purposes only.
 * The AI responses should never replace professional medical advice, diagnosis, or treatment.
 */

const SYSTEM_CONTEXT = `
You are HealthNex's medical analysis assistant, trained to provide preliminary assessments
based on reported symptoms. Always maintain a professional, empathetic tone.

Important guidelines:
1. Never claim to diagnose conditions definitively - only suggest possibilities
2. Always recommend consulting a healthcare professional for proper diagnosis and treatment
3. Prioritize potential emergency conditions that require immediate medical attention
4. Consider age, gender, medical history, and symptom duration in your analysis
5. Provide evidence-based information with appropriate medical context
6. Acknowledge limitations in your knowledge when appropriate
`;

const DIAGNOSTIC_PROMPTS = {
  // Initial symptom assessment prompt
  initialAssessment: (symptoms, patientInfo) => `
${SYSTEM_CONTEXT}

PATIENT INFORMATION:
${formatPatientInfo(patientInfo)}

REPORTED SYMPTOMS:
${formatSymptoms(symptoms)}

Please provide:
1. A preliminary assessment of possible conditions associated with these symptoms
2. The likelihood of each condition (High/Medium/Low)
3. Whether any symptoms suggest a medical emergency requiring immediate attention
4. Additional information that would be helpful for a more accurate assessment
5. General wellness recommendations that might help alleviate symptoms
`,

  // Follow-up prompt for additional symptom details
  followUpQuestions: (symptoms, patientInfo, previousResponse) => `
${SYSTEM_CONTEXT}

PATIENT INFORMATION:
${formatPatientInfo(patientInfo)}

REPORTED SYMPTOMS:
${formatSymptoms(symptoms)}

PREVIOUS ASSESSMENT:
${previousResponse}

Based on the symptoms and previous assessment, what are the 3-5 most important follow-up
questions to better understand the patient's condition? For each question, explain why
the information would be diagnostically valuable.
`,

  // Detailed condition analysis
  conditionAnalysis: (symptoms, patientInfo, condition) => `
${SYSTEM_CONTEXT}

PATIENT INFORMATION:
${formatPatientInfo(patientInfo)}

REPORTED SYMPTOMS:
${formatSymptoms(symptoms)}

CONDITION TO ANALYZE: ${condition}

Provide a detailed analysis of how the reported symptoms align or don't align with ${condition}.
Include:
1. Typical symptoms of ${condition} that are present
2. Typical symptoms of ${condition} that are absent
3. Symptoms present that are not typically associated with ${condition}
4. Key differentiating factors from similar conditions
5. Appropriate next steps if ${condition} is suspected
`,

  // Emergency assessment prompt
  emergencyAssessment: (symptoms, patientInfo) => `
${SYSTEM_CONTEXT}

PATIENT INFORMATION:
${formatPatientInfo(patientInfo)}

REPORTED SYMPTOMS:
${formatSymptoms(symptoms)}

Emergency Assessment:
Review these symptoms for any signs requiring immediate emergency care.
If emergency indicators are present, clearly identify them and recommend immediate medical attention.
Be explicit about why these symptoms may represent an emergency situation.
`,

  // Treatment options overview
  treatmentOptions: (condition) => `
${SYSTEM_CONTEXT}

CONDITION: ${condition}

Provide an informational overview of general treatment approaches for ${condition}.
Include:
1. Common first-line treatments
2. Lifestyle modifications that may help
3. When to seek further medical care
4. Important monitoring considerations

NOTE: Emphasize that this information is educational only and not a substitute for
professional medical advice tailored to an individual's specific situation.
`
};

// Helper function to format patient information
function formatPatientInfo(patientInfo) {
  if (!patientInfo) return "No patient information provided";
  
  return `
Age: ${patientInfo.age || 'Not provided'}
Gender: ${patientInfo.gender || 'Not provided'}
Height: ${patientInfo.height || 'Not provided'}
Weight: ${patientInfo.weight || 'Not provided'}
Known Medical Conditions: ${patientInfo.medicalConditions?.join(', ') || 'None reported'}
Medications: ${patientInfo.medications?.join(', ') || 'None reported'}
Allergies: ${patientInfo.allergies?.join(', ') || 'None reported'}
Family History: ${patientInfo.familyHistory || 'Not provided'}
`;
}

// Helper function to format symptoms
function formatSymptoms(symptoms) {
  if (!symptoms || symptoms.length === 0) return "No symptoms reported";
  
  return symptoms.map(symptom => 
    `- ${symptom.description} (Severity: ${symptom.severity}/10, Duration: ${symptom.duration || 'Not specified'})`
  ).join('\n');
}

// Specialized prompts for specific medical domains
const SPECIALIZED_PROMPTS = {
  cardiology: (symptoms, patientInfo) => `
${SYSTEM_CONTEXT}

PATIENT INFORMATION:
${formatPatientInfo(patientInfo)}

CARDIOVASCULAR SYMPTOMS:
${formatSymptoms(symptoms.filter(s => s.category === 'cardiovascular'))}

OTHER SYMPTOMS:
${formatSymptoms(symptoms.filter(s => s.category !== 'cardiovascular'))}

Provide a cardiovascular-focused assessment of these symptoms, noting:
1. Potential cardiac conditions that align with these symptoms
2. Cardiovascular risk factors present in the patient history
3. Key cardiac symptoms that warrant immediate medical attention
4. Recommendations for appropriate cardiac evaluations
`,

  pediatric: (symptoms, patientInfo) => `
${SYSTEM_CONTEXT}

PEDIATRIC PATIENT INFORMATION:
${formatPatientInfo(patientInfo)}

REPORTED SYMPTOMS:
${formatSymptoms(symptoms)}

Provide a pediatric-focused assessment, considering:
1. Age-appropriate analysis of these symptoms
2. Childhood conditions commonly associated with these symptoms
3. Developmental factors that may impact symptom presentation
4. Age-specific warning signs requiring urgent evaluation
5. Guidance for caregivers on appropriate next steps
`,

  mentalHealth: (symptoms, patientInfo) => `
${SYSTEM_CONTEXT}

PATIENT INFORMATION:
${formatPatientInfo(patientInfo)}

REPORTED MENTAL/EMOTIONAL SYMPTOMS:
${formatSymptoms(symptoms.filter(s => s.category === 'mental' || s.category === 'emotional'))}

OTHER SYMPTOMS:
${formatSymptoms(symptoms.filter(s => s.category !== 'mental' && s.category !== 'emotional'))}

Provide a mental health-focused assessment, considering:
1. Potential mental health conditions that align with these symptoms
2. How physical symptoms might relate to mental health concerns
3. Appropriate mental health resources and support options
4. Self-care strategies that might be beneficial
`
};

module.exports = {
  SYSTEM_CONTEXT,
  DIAGNOSTIC_PROMPTS,
  SPECIALIZED_PROMPTS
};