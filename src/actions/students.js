import {
    CREATE_STUDENT,
    RETRIEVE_STUDENTS,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    DELETE_ALL_STUDENTS,
  } from "./types";
  
  import StudentDataService from "../services/StudentService";
  
  export const createStudent = (name,dob,address,contact_number,course) => async (dispatch) => {
    try {
      const res = await StudentDataService.create({ name,dob,address,contact_number,course });
  
      dispatch({
        type: CREATE_STUDENT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveStudents = () => async (dispatch) => {
    try {
      const res = await StudentDataService.getAll();
  
      dispatch({
        type: RETRIEVE_STUDENTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateStudent = (id, data) => async (dispatch) => {
    try {
      const res = await StudentDataService.update(id, data);
  
      dispatch({
        type: UPDATE_STUDENT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteStudent = (id) => async (dispatch) => {
    try {
      await StudentDataService.remove(id);
  
      dispatch({
        type: DELETE_STUDENT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllStudents = () => async (dispatch) => {
    try {
      const res = await StudentDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_STUDENTS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findStudentsByName = (name) => async (dispatch) => {
    try {
      const res = await StudentDataService.findByName(name);
  
      dispatch({
        type: RETRIEVE_STUDENTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };