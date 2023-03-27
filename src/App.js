import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import Student from "./components/Student";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/students" element={<StudentList />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/student/:id" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
