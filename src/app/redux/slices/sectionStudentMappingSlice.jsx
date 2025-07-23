import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const sectionStudSlice = createSlice({
  name: "sectionStudList",
  initialState: {
    loading: false,
    error: false,
    sectionStudList: [],
    value: 0,
    curIndex: 0,
    sectionStudDetails: [],
    submitSectionStudSuccess: "",
    saveSectionStudDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getSectionStud: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.sectionStudList = payload;
    },
    saveSectionStud: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveSectionStudDataSuccess = payload;
    },
    submitSectionStud: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getSectionStud,
  submitSectionStud,
  setError,
  saveSectionStud,
} = sectionStudSlice.actions;
export const sectionStudSelector = (state) => state.sectionStuds || [];
export default sectionStudSlice.reducer;

export const fetchSectionStuds = () => (dispatch) => {
  dispatch(setLoading());
  AsyncGet(API.SectionStudentMapping)
    .then((response) => {
      console.log("response,", response);
      dispatch(getSectionStud(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addSectionStudDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.SectionStudentMapping, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveSectionStud(response.data));
      dispatch(fetchSectionStuds());
    })
    .catch((er) => {
      console.log("failure of add sectionStud");
      dispatch(saveSectionStud(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateSectionStudDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPut(API.SectionStudentMapping, data)
    .then((response) => {
      //dispatch(setLoading());
      console.log(response, "success of update sectionStud");
      dispatch(fetchSectionStuds());
    })
    .catch((er) => {
      console.log("failure of add sectionStud");
      dispatch(saveSectionStud(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteSectionStud = (ids, SectionId) => (dispatch) => {
  debugger
  console.log(SectionId);
  dispatch(setLoading());
  const queryString = ids.map(id => `ids=${id}`).join('&') + `&batchId=${SectionId}`;
  AsyncDelete(`${API.SectionStudentMapping}?${queryString}`)
    .then((response) => {
      dispatch(setLoading());
      console.log(response, "success of delete sectionStud");
      dispatch(fetchSectionStuds());
    })
    .catch((er) => {
      console.log("failure of add sectionStud");
      dispatch(saveSectionStud(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
