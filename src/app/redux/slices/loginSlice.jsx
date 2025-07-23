import { createSlice } from "@reduxjs/toolkit";
import { AsyncGet, AsyncPost } from "../../services/https";
import { API } from "../../services/endpoints";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    successMsg: [],
    errorMSG: "",
  },
  reducers: {
    validateLoginSuccess: (state, { payload }) => {
      console.log("prasat", payload);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.successMsg = payload;
      state.errorMSG = "";
    },
    validateLoginFailure: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.errorMSG = payload;
      state.successMsg = [];
    },
    forgotPassword: (state) => {
      state.value -= 1;
    },
    logoutSucess: (state) => {
      state.errorMSG = "";
      state.username = "";
      state.password = "";
      state.successMsg = [];
    },
    logoutFailure: (state, { payload }) => {
      state.errorMSG = payload;
      state.username = "";
      state.password = "";
      state.successMsg = [];
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  validateLoginSuccess,
  forgotPassword,
  setLoading,
  validateLoginFailure,
  logoutSucess,
  logoutFailure,
} = loginSlice.actions;
export const loginsSelector = (state) => state.login || [];
export default loginSlice.reducer;

export function validateLogin(username, password) {
  return async (dispatch) => {
    AsyncGet(
      API.validateUser + "?username=" + username + "&password=" + password
    )
      .then((response) => {
        
        if (response.data.length > 0) {
          console.log("response,", response);
          dispatch(validateLoginSuccess(response.data));
          localStorage.setItem("user", JSON.stringify(response.data[0]));
        } else {
          dispatch(validateLoginFailure(`${username} login failed`));
          localStorage.removeItem("user");
        }
      })
      .catch((er) => {
      
        console.log("am in error,", er);
        dispatch(validateLoginFailure("Login failed"));
        //dispatch(setError());
        //dispatch(setLoading());
      });
  };
}

export function logoutReducer(username, navigate) {
  return async (dispatch) => {
    dispatch(logoutSucess());
    localStorage.removeItem("user");
    navigate("/login");

    // AsyncGet(
    //   API.validateUser + "?username=" + username + "&password=" + password
    // )
    //   .then((response) => {
    //     if (response.data.length > 0) {
    //       console.log("response,", response);
    //       dispatch(logoutSucess(response.data));
    //       localStorage.removeItem("user");
    //     } else {
    //       dispatch(logoutFailure(`${username} login failed`));
    //       localStorage.removeItem("user");
    //     }
    //   })
    //   .catch((er) => {
    //     console.log("am in error,", er);
    //     dispatch(logoutFailure("Login failed"));
    //   });
  };
}
