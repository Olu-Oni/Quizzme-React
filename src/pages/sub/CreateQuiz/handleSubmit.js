import { addQuiz } from "../../../services/quiz";

const handleSubmit = (e,questionCount) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const myQuiz = {
    title: formData.get("title"),
    desc: formData.get("desc"),
    time: formData.get("time"),
    createdAt: date.toLocaleString("GMT"),
    questions: [...questionCount],
  };
  return addQuiz(myQuiz);

  // Further processing can be added here
};

export default handleSubmit;
