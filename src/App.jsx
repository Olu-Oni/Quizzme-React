import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/main/Home'
import Login from './pages/Login'
import NoPath from './pages/NoPath'
import Quizz_me from './pages/main/Quizz_me'
import Performance from './pages/main/Perfomance'
import MyQuizzes from './pages/main/MyQuizzes'
import Welcome from './pages/Welcome'
import TakeQuiz from './pages/main/sub/TakeQuiz'


const App = () => {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <div className='font-urbanist max-sm:text-lg  min-h-dvh'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome/>} />
          <Route path='/Welcome' element={<Welcome/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/home' element={<Home dropDown={{isOpen,setIsOpen}}/>} />
          <Route path='/MyQuizzes' element={<MyQuizzes dropDown={{isOpen,setIsOpen}}/>} />
          <Route path='/Performance' element={<Performance dropDown={{isOpen,setIsOpen}}/>} />
          <Route path='/Quizz_me' element={<Quizz_me dropDown={{isOpen,setIsOpen}}/>} />
          <Route path='/TakeQuiz' element={<TakeQuiz/>} />
          <Route path='/Performance' element={<Performance/>} />
          <Route path='*' element={<NoPath/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
