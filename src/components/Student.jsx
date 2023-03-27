import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStudent, deleteStudent } from "../actions/students";
import StudentDataService from "../services/StudentService";
import { TextField, Button, AppBar, Toolbar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import background from "../assets/students.png";

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
  const params = useParams();
  const navigate = useNavigate();

  const getStudent = (id) => {
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
    console.log(params);
    if (params) {
      getStudent(params.id);
    }
  }, [params]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
    console.log(setCurrentStudent);
  };

  const updateContent = () => {
    dispatch(updateStudent(currentStudent.id, currentStudent))
      .then((response) => {
        console.log(response);
        navigate("/students");
        setMessage("The student was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeStudent = () => {
    dispatch(deleteStudent(currentStudent.id))
      .then(() => {
        navigate("/students");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#AA336A",
      },
    },
  });

  return (
    <>
     
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/students">
                <ArrowBackIosIcon />
              </Button>
              <div className="navbar-nav">
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/">
                Contact
              </Button>
              <Button color="inherit" component={Link} to="/">
                Careers
              </Button>
              <Button color="inherit" component={Link} to="/students">
                Students
              </Button>
            </div>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <div
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.9",
        }}
      >
        <div style={{ fontFamily: "Poppins", color: "white" }}>
          {currentStudent ? (
            <div className="edit-form">
              <h1 style={{ marginTop: "20px" }}>Students Details</h1>
              <br />
              <form>
                <div className="form-group">
                  <TextField
                    label="Name"
                    fullWidth
                    name="name"
                    value={currentStudent.name}
                    onChange={handleInputChange}
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                  />
                </div>
                <br />
                <div className="form-group">
                  <TextField
                    label=""
                    type="date"
                    name="dob"
                    value={currentStudent.dob}
                    onChange={handleInputChange}
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    label="Address"
                    name="address"
                    value={currentStudent.address}
                    onChange={handleInputChange}
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Contact Number"
                    name="contact_number"
                    value={currentStudent.contact_number}
                    onChange={handleInputChange}
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Course"
                    name="course"
                    value={currentStudent.course}
                    onChange={handleInputChange}
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "white",
                        fontWeight: "520",
                      },
                    }}
                  />
                </div>
              </form>

              <Button
                variant="contained"
                color="secondary"
                onClick={removeStudent}
                style={{ marginRight: "10px", marginTop: "20px" }}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={updateContent}
                style={{ marginTop: "20px" }}
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
      </div>
    </>
  );
};

export default Student;
