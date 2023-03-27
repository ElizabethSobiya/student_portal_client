import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveStudents,
  // findStudentsByName,
  deleteAllStudents,
} from "../actions/students";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  AppBar,
  Toolbar,
  TablePagination,
  Button,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Icon from "../assets/icon.png";
import background from "../assets/students.png";

const StudentsList = () => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveStudents());
  }, [dispatch]);

  const refreshData = () => {
    setCurrentStudent(null);
    setCurrentIndex(-1);
  };

  const setActiveStudent = (student, index) => {
    setCurrentStudent(student);
    setCurrentIndex(index);
  };

  const removeAllStudents = () => {
    dispatch(deleteAllStudents())
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (student) => {
    setSelectedStudent(student);
  };

  // const findByName = () => {
  //   refreshData();
  //   dispatch(findStudentsByName(searchName));
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
              <div className="navbar-nav">
                <Button color="inherit" component={Link} to="/">
                  <img
                    src={Icon}
                    alt="logo"
                    height={50}
                    width={50}
                    borderRadius={16}
                    objectFit="cover"
                  />
                </Button>
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
        <div className="table">
          <Typography
            variant="h4"
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              fontFamily: "Poppins",
            }}
          >
            Students Database
          </Typography>
          <Table style={{ borderRadius: "10px" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "20px",
                    color: "white",
                    background: "#AA336A",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    color: "white",
                    background: "#AA336A",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Date of Birth
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    color: "white",
                    background: "#AA336A",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Address
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    color: "white",
                    background: "#AA336A",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Contact Number
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    color: "white",
                    background: "#AA336A",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Course
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    color: "white",
                    background: "#AA336A",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student) => (
                  <TableRow
                    key={student.id}
                    onClick={() => handleClick(student)}
                  >
                    <TableCell
                      style={{
                        fontSize: "16px",
                        color: "black",
                        background: "#c0c0c0",
                        fontFamily: "Poppins",
                        borderRight: "0.5px solid white",
                      }}
                    >
                      {student.name}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "16px",
                        color: "black",
                        background: "#c0c0c0",
                        fontFamily: "Poppins",
                        borderRight: "0.5px solid white",
                      }}
                    >
                      {student.dob}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "16px",
                        color: "black",
                        background: "#c0c0c0",
                        fontFamily: "Poppins",
                        borderRight: "0.5px solid white",
                      }}
                    >
                      {student.address}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "16px",
                        color: "black",
                        background: "#c0c0c0",
                        fontFamily: "Poppins",
                        borderRight: "0.5px solid white",
                      }}
                    >
                      {student.contact_number}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "16px",
                        color: "black",
                        background: "#c0c0c0",
                        fontFamily: "Poppins",
                        borderRight: "0.5px solid white",
                      }}
                    >
                      {student.course}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "16px",
                        color: "black",
                        background: "#c0c0c0",
                        fontFamily: "Poppins",
                        borderRight: "0.5px solid white",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          paddingRight: "2px",
                          minWidth: "40px",
                          marginLeft: "20px",
                        }}
                        color="secondary"
                        startIcon={<EditIcon style={{ padding: "0px" }} />}
                        component={Link}
                        to={"/student/" + student.id}
                      ></Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            style={{ fontFamily: "Poppins", color: "white" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
         <div  style={{
              paddingTop: "0px",
              paddingBottom:'10px'
            }}>
         <Button
            variant="contained"
            color="secondary"
            onClick={removeAllStudents}
           
          >
            Remove All
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            style={{
             
              fontFamily: "Poppins",
              marginLeft: "20px",
            }}
            component={Link}
            to="/add"
          >
            Add
          </Button>
         </div>
        </div>
      </div>
    </>
  );
};

export default StudentsList;
