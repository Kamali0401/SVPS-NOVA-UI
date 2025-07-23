import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const studentSlice = createSlice({
  name: "studentList",
  initialState: {
    loading: false,
    error: false,
    studentList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    studentDetails: [],
    submitStudentSuccess: "",
    saveStudentDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getStudent: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.studentList = payload;
    },
    saveStudent: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveStudentDataSuccess = payload;
    },
    submitStudent: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const { setLoading, getStudent, submitStudent, setError, saveStudent } =
  studentSlice.actions;
export const studentSelector = (state) => state.students || [];
export default studentSlice.reducer;

export const fetchStudents = () => (dispatch) => {
  dispatch(setLoading());
  AsyncGet(API.getStudents)
    .then((response) => {
      console.log("response,", response);
      dispatch(getStudent(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addStudentDetails = async (data, dispatch) => {
  try {
    debugger;
    dispatch(setLoading());
    const response = await AsyncPost(API.getStudents, data);
    dispatch(setLoading());
    dispatch(saveStudent(response.data));
    dispatch(fetchStudents());

    return response.data;
    // dispatch(fetchFaculties());
  } catch (error) {
    console.log("failure of add faculty");
    dispatch(saveStudent(""));
    dispatch(setError(true));
    dispatch(setLoading());
  }
};
export const addStudentDetails1 = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.getStudents, data)
    .then((response) => {
      debugger;
      dispatch(setLoading());
      dispatch(saveStudent(response));
      //dispatch(fetchStudents());
    })
    .catch((er) => {
      debugger;
      console.log("failure of add student");
      dispatch(saveStudent(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateStudentDetails = async (data, dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncPut(API.getStudents, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update student");
      dispatch(fetchStudents());
    })
    .catch((er) => {
      console.log("failure of add student");
      dispatch(saveStudent(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteStudent = (data) => (dispatch) => {
  // dispatch(setLoading());
  AsyncDelete(`${API.getStudents}/${data}`)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of delete student");
      dispatch(fetchStudents());
    })
    .catch((er) => {
      console.log("failure of add student");
      dispatch(saveStudent(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
