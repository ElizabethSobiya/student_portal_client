import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveStudents,
  // findStudentsByName,
  deleteAllStudents,
} from "../actions/students";
import { Link } from "react-router-dom";
import {
  Table,TableHead,TableBody,TableRow,TableCell,AppBar, Toolbar,TablePagination,Button,Typography,} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from "@material-ui/icons/Add";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Icon from '../assets/icon.png'




const StudentsList = () => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = useSelector(state => state.students);
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
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
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
        main: "#43a047",
      },
    },
  })
  

  return (
    <>
    <ThemeProvider theme={theme}>
     <AppBar position="static" >
        <Toolbar>
          <div className="navbar-nav">
            <Button color="inherit" component={Link} to="/">
            <img
  src={Icon}
  alt="image-description"
  height={50}
  width={50}
  borderRadius={16}
  objectFit="cover"
/>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    <div className="table">
    <Typography variant="h4" style={{marginTop:'20px', marginBottom:'20px',fontFamily: 'Poppins', }}>
      Students Database</Typography>
    <Table >
        <TableHead >
          <TableRow >
            <TableCell style={{ fontSize: "20px",fontFamily: 'Poppins', fontWeight:'bold', border:'1px solid black' }}>Name</TableCell>
            <TableCell style={{ fontSize: "20px", fontFamily: 'Poppins', fontWeight:'bold', border:'1px solid black'  }}>Date of Birth</TableCell>
            <TableCell style={{ fontSize: "20px", fontFamily: 'Poppins', fontWeight:'bold', border:'1px solid black'  }}>Address</TableCell>
            <TableCell style={{ fontSize: "20px", fontFamily: 'Poppins', fontWeight:'bold' , border:'1px solid black' }}>Contact Number</TableCell>
            <TableCell style={{ fontSize: "20px", fontFamily: 'Poppins', fontWeight:'bold' , border:'1px solid black' }}>Course</TableCell>
            <TableCell style={{ fontSize: "20px", fontFamily: 'Poppins', fontWeight:'bold' , border:'1px solid black' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((student) => (
              <TableRow key={student.id} onClick={() => handleClick(student)}
               >
                <TableCell  style={{ fontSize: "16px" ,fontFamily: 'Poppins', border:'1px solid black' }}>{student.name}</TableCell>
                <TableCell style={{ fontSize: "16px" ,fontFamily: 'Poppins', border:'1px solid black' }}>{student.dob}</TableCell>
                <TableCell style={{ fontSize: "16px" ,fontFamily: 'Poppins', border:'1px solid black' }}>{student.address}</TableCell>
                <TableCell style={{ fontSize: "16px" ,fontFamily: 'Poppins', border:'1px solid black' }}>{student.contact_number}</TableCell>
                <TableCell style={{ fontSize: "16px" ,fontFamily: 'Poppins', border:'1px solid black' }}>{student.course}</TableCell>
                <TableCell  style={{ fontSize: "16px" ,fontFamily: 'Poppins', borderBottom:'1px solid black' }}>
                  <Button
                    variant="contained"
                    style={{paddingRight:'2px', minWidth:'40px', marginLeft:'20px'}}
                    color="secondary"
                    startIcon={<EditIcon style={{padding:'0px'}} />}
                    component={Link}
                    to={"/students/" + student.id}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        style={{fontFamily: 'Poppins' }}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
         <Button
          variant="contained"
          color="secondary"
          onClick={removeAllStudents}
          style={{ marginTop: "10px" }}
        >
          Remove All
        </Button>
        <Button
  variant="contained"
  color="primary"
  startIcon={<AddIcon />}
  style={{ marginTop: "10px",fontFamily: 'Poppins', marginLeft:'20px' }}
  component={Link}
  to="/add"
>
  Add
</Button>
    </div>
 
  </>

  );}


export default StudentsList;
