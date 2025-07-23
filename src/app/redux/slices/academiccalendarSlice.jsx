import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const academicCalendarSlice = createSlice({
  name: "academicCalendarList",
  initialState: {
    loading: false,
    error: false,
    academicCalendarList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    academicCalendarDetails: [],
    submitAcademicCalendarSuccess: "",
    saveAcademicCalendarDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getAcademicCalendar: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.academicCalendarList = payload;
    },
    saveAcademicCalendar: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveAcademicCalendarDataSuccess = payload;
    },
    submitAcademicCalendar: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getAcademicCalendar,
  submitAcademicCalendar,
  setError,
  saveAcademicCalendar,
} = academicCalendarSlice.actions;
export const academicCalendarSelector = (state) => state.academicCalendar || [];
export default academicCalendarSlice.reducer;

export const fetchAcademicCalendars = () => (dispatch) => {
  dispatch(setLoading());
  AsyncGet(API.AcademicCalendar)
    .then((response) => {
      console.log("response,", response);
      dispatch(getAcademicCalendar(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addAcademicCalendarDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.AcademicCalendar, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveAcademicCalendar(response));
      dispatch(fetchAcademicCalendars());
    })
    .catch((er) => {
      console.log("failure of add academicCalendar");
      dispatch(saveAcademicCalendar(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateAcademicCalendarDetails = (data) => (dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncPut(API.AcademicCalendar, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update academicCalendar");
      dispatch(fetchAcademicCalendars());
    })
    .catch((er) => {
      console.log("failure of add academicCalendar");
      dispatch(saveAcademicCalendar(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteAcademicCalendar = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncDelete(`${API.AcademicCalendar}/${data}`, "")
    .then((response) => {
      // dispatch(setLoading());
      // if (response.data != 'Success') {
      //   alert('Sorry! Unable to delete this academicCalendar. academicCalendar is mapped with Batches')
      // }
      // console.log(response, "success of delete academicCalendar");
      dispatch(fetchAcademicCalendars());
    })
    .catch((er) => {
      console.log("failure of add academicCalendar");
      dispatch(saveAcademicCalendar(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
