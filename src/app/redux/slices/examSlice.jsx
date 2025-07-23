import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const examSlice = createSlice({
  name: "examList",
  initialState: {
    loading: false,
    error: false,
    examList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    examDetails: [],
    submitExamSuccess: "",
    saveExamDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getExam: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.examList = payload;
    },
    saveExam: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveExamDataSuccess = payload;
    },
    submitExam: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getExam,
  submitExam,
  setError,
  saveExam,
} = examSlice.actions;
export const examSelector = (state) => state.exam || [];
export default examSlice.reducer;

export const fetchExams = () => (dispatch) => {
 
  dispatch(setLoading());
  AsyncGet(API.Exam)
    .then((response) => {
      console.log("response,", response);
      dispatch(getExam(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addExamDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.Exam, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveExam(response));
      dispatch(fetchExams());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveExam(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateExamDetails = (data) => (dispatch) => {
    debugger;
  dispatch(setLoading());
  AsyncPut(API.Exam, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update faculty");
      dispatch(fetchExams());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveExam(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteExam = (data) => (dispatch) => {
  // dispatch(setLoading());
  debugger;
  AsyncDelete(`${API.Exam}/${data}`, "")
    .then((response) => {
      if (response.data?.message!='Success')
      {      
        alert('Sorry! Unable to delete Exam. Exam is mapped with Marks');
      }
      // dispatch(setLoading());
      console.log(response, "success of delete faculty");
      dispatch(fetchExams());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveExam(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
