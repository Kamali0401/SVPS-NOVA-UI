import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";
import { API } from "../../services/endpoints";

export const houseActivitySlice = createSlice({
  name: "houseActivityList",
  initialState: {
    loading: false,
    error: false,
    houseActivityList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    houseActivityDetails: [],
    submitHouseActivitySuccess: "",
    saveHouseActivityDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getHouseActivity: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.houseActivityList = payload;
    },
    saveHouseActivity: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveHouseActivityDataSuccess = payload;
    },
    setError: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  getHouseActivity,
  saveHouseActivity,
  setError,
} = houseActivitySlice.actions;
export const houseActivitySelector = (state) => state.houseActivity || [];
export default houseActivitySlice.reducer;

// Fetch House Activity
export const fetchHouseActivity = () => (dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncGet(API.HouseActivity)
    .then((response) => {
      dispatch(getHouseActivity(response.data));  // Ensure the right structure for the response
    })
    .catch((er) => {
      dispatch(setError());
      console.error("Error fetching house activity:", er);
    });
};

// Add House Activity
export const addHouseActivityDetails = (data) => (dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncPost(API.HouseActivity, data)
    .then((response) => {
      dispatch(saveHouseActivity(response.data));  // Save only relevant data
      dispatch(fetchHouseActivity());  // Refresh the house activity list
    })
    .catch((er) => {
      dispatch(setError());
      console.error("Error adding house activity:", er);
    });
};

// Update House Activity
export const UpdateHouseActivityDetails= (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPut(API.HouseActivity, data)
    .then((response) => {
      dispatch(fetchHouseActivity());  // Refresh the list after update
    })
    .catch((er) => {
      dispatch(setError());
      console.error("Error updating house activity:", er);
    });
};

// Delete House Activity
export const deleteHouseActivity = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncDelete(`${API.HouseActivity}/${data}`)
    .then((response) => {
      if (response.data?.message !== 'Success') {
        alert('Sorry! Unable to delete house activity');
      }
      dispatch(fetchHouseActivity());  // Refresh after deletion
    })
    .catch((er) => {
      dispatch(setError());
      console.error("Error deleting house activity:", er);
    });
};
