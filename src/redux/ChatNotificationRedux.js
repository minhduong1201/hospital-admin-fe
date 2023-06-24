import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    updateNotifications: (state, action) => {
      return action.payload;
    },
    addNotification: (state, action) => {
      const { payload } = action;
      const filteredNotifications = state.filter(
        (noti) => noti._id !== payload._id
      );
      return [payload, ...filteredNotifications];
    },
    viewNotification: (state, action) => {
      const index = state.findIndex((item) => item._id == action.payload._id);
      state.splice(index, 1);
    },
  },
});

export const { updateNotifications, addNotification, viewNotification } =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
