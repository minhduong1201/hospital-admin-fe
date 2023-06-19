import { createSlice } from "@reduxjs/toolkit";

const CustomerSlice = createSlice({
  name: "customers",
  initialState: [],
  reducers: {
    getCustomersSuccess: (state, action) => {
      return action.payload;
    },
    updateCustomers: (state, action) => {
      return state.map((item) => {
        const match = action.payload.find(
          (customer) => customer._id == item._id
        );
        return match ? match : item;
      });
    },
    addCustomer: (state, action) => {
      state.push(action.payload);
    }
  },
});

export const { getCustomersSuccess, updateCustomers, addCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;
