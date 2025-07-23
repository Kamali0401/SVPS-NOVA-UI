import { createSlice } from "@reduxjs/toolkit";
import { AsyncGet, AsyncPost,AsyncDelete,AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const houseSlice = createSlice({
  name: "houseList",
  initialState: {
    loading: false,
    error: false,
    houseList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    houseDetails: [],
    submitSubmitSuccess: "",
    saveSubmitDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getHouse: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.houseList = payload;
    },
    saveHouse: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveSubmitDataSuccess = payload;
    },
    submitHouse: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getHouse,
  submitHouse,
  setError,
  saveHouse,
} = houseSlice.actions;
export const HouseSelector = (state) => state.house || [];
export default houseSlice.reducer;

export const fetchHouses = () => (dispatch) => {
 debugger;
  dispatch(setLoading());
  AsyncGet(API.house)
    .then((response) => {
      console.log("response,", response);
      dispatch(getHouse(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addHouseDetails = (data) => (dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncPost(API.house, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveHouse(response));
      dispatch(fetchHouses());
    })
    .catch((er) => {
      console.log("failure of add house activity");
      dispatch(saveHouse(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateHouseDetails = (data) => (dispatch) => {
    debugger;
  dispatch(setLoading());
  AsyncPut(API.house, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update house");
      dispatch(fetchHouses());
    })
    .catch((er) => {
      console.log("failure of add house");
      dispatch(saveHouse(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteHouseDetails = (data) => (dispatch) => {
 // dispatch(setLoading());
  debugger;
  AsyncDelete(`${API.house}/${data}`)
  
    .then((response) => {
   
     //if (response.data?.message!='Success')
      if (response.data?.message !== 'Success') {
        alert('Sorry! Unable to delete house Details. House Details is mapped with house activity specifications.');
      }
      console.log(response, "success of delete house");
      dispatch(fetchHouses());
    })
    .catch((er) => {
      console.log("failure of add house");
      dispatch(saveHouse(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
