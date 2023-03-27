import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent } from "../actions/students";
import { TextField, Button, AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import background from "../assets/students.png";

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
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const saveStudent = () => {
    const { name, dob, address, contact_number, course } = student;

    dispatch(createStudent(name, dob, address, contact_number, course))
      .then((data) => {
        setStudent({
          id: data.id,
          name: data.name,
          dob: data.dob,
          address: data.address,
          contact_number: data.contact_number,
          course: data.course,
        });

        setSubmitted(true);
        navigate("/students");

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newStudent = () => {
    setStudent(initialStudentState);
    setSubmitted(false);
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
                {/* <Button color="inherit" component={Link} to="/add">
                  Add
                </Button> */}
              </div>
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
        <div
          className="submit-form"
          style={{ fontFamily: "Poppins", color: "white" }}
        >
          {submitted ? (
            <div>
              <h3 style={{ marginTop: "20px" }}>You submitted successfully!</h3>
              <Button variant="contained" color="primary" onClick={newStudent}>
                ADD
              </Button>
              );
            </div>
          ) : (
            <form
              style={{
                fontFamily: "Poppins",
                color: "white",
                marginTop: "50px",
              }}
            >
              <TextField
                name="name"
                label="Name"
                value={student.name}
                onChange={handleInputChange}
                style={{ color: "white", fontWeight: "800" }}
                margin="normal"
                required
                fullWidth
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
              <TextField
                name="dob"
                label=""
                type="date"
                value={student.dob}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
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
              <TextField
                name="address"
                label="Address"
                value={student.address}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
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
              <TextField
                name="contact_number"
                label="Contact Number"
                value={student.contact_number}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
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
              <TextField
                name="course"
                label="Course"
                value={student.course}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
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

              <Button
                onClick={saveStudent}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentForm;
