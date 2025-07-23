import { createSlice } from "@reduxjs/toolkit";
import { AsyncGet, AsyncPost, AsyncPut,AsyncDelete } from "../../services/https";

import { API } from "../../services/endpoints";

export const roleSlice = createSlice({
  name: "roleList",
  initialState: {
    loading: false,
    error: false,
    roleList: [],
    value: 0,
    curIndex: 0,
    Orders: [],
    roleDetails: [],
    submitRoleSuccess: "",
    saveRoleDataSuccess: "",
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getRole: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = false;
      state.roleList = payload;
    },
    saveRole: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.saveRoleDataSuccess = payload;
    },
    submitRole: (state, action) => {
      state.value += action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const {
  setLoading,
  getRole,
  submitRole,
  setError,
  saveRole,
} = roleSlice.actions;
export const roleSelector = (state) => state.role || [];
export default roleSlice.reducer;

export const fetchRoles = () => (dispatch) => {
 
  dispatch(setLoading());
  AsyncGet(API.getRoles)
    .then((response) => {
      console.log("response,", response);
      dispatch(getRole(response.data));
    })
    .catch((er) => {
      console.log("am in error,", er);
      dispatch(setError());
      dispatch(setLoading());
    });
};

export const addRoleDetails = (data) => (dispatch) => {
  dispatch(setLoading());
  AsyncPost(API.getRoles, data)
    .then((response) => {
      dispatch(setLoading());
      dispatch(saveRole(response));
      dispatch(fetchRoles());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveRole(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};

export const UpdateRoleDetails = (data) => (dispatch) => {
    debugger;
  dispatch(setLoading());
  AsyncPut(API.getRoles, data)
    .then((response) => {
      // dispatch(setLoading());
      console.log(response, "success of update faculty");
      dispatch(fetchRoles());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveRole(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
export const deleteRole = (data) => (dispatch) => {
  // dispatch(setLoading());
  debugger;
  AsyncDelete(`${API.getRoles}/${data}`, "")
    .then((response) => {
      if (response.data?.message!='Success')
      {      
        alert('Sorry! Unable to delete Role. Role is mapped with Activities');
      }
      // dispatch(setLoading());
      console.log(response, "success of delete faculty");
      dispatch(fetchRoles());
    })
    .catch((er) => {
      console.log("failure of add faculty");
      dispatch(saveRole(""));
      dispatch(setError(true));
      dispatch(setLoading());
    });
};
