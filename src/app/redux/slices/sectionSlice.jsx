import { createSlice } from "@reduxjs/toolkit";
import { AsyncGet, AsyncPost, AsyncPut,AsyncDelete } from "../../services/https";

import { API } from "../../services/endpoints";

export const sectionSlice = createSlice({
  name: "sectionList",
  initialState: {
    loading: false,
    error: false,
    sectionList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    sectionDetails: [],
    submitSubmitSuccess: "",
    saveSubmitDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getSection: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.sectionList = payload;
    },
    saveSection: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveSubmitDataSuccess = payload;
    },
    submitSection: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getSection,
  submitSection,
  setError,
  saveSection,
} = sectionSlice.actions;
export const sectionSelector = (state) => state.section || [];
export default sectionSlice.reducer;

export const fectchSections = () => (dispatch) => {
 
  dispatch(setLoading());
  AsyncGet(API.Section)
    .then((response) => {
      console.log("response,", response);
      dispatch(getSection(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addSectionDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.Section, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveSection(response));
      dispatch(fectchSections());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveSection(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateSectionDetails = (data) => (dispatch) => {
    debugger;
  dispatch(setLoading());
  AsyncPut(API.Section, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update faculty");
      dispatch(fectchSections());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveSection(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteSectionDetails = (data) => (dispatch) => {
  // dispatch(setLoading());
  debugger;
  AsyncDelete(`${API.Section }/${data}`, "")
  
    .then((response) => {
      /*if (response.data!='Success')
      {      
        alert('Sorry! Unable to delete Role. Role is mapped with Activities');
      }*/
      // dispatch(setLoading());
      console.log(response, "success of delete faculty");
      dispatch(fectchSections());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveSection(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
