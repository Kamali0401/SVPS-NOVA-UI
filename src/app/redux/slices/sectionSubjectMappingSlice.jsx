import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const sectionSubjectMappingSlice = createSlice({
  name: "sectionSubjectMappingList",
  initialState: {
    loading: false,
    error: false,
    sectionSubjectMappingList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    sectionSubjectMappingDetails: [],
    submitsectionSubjectMappingSuccess: "",
    savesectionSubjectMappingDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getSectionSubjectMapping: (state, { payload }) => {

      console.log(payload);
      state.loading = false;
      state.error = false;
      state.sectionSubjectMappingList = payload;
    },
    saveSectionSubjectMapping: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveDepartmentDataSuccess = payload;
    },
    submitSectionSubjectMapping: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getSectionSubjectMapping,
  submitSectionSubjectMapping,
  setError,
  saveSectionSubjectMapping,
} = sectionSubjectMappingSlice.actions;
export const sectionSubjectMappingSelector = (state) => state.sectionSubjectmappings || [];
export default sectionSubjectMappingSlice.reducer;

export const fetchSectionSubjectMappings = () => (dispatch) => {
  debugger;
  dispatch(setLoading());
  AsyncGet(API.SectionSubjectMapping)
    .then((response) => {
      console.log("response,", response);
      dispatch(getSectionSubjectMapping(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addSectionSubjectDetails = (data) => (dispatch) => {
debugger;
  dispatch(setLoading());
  AsyncPost(API.SectionSubjectMapping, data)
    .then((response) => {
      dispatch(setLoading());
     
      dispatch(saveSectionSubjectMapping(response));
      if(response.data=="2627"){
        alert("Unable to insert! This mapping is already present.");
      }
      dispatch(fetchSectionSubjectMappings());
    })
    .catch((er) => {
      console.log("failure of add department");
      dispatch(saveSectionSubjectMapping(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const updateSectionSubjectDetails = (data) => (dispatch) => {
  dispatch(setLoading());

  AsyncPut(API.SectionSubjectMapping, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update department");
      if(response.data=="2627"){
        alert("Unable to update! This mapping is already present.");
      }
      dispatch(fetchSectionSubjectMappings());
    })
    .catch((er) => {
      console.log("failure of add department");
      dispatch(saveSectionSubjectMapping(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteSectionSubjectMapping = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncDelete(`${API.SectionSubjectMapping}/${data}`, "")
    .then((response) => {
      debugger;
      
       dispatch(setLoading());
      console.log(response, "success of delete department");
      dispatch(fetchSectionSubjectMappings());
    })
    .catch((er) => {
      console.log("failure of delete department");
      //alert('Cannot delete Department. Department is mapped with Activities!')
      dispatch(saveSectionSubjectMapping(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
