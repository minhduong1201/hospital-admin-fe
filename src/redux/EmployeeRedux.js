import { createSlice } from "@reduxjs/toolkit";

const EmployeeSlice = createSlice({
  name: "employee",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = {
        accessToken: state.currentUser?.accessToken,
        ...action.payload,
      };
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
  EmployeeSlice.actions;
export default EmployeeSlice.reducer;
