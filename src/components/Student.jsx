import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStudent, deleteStudent } from "../actions/students";
import StudentDataService from "../services/StudentService";
import { TextField, Button, AppBar, Toolbar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
  const params  = useParams()
  const navigate = useNavigate()

  const getStudent = id => {
    // console.log(id)
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
    console.log(params)
    if (params) {
      getStudent(params.id);
  
    }
  }, [params]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
    console.log(setCurrentStudent)
  };

  const updateContent = () => {
    dispatch(updateStudent(currentStudent.id, currentStudent))
      .then((response) => {
        console.log(response);
        navigate("/");
        setMessage("The student was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeStudent = () => {
    dispatch(deleteStudent(currentStudent.id))
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#43a047",
      },
    },
  })

  return (
    <>
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
        <Button color="inherit" component={Link} to="/add">
        <ArrowBackIosIcon />
            </Button>
        
         
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    <div  style={{ fontFamily: 'Poppins' }}>
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
  </>
  );
}

export default Student;