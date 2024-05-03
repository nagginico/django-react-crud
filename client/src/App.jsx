import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { TasksPage } from './pages/TaskPage'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path = "/tasks" element = {<TasksPage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App