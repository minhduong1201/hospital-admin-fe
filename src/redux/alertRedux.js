import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: null,
  reducers: {
    updateAlert: (state, action) => {
        return action.payload;
    }
  },
});

export const { updateAlert } =
  alertSlice.actions;
export default alertSlice.reducer;
