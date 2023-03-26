import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStudent, deleteStudent } from "../actions/students";
import StudentDataService from "../services/StudentService";
import { TextField, Button } from "@material-ui/core";

const Student = (props) => {
  const initialStudentState = {
    id: null,
    name: "",
    dob: "",
    address: "",
    contact_number: "",
    course: "",
  };
  const [currentStudent, setCurrentStudent] = useState(initialStudentState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getStudent = id => {
    StudentDataService.get(id)
      .then((response) => {
        setCurrentStudent(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };



  useEffect(() => {
    if (props.match && props.match.params) {
      getStudent(props.match.params.id);
    }
  }, [props.match]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
    console.log(setCurrentStudent)
  };

  const updateContent = () => {
    dispatch(updateStudent(currentStudent.id, currentStudent))
      .then((response) => {
        console.log(response);
        setMessage("The student was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeStudent = () => {
    dispatch(deleteStudent(currentStudent.id))
      .then(() => {
        props.history.push("/students");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentStudent ? (
        <div className="edit-form">
          <h1   style={{ marginTop:'20px' }}>Students Details</h1>
          <br />
          <form>
            <div className="form-group">
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={currentStudent.name}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div className="form-group">
              <TextField
                label=""
                variant="outlined"
                type="date"
                name="dob"
                value={currentStudent.dob}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <TextField
                label="Address"
                variant="outlined"
                name="address"
                value={currentStudent.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Contact Number"
                variant="outlined"
                name="contact_number"
                value={currentStudent.contact_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Course"
                variant="outlined"
                name="course"
                value={currentStudent.course}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <Button
            variant="contained"
            color="secondary"
            onClick={removeStudent}
            style={{ marginRight: "10px", marginTop:'20px' }}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={updateContent}
            style={{marginTop:'20px' }}
          >
            Update
          </Button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Student...</p>
        </div>
      )}
    </div>
  );
}

export default Student;