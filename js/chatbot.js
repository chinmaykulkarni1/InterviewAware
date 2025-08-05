// Chatbot utility functions for fetching interview questions and related artifacts

/**
 * Fetch a question from the backend by ID.
 * @param {string|number} questionId - ID of the question to retrieve.
 * @returns {Promise<Object>} Resolved question data.
 * @throws {Error} When the network request fails or returns a non-OK status.
 */
async function fetchQuestion(questionId) {
  try {
    const response = await fetch(`/api/questions/${questionId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch question: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('fetchQuestion network request failed', err);
    throw new Error('Unable to retrieve question data');
  }
}

/**
 * Wait for an artifact associated with a question.
 * @param {string} artifactId - Identifier for the artifact.
 * @returns {Promise<Object>} Resolved artifact data.
 * @throws {Error} When the network request fails or returns a non-OK status.
 */
async function waitForArtifact(artifactId) {
  try {
    const response = await fetch(`/api/artifacts/${artifactId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch artifact: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('waitForArtifact network request failed', err);
    throw new Error('Unable to retrieve artifact data');
  }
}

// Expose functions to global scope for script tag usage
window.fetchQuestion = fetchQuestion;
window.waitForArtifact = waitForArtifact;
