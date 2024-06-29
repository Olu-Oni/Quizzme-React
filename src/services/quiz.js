import axios from "axios";

export const baseURL = `http://localhost:3001`;

// const addQuestion = async(obj)=>{
//     const response = await axios.post(`${baseURL}/Questions`, obj)
//     return response.data
// }

// const addOption = async(obj)=>{
//     const response = await axios.post(`${baseURL}/Options`, obj)
//     return response.data
// }

const addQuiz = async (obj) => {
  const response = await axios.post(`${baseURL}/Quizzes`, obj);
  return response.data;
};
const changeQuiz = async (obj) => {
  const date = new Date();
  const newQuiz = { ...obj, createdAt: date.toLocaleString("GMT") };

  const response = await axios.put(
    `${baseURL}/Quizzes/${obj.id}`,
    newQuiz
  );
  return response.data;
};

const getQuizzesByUser = async (UserId) => {
  const response = await axios.get(`${baseURL}/Quizzes/?userId=${UserId}`);
  return response.data.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    desc: quiz.desc,
    questLength: quiz.questions.length,
    time: quiz.time,
  }));
};

const getQuizById = async (quizId) => {
  const response = await axios.get(`${baseURL}/Quizzes/${quizId}`);
  return response.data;
};

const deleteQuizById = async (quizId) => {
  const response = await axios.delete(`${baseURL}/Quizzes/${quizId}`);
  return response.data;
};

const addPerformance = async (obj) => {
  const response = await axios.post(`${baseURL}/Performance`, obj);
  return response.data;
};

export {addQuiz, changeQuiz, getQuizzesByUser, getQuizById, addPerformance, deleteQuizById };
