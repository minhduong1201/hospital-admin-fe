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
      state.hospital = action.payload;
    },
  },
});

export const { postHospitalSuccess } =
  hospitalSlice.actions;
export default hospitalSlice.reducer;
