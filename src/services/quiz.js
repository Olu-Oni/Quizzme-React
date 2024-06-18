import axios from "axios";

const baseURL = `http://localhost:3001`

// const addQuestion = async(obj)=>{
//     const response = await axios.post(`${baseURL}/Questions`, obj)
//     return response.data
// }

// const addOption = async(obj)=>{
//     const response = await axios.post(`${baseURL}/Options`, obj)
//     return response.data
// }

const addQuiz = async(obj)=>{
    const response = await axios.post(`${baseURL}/Quiz`, obj)
    return response.data
}

export {addQuestion,addOption, addQuiz}