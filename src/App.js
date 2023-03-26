import React from 'react';
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@material-ui/core';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Student from './components/Student';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
        <Button color="inherit" component={Link} to="/">
              Students Portal
            </Button>
          <div className="navbar-nav">
            <Button color="inherit" component={Link} to="/students">
              Students
            </Button>
            <Button color="inherit" component={Link} to="/add">
              Add
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Routes>
          <Route exact path="/"  element={<StudentList />} />
          <Route exact path="/students"  element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/students/:id" element={<Student />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;





