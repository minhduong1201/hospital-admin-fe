import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    hospital: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    postHospitalSuccess: (state, action) => {
      state = {
        ...state,
        hospital: action.payload,
      };
      return state;
    },
  },
});

export const { postHospitalSuccess } = hospitalSlice.actions;
export default hospitalSlice.reducer;
