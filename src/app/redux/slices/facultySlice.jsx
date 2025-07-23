import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const facultySlice = createSlice({
  name: "facultyList",
  initialState: {
    loading: false,
    error: false,
    facultyList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    facultyDetails: [],
    submitFacultySuccess: "",
    saveFacultyDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getFaculty: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.facultyList = payload;
    },
    saveFaculty: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveFacultyDataSuccess = payload;
    },
    submitFaculty: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getFaculty,
  submitFaculty,
  setError,
  saveFaculty,
} = facultySlice.actions;
export const facultySelector = (state) => state.faculties || [];
export default facultySlice.reducer;

export const fetchFaculties = () => (dispatch) => {
  dispatch(setLoading());
  AsyncGet(API.getFaculties)
    .then((response) => {
      console.log("response,", response);
      dispatch(getFaculty(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addFacultyDetails =  async (data, dispatch)=> {
  try {
  //dispatch(setLoading());
  debugger;
  const response = await AsyncPost(API.getFaculties, data);
      //dispatch(setLoading());
      dispatch(saveFaculty(response.data));
      if(response.data=="2627"){
        alert("Failure of add faculty. Someone already has that username, Kindly try another.");
      }
      dispatch(fetchFaculties());
      return response.data;
     // dispatch(fetchFaculties());
    }
    catch(error)  {
      console.log("failure of add faculty");
      alert("Failure of add faculty.");
      dispatch(saveFaculty(""));
      dispatch(setError(true));
      dispatch(setLoading());
}  
};
//export const UpdateFacultyDetails = (data) => (dispatch) =>{ 
export const UpdateFacultyDetails =  async (data, dispatch)=> {
  dispatch(setLoading());
  AsyncPut(API.getFaculties, data)
    .then((response) =>{ 
      debugger;
      dispatch(setLoading());
      console.log(response, "success of update faculty");
      if(response.data=="2627"){
        alert("Unable to update. Someone already has that username, Kindly try another.");
      }
     
      dispatch(fetchFaculties());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      alert("Failure of update faculty.");

      dispatch(saveFaculty(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteFaculty = (data) => (dispatch) => {
  // dispatch(setLoading());
  AsyncDelete(`${API.getFaculties}/${data}`, "")
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of delete faculty");
      dispatch(fetchFaculties());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveFaculty(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
