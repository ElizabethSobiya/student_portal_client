import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent } from "../actions/students";
import { TextField, Button } from "@material-ui/core";
// import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const initialStudentState = {
    id: null,
    name: "",
    dob: "",
    address: "",
    contact_number: "",
    course: "",
  };
  const [student, setStudent] = useState(initialStudentState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
   
  const handleInputChange = event => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const saveStudent = () => {
    const { name, dob, address, contact_number, course } = student;

    dispatch(createStudent(name, dob, address, contact_number, course))
      .then(data => {
        setStudent({
          id: data.id,
          name: data.name,
          dob: data.dob,
          address:data.address,
          contact_number:data.contact_number,
          course:data.course
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newStudent = () => {
    setStudent(initialStudentState);
    setSubmitted(false);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   navigate.push('/');
  // };

  return (
   
    <>
    <div className="submit-form">
      {submitted ? (
        <div>
          <h3   style={{marginTop:'20px' }} >You submitted successfully!</h3>
          
          <Button variant="contained" color="primary" onClick={newStudent}>
             ADD
    </Button>
  );
        </div>
      ) : (
    <form >
      <TextField
        name="name"
        label="Name"
        value={student.name}
         onChange={handleInputChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        name="dob"
        label=""
        type="date"
        value={student.dob}
         onChange={handleInputChange}
        margin="normal"
        required
        fullWidth
        
      />
      <TextField
        name="address"
        label="Address"
        value={student.address}
         onChange={handleInputChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        name="contact"
        label="Contact Number"
        value={student.contact_number}
         onChange={handleInputChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        name="course"
        label="Course"
        value={student.course}
         onChange={handleInputChange}
        margin="normal"
        required
        fullWidth
      />
      {/* {error && (
        <Typography variant="subtitle2" color="error">
          {error}
        </Typography>
      )} */}
      {/* <Button type="submit" variant="contained" color="primary">
        {values.id ? "Update" : "Add"}
      </Button>
      <Button onClick={handleClose} variant="contained" color="secondary">
        Cancel
      </Button> */}
      
      <Button onClick={saveStudent}  type="submit" variant="contained" color="primary">
            Submit
          </Button>
    </form>
     )}
     </div>
    </>
  );
};

export default StudentForm;






