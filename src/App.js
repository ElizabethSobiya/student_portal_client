import React from 'react';
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Student from './components/Student';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    
        <Routes>
          <Route exact path="/"  element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/students/:id" element={<Student />} />
        </Routes>
  
    </BrowserRouter>
  );
}

export default App;





