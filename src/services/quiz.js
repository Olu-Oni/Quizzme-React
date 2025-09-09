import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";



const defaultUser = "User1";
const defaultAuthor = "User1";
const defaultAuthorID = "User1";
const quizzesCollectionRef = collection(db, "Quizzes");
const performanceCollectionRef = collection(db, "Performance");

// ============================================================================
// QUIZ FUNCTIONS
// ============================================================================

/**
 * Creates a new quiz in the Quizzes collection
 * @param {Object} quizData - Data for the new quiz
 * @param {string} quizData.title - Title of the quiz
 * @param {string} quizData.desc - Description of the quiz
 * @param {string} quizData.userId - ID of the user creating the quiz
 * @param {Array} quizData.questions - Array of quiz questions
 * @param {number} quizData.time - Time limit for the quiz
 * @returns {Promise<Object>} - The created quiz with its ID
 */
const addQuiz = async (quizData) => {

  try {
    // Add timestamps to quiz data
    const quizWithTimestamp = {
      ...quizData,
      userId: quizData.userId ? quizData.userId : defaultUser,
      createdAt: new Date().toISOString(), // Save the date in ISO 8601 format
      updatedAt: new Date().toISOString(), // Save the date in ISO 8601 format
    };

    // Add the document to Firestore
    const quizDocRef = await addDoc(quizzesCollectionRef, quizWithTimestamp);

    // Return the created quiz with its ID
    return { id: quizDocRef.id, ...quizWithTimestamp };
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

/**
 * Updates an existing quiz
 * @param {Object} quizData - Quiz data including the ID
 * @param {string} quizData.id - ID of the quiz to update
 * @returns {Promise<Object>} - The updated quiz data
 */
const changeQuiz = async (quizData) => {
  try {
    const { id, ...updateData } = quizData;
    const quizDocRef = doc(quizzesCollectionRef, id);

    // Add updated timestamp (matching your original format)
    const date = new Date();
    const dataWithTimestamp = {
      ...updateData,
      createdAt: date.toISOString(), // Keeping your original logic
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(quizDocRef, dataWithTimestamp);

    // Return the updated data with ID
    return { id, ...dataWithTimestamp };
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

/**
 * Retrieves quizzes by user ID with summary information
 * @param {string} userId - ID of the user whose quizzes to retrieve
 * @returns {Promise<Array>} - Array of quiz summaries
 */
const getQuizzesByUser = async (userId = defaultUser) => {
  try {
    const q = query(
      quizzesCollectionRef,
      where("userId", "==", userId),
      orderBy("updatedAt", "desc") // Sort by most recently updated
    );

    const quizDocs = await getDocs(q);

    return quizDocs.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        desc: data.desc,
        questLength: data.questions ? data.questions.length : 0,
        time: data.time,
      };
    });
  } catch (error) {
    console.error("Error fetching quizzes by user:", error);
    throw error;
  }
};

/**
 * Retrieves a specific quiz by its ID
 * @param {string} quizId - ID of the quiz to retrieve
 * @returns {Promise<Object|null>} - The quiz data or null if not found
 */
const getQuizById = async (quizId) => {
  try {
    const quizDocRef = doc(quizzesCollectionRef, quizId);
    const quizDoc = await getDoc(quizDocRef);

    if (quizDoc.exists()) {
      return { id: quizDoc.id, ...quizDoc.data() };
    } else {
      console.log("No such quiz found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

/**
 * Deletes a quiz by its ID
 * @param {string} quizId - ID of the quiz to delete
 * @returns {Promise<Object>} - Success confirmation object
 */
const deleteQuizById = async (quizId) => {
  try {
    const quizDocRef = doc(quizzesCollectionRef, quizId);
    await deleteDoc(quizDocRef);

    console.log("Quiz deleted successfully");
    return { success: true, id: quizId };
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

// ============================================================================
// PERFORMANCE FUNCTIONS
// ============================================================================

/**
 * Creates a new performance record in the Performance collection
 * @param {Object} performanceData - Data for the performance record
 * @param {string} performanceData.userId - ID of the user
 * @param {string} performanceData.quizId - ID of the quiz
 * @param {number} performanceData.score - User's score
 * @param {number} performanceData.totalQuestions - Total number of questions
 * @param {number} performanceData.timeTaken - Time taken to complete quiz
 * @returns {Promise<Object>} - The created performance record with its ID
 */
const addPerformance = async (performanceData) => {
  try {
    // Add timestamps to performance data
    const performanceWithTimestamp = {
      ...performanceData,
      createdAt: new Date().toISOString(), // Save the date in ISO 8601 format
      updatedAt: new Date().toISOString(), // Save the date in ISO 8601 format
    };

    // Add the document to Firestore
    const performanceDocRef = await addDoc(
      performanceCollectionRef,
      performanceWithTimestamp
    );

    // Return the created performance record with its ID
    return { id: performanceDocRef.id, ...performanceWithTimestamp };
  } catch (error) {
    console.error("Error creating performance record:", error);
    throw error;
  }
};

// ============================================================================
// SEARCH AND UTILITY FUNCTIONS
// ============================================================================

/**
 * Simple search by title and description only
 * @param {string} searchTerm - Term to search for
 * @param {number} maxResults - Maximum number of results to return
 * @returns {Promise<Array>} - Array of matching quizzes
 */
const searchQuizzes = async (searchTerm, maxResults = 10) => {
  if (!searchTerm?.trim()) return [];

  try {
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    // Define queries for title and userId
    const titleQuery = query(
      quizzesCollectionRef,
      where("title", ">=", searchTerm),
      where("title", "<=", searchTerm + "\uf8ff"),
      limit(maxResults)
    );

    const userQuery = query(
      quizzesCollectionRef,
      where("userId", ">=", searchTerm),
      where("userId", "<=", searchTerm + "\uf8ff"),
      limit(maxResults)
    );

    // Execute queries concurrently
    const [titleResults, userResults] = await Promise.all([
      getDocs(titleQuery),
      getDocs(userQuery)
    ]);

    // Combine results into a Map to remove duplicates
    const quizzesMap = new Map();

    // Process title results
    titleResults.forEach(doc => 
      quizzesMap.set(doc.id, { id: doc.id, ...doc.data(), matchType: "title" })
    );

    // Process user results, only adding new entries
    userResults.forEach(doc => 
      !quizzesMap.has(doc.id) && 
      quizzesMap.set(doc.id, { id: doc.id, ...doc.data(), matchType: "userId" })
    );

    // Return sliced array of results
    return Array.from(quizzesMap.values()).slice(0, maxResults);
  } catch (error) {
    console.error("Error searching quizzes:", error);
    return [];
  }
};

/**
 * Get quizzes with limit (for pagination)
 * @param {number} limitCount - Maximum number of quizzes to return
 * @returns {Promise<Array>} - Array of quizzes
 */
const getAllQuizzes = async (limitCount = 20) => {
  try {
    const q = query(quizzesCollectionRef, limit(limitCount));
    const querySnapshot = await getDocs(q);

    const quizzes = [];
    querySnapshot.forEach((doc) => {
      quizzes.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return quizzes;
  } catch (error) {
    console.error("Error getting limited quizzes:", error);
    return [];
  }
};

// Export functions
export {
  addQuiz,
  changeQuiz,
  getQuizzesByUser,
  getQuizById,
  deleteQuizById,
  addPerformance,
  searchQuizzes,
  getAllQuizzes,
};