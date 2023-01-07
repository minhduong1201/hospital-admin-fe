import { createSlice } from "@reduxjs/toolkit";

const binsSlice = createSlice({
  name: "bins",
  initialState: {
    bins: [
    ] as any,
    isFetching: false,
    error: false,
  },
  reducers: {
    getBinsStart: (state) => {
      state.isFetching = true;
    },
    getBinsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.bins=action.payload;
    },
    getBinsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addBins:(state,action)=>{
        state.bins.push(action.payload);
        state.isFetching=false;
    },
    addBinsFailure:(state)=>{
        state.isFetching=false;
        state.error=true;
    },
    deleteBinsSuccess:(state,action)=>{
      state.bins.splice(state.bins.findIndex((item:any)=>item.id===action.payload),1);
      state.isFetching=false;
      state.error=false;
    },
    updateBinsSuccess:(state,action)=>{
      state.bins[state.bins.findIndex((item:any)=>item.id===action.payload.id)]=action.payload;
      state.isFetching=false;
      state.error=false;
    },
  },
});

export const { getBinsStart, getBinsSuccess, getBinsFailure,addBins,addBinsFailure, deleteBinsSuccess, updateBinsSuccess } =
  binsSlice.actions;
export default binsSlice.reducer;
