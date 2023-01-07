import { createSlice } from "@reduxjs/toolkit";

const binSlice = createSlice({
  name: "bin",
  initialState: {
      bin:{
        address: "165 đường Giáp Bát, Hoàng Mai",
        status:true
      } as any,
    isFetching: false,
    error: false,
  },
  reducers: {
    getBinStart: (state) => {
      state.isFetching = true;
    },
    getBinSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
    },
    getBinFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteBinSuccess:(state)=>{
        state.bin={
            address: "",
            status:false
          };
        state.isFetching=false;
        state.error=false;
    }
  },
});

export const { getBinStart, getBinSuccess, getBinFailure, deleteBinSuccess } =
  binSlice.actions;
export default binSlice.reducer;
