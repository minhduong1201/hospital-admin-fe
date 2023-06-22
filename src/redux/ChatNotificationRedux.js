import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    updateNotifications: (state, action) => {
      return action.payload;
    },
    addNotification: (state, action) => {
      state.push(action.payload);
    }
  },
});

export const { updateNotifications, addNotification } =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
