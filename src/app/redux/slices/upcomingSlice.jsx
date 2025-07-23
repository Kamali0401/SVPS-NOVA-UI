import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const upcomingSlice = createSlice({
  name: "upcomingList",
  initialState: {
    loading: false,
    error: false,
    upcomingList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    upcomingDetails: [],
    submitUpcomingSuccess: "",
    saveUpcomingDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getUpcoming: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.upcomingList = payload;
    },
    saveUpcoming: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveUpcomingDataSuccess = payload;
    },
    submitUpcoming: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getUpcoming,
  submitUpcoming,
  setError,
  saveUpcoming,
} = upcomingSlice.actions;
export const upcomingSelector = (state) => state.upcoming || [];
export default upcomingSlice.reducer;

export const fetchUpcomings = () => (dispatch) => {
  dispatch(setLoading());
  const role =localStorage.getItem("userRole");

  AsyncGet(`${API.upcomingCompetitionRole}/${role}`)
    .then((response) => {
      console.log("response,", response);
      dispatch(getUpcoming(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addUpcomingDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.upcomingCompetition, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveUpcoming(response));
      dispatch(fetchUpcomings());
    })
    .catch((er) => {
      console.log("failure of add upcoming");
      dispatch(saveUpcoming(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateUpcomingDetails = (data) => (dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncPut(API.upcomingCompetition, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update upcoming");
      dispatch(fetchUpcomings());
    })
    .catch((er) => {
      console.log("failure of add upcoming");
      dispatch(saveUpcoming(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteUpcoming = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncDelete(`${API.upcomingCompetition}/${data}`, "")
    .then((response) => {
      // dispatch(setLoading());
      /*if (response.data != 'Success') {
        alert('Sorry! Unable to delete this upcoming. Upcoming is mapped with Batches')
      }*/
      console.log(response, "success of delete upcoming");
      dispatch(fetchUpcomings());
    })
    .catch((er) => {
      console.log("failure of add upcoming");
      dispatch(saveUpcoming(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
