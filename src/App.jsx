import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Create from './pages/Create.jsx'
import SubjectList from './pages/Subjectlist.jsx' 

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Create />} />
        <Route path='/subjects' element={<SubjectList />} />
      </Routes>
    </div>
  )
}

export default App