import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const holidayCalendarSlice = createSlice({
  name: "holidayCalendarList",
  initialState: {
    loading: false,
    error: false,
    holidayCalendarList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    holidayCalendarDetails: [],
    submitHolidayCalendarSuccess: "",
    saveHolidayCalendarDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getHolidayCalendar: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.holidayCalendarList = payload;
    },
    saveHolidayCalendar: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveHolidayCalendarDataSuccess = payload;
    },
    submitHolidayCalendar: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getHolidayCalendar,
  submitHolidayCalendar,
  setError,
  saveHolidayCalendar,
} = holidayCalendarSlice.actions;
export const holidayCalendarSelector = (state) => state.holidayCalendar || [];
export default holidayCalendarSlice.reducer;

export const fetchHolidayCalendars = () => (dispatch) => {
  dispatch(setLoading());
  AsyncGet(API.HolidayCalendar)
    .then((response) => {
      console.log("response,", response);
      dispatch(getHolidayCalendar(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addHolidayCalendarDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.HolidayCalendar, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveHolidayCalendar(response));
      dispatch(fetchHolidayCalendars());
    })
    .catch((er) => {
      console.log("failure of add holidayCalendar");
      dispatch(saveHolidayCalendar(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateHolidayCalendarDetails = (data) => (dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncPut(API.HolidayCalendar, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update holidayCalendar");
      dispatch(fetchHolidayCalendars());
    })
    .catch((er) => {
      console.log("failure of add holidayCalendar");
      dispatch(saveHolidayCalendar(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteHolidayCalendar = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncDelete(`${API.HolidayCalendar}/${data}`, "")
    .then((response) => {
      // dispatch(setLoading());
      // if (response.data != 'Success') {
      //   alert('Sorry! Unable to delete this holidayCalendar. holidayCalendar is mapped with Batches')
      // }
      // console.log(response, "success of delete holidayCalendar");
      dispatch(fetchHolidayCalendars());
    })
    .catch((er) => {
      console.log("failure of add holidayCalendar");
      dispatch(saveHolidayCalendar(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
