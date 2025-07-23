import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const announcementSlice = createSlice({
  name: "announcementList",
  initialState: {
    loading: false,
    error: false,
    announcementList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    announcementDetails: [],
    submitAnnouncementSuccess: "",
    saveAnnouncementDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getAnnouncement: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.announcementList = payload;
    },
    saveAnnouncement: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveAnnouncementDataSuccess = payload;
    },
    submitAnnouncement: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getAnnouncement,
  submitAnnouncement,
  setError,
  saveAnnouncement,
} = announcementSlice.actions;
export const odSelector = (state) => state.announcements || [];
export default announcementSlice.reducer;

export const fetchannouncements = () => (dispatch) => {
  dispatch(setLoading());
  AsyncGet(API.Announcement)
    .then((response) => {
      console.log("response,", response);
      dispatch(getAnnouncement(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addAnnouncementDetails =  async (data, dispatch)=> {
  debugger;
  try {
  //dispatch(setLoading());
  const response = await AsyncPost(API.Announcement, data);
      //dispatch(setLoading())
      dispatch(saveAnnouncement(response.data));
     
      dispatch(fetchannouncements());
      return response.data;
    
     // dispatch(fetchannouncements());
    }
    catch(error)  {
      console.log("failure of add faculty");
      dispatch(fetchannouncements());

      // dispatch(saveAnnouncement(""));
      // dispatch(setError(true));
     // dispatch(setLoading());
}  
};
export const UpdateAnnouncementDetails = (data) => (dispatch) =>{ 
  debugger;
//export const UpdateIndentDetails =  async (data, dispatch)=> {
  dispatch(setLoading());
  AsyncPut(API.updateFdsFormData, data)
    .then((response) => {
      dispatch(setLoading());
      console.log(response, "success of update Indent");
      dispatch(fetchannouncements());
    })
    .catch((er) => {
      console.log("failure of add faculty");

     // dispatch(saveAnnouncement(""));
      //dispatch(setError(true));
      //dispatch(setLoading());
    });
};
export const deleteAnnouncement = (data) => (dispatch) => {
  // dispatch(setLoading());
  AsyncDelete(API.Announcement + "?id=" + data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of delete indent");
      dispatch(fetchannouncements());
    })
    .catch((er) => {
      console.log("failure of add indent");
      dispatch(saveAnnouncement(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
