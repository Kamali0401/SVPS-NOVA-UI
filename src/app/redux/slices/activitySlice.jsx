import { createSlice } from "@reduxjs/toolkit";
import { AsyncDelete, AsyncGet, AsyncPost, AsyncPut } from "../../services/https";

import { API } from "../../services/endpoints";

export const activitySlice = createSlice({
  name: "activityList",
  initialState: {
    loading: false,
    error: false,
    activityList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    activityDetails: [],
    submitActivitySuccess: "",
    savePaperPresentationSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getActivity: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.activityList = payload;
    },
    saveActivity: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.savePaperPresentationSuccess = payload;
    },
    submitActivity: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getActivity,
  submitActivity,
  setError,
  saveActivity,
} = activitySlice.actions;
export const activitySelector = (state) => state.activities || [];
export default activitySlice.reducer;

export const fetchActivities = (data1, data2) => (dispatch) => {
  dispatch(setLoading());
  if (data2 == null) {
    AsyncGet(API.getActivities + "?type=" + data1)
      .then((response) => {
        console.log("response,", response);
        dispatch(getActivity(response.data));
      })
      .catch((er) => {
        console.log("am in error,", er);
        dispatch(setError());
        dispatch(setLoading());
      });
  } else {
    AsyncGet(API.getActivities + "?type=" + data1 + "&DepartmentId=" + data2)
      .then((response) => {
        console.log("response,", response);
        dispatch(getActivity(response.data));
      })
      .catch((er) => {
        console.log("am in error,", er);
        dispatch(setError());
        dispatch(setLoading());
      });
  }
};

export const addActivity = async (data, dispatch) => {
  try {
    debugger;
    // dispatch(setLoading());
    const response = await AsyncPost(API.getActivities, data);
    dispatch(saveActivity(response.data));
    // if (data.activityID == 26 || data.activityID == 29) {
    //   dispatch(fetchActivities(data.activityID, null));
    // } else {
    //   dispatch(
    //     fetchActivities(
    //       data.activityID,
    //       JSON.parse(localStorage.getItem("user")).departmentId
    //     )
    //   );
    // }
    return response.data;
    // dispatch(fetchActivities(data.activityID));
  } catch (error) {
    console.log("failure of add activity");
    dispatch(saveActivity(""));
    dispatch(setError(true));
    dispatch(setLoading());
  }
};

export const UpdateActivity = (data) => (dispatch) => {
  //dispatch(setLoading());
  AsyncPut(API.getActivities, data)
    .then((response) => {
      //dispatch(setLoading());
      console.log(response, "success of update activity");      
      if (data.activityID == 26 || data.activityID == 29 || data.activityID==14 || data.activityID==13 || data.activityID==25 || data.activityID==15
        || data.activityID==37|| data.activityID==39 || data.activityID==41 || data.activityID == 45 || data.activityID ==46 ||data.activityID==33||data.activityID==2|| data.activityID==23
        || data.activityID==27  || data.activityID==16 || data.activityID == 18 || data.activityID ==48) {
        dispatch(fetchActivities(data.activityID, null));
      } else {
        dispatch(
          fetchActivities(
            data.activityID,
            JSON.parse(localStorage.getItem("user")).departmentId
          )
        );
      }
    })
    .catch((er) => {
      console.log("failure of add activity");
      dispatch(saveActivity(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteActivity = (data, type, DepartmentId) => (dispatch) => {
  // dispatch(setLoading());
  AsyncDelete(`${API.getActivities}/${data}`)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of delete activity");
      dispatch(fetchActivities(type, DepartmentId));
    })
    .catch((er) => {
      console.log("failure of add activity");
      dispatch(saveActivity(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
