import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const timetableSlice = createSlice({
  name: "timetableList",
  initialState: {
    loading: false,
    error: false,
    timetableList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    timetableDetails: [],
    submitSubmitSuccess: "",
    saveSubmitDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getTimetable: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.timetableList = payload;
    },
    saveTimetable: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveSubmitDataSuccess = payload;
    },
    submitTimetable: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getTimetable,
  submitTimetable,
  setError,
  saveTimetable,
} = timetableSlice.actions;
export const TimetableSelector = (state) => state.timetable || [];
export default timetableSlice.reducer;

export const fetchTimetables = () => (dispatch) => {
 debugger;
  dispatch(setLoading());
  AsyncGet(API.Timetable)
    .then((response) => {
      console.log("response,", response);
      dispatch(getTimetable(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addTimetableDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.Timetable, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveTimetable(response));
      dispatch(fetchTimetables());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveTimetable(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateTimetableDetails = (data) => (dispatch) => {
    debugger;
  dispatch(setLoading());
  AsyncPut(API.Timetable, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update timetable");
      dispatch(fetchTimetables());
    })
    .catch((er) => {
      console.log("failure of add timetable");
      dispatch(saveTimetable(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteTimetableDetails = (data) => (dispatch) => {
 // dispatch(setLoading());
  debugger;
  AsyncDelete(`${API.Timetable}/${data}`)
    .then((response) => {
   /*
     if (response.data!='Success')
      
      console.log(response, "success of delete timetable");*/
      dispatch(fetchTimetables());
    })
    .catch((er) => {
      console.log("failure of add timetable");
      dispatch(saveTimetable(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
