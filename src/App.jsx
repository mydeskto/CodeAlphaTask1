// import { Home } from 'lucide-react'
import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from './components/Component/Home.jsx'
import TodoList from './components/Component/TodoList.jsx'
import AgeCalculator from './components/Component/AgeCalculator.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='todolist' element={<TodoList/>}></Route>
        <Route path='agecalculator' element={<AgeCalculator/>}></Route>
      </Routes>
    </div>
  )
}

export default App
