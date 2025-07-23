import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const subjectSlice = createSlice({
  name: "subjectList",
  initialState: {
    loading: false,
    error: false,
    subjectList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    subjectDetails: [],
    submitSubjectSuccess: "",
    saveSubjectDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getSubject: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.subjectList = payload;
    },
    saveSubject: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveSubjectDataSuccess = payload;
    },
    submitSubject: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getSubject,
  submitSubject,
  setError,
  saveSubject,
} = subjectSlice.actions;
export const subjectSelector = (state) => state.subject || [];
export default subjectSlice.reducer;

export const fetchSubjects = () => (dispatch) => {
  dispatch(setLoading());
  AsyncGet(API.Subject)
    .then((response) => {
      console.log("response,", response);
      dispatch(getSubject(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addSubjectDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.Subject, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveSubject(response));
      dispatch(fetchSubjects());
    })
    .catch((er) => {
      console.log("failure of add subject");
      dispatch(saveSubject(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateSubjectDetails = (data) => (dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncPut(API.Subject, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update subject");
      dispatch(fetchSubjects());
    })
    .catch((er) => {
      console.log("failure of add subject");
      dispatch(saveSubject(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteSubject = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncDelete(`${API.Subject}/${data}`, "")
   
    .then((response) => {
      // dispatch(setLoading());
      if (response.data?.message != 'Success') {
        alert('Sorry! Unable to delete this subject. Subject is mapped with Batches')
      }
      console.log(response, "success of delete subject");
      dispatch(fetchSubjects());
    })
    .catch((er) => {
      console.log("failure of add subject");
      dispatch(saveSubject(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
