import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveStudents,
  // findStudentsByName,
  deleteAllStudents,
} from "../actions/students";
import { Link } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

const StudentsList = () => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchName, setSearchName] = useState("");

  const students = useSelector(state => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveStudents());
  }, [dispatch]);

  // const onChangeSearchName = e => {
  //   const searchName = e.target.value;
  //   setSearchName(searchName);
  // };

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

  // const findByName = () => {
  //   refreshData();
  //   dispatch(findStudentsByName(searchName));
  // };

  return (
    <div className="list-row">
      <div className="col-md-6">
        <Typography variant="h4" style={{marginTop:'20px' }}>Students List</Typography>
        <List>
          {students &&
            students.map((student, index) => (
              <ListItem
                key={index}
                button
                selected={index === currentIndex}
                onClick={() => setActiveStudent(student, index)}
              >
                <ListItemText primary={student.name} />
              </ListItem>
            ))}
        </List>
        <Button
          variant="contained"
          color="secondary"
          onClick={removeAllStudents}
          style={{ marginTop: "10px" }}
        >
          Remove All
        </Button>
      </div>
      <div className="col-md-6">
        {currentStudent ? (
          <div>
            <Typography   style={{marginTop:'10px' }} variant="h2">Student</Typography>
            <div>
            <Typography  style={{marginTop:'10px' }}>
                <strong>Name:</strong> {currentStudent.name}
              </Typography>
            </div>
            <div>
            <Typography  style={{marginTop:'10px' }}>
                <strong>Date of Birth:</strong> {currentStudent.dob}
              </Typography>
            </div>
            <div>
            <Typography  style={{marginTop:'10px' }}>
                <strong>Address:</strong> {currentStudent.address}
              </Typography>
            </div>
            <div>
              <Typography  style={{marginTop:'10px' }}>
                <strong>Contact_number:</strong>{" "}
                {currentStudent.contact_number}
              </Typography>
            </div>
            <div>
            <Typography  style={{marginTop:'10px' }}>
                <strong>Course:</strong> {currentStudent.course}
              </Typography>
            </div>
            <Button
      variant="contained"
      color="secondary"
      startIcon={<EditIcon />}
      component={Link}
      to={"/students/" + currentStudent.id}
      style={{marginTop:'10px' }}
    >
      Edit
    </Button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;

ListItem.propTypes = {
  selected: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // other prop types
};