import { createSlice } from "@reduxjs/toolkit";

const EmployeesSlice = createSlice({
  name: "employees",
  initialState: [],
  reducers: {
    getEmployeesSuccess: (state, action) => {
      return action.payload;
    },
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    deleteEmployee: (state, action) => {
      const index = state.findIndex(
        (customer) => customer._id == action.payload._id
      );
      state.splice(index, 1);
    },
  },
});

export const { getEmployeesSuccess, addEmployee, deleteEmployee } = EmployeesSlice.actions;
export default EmployeesSlice.reducer;
