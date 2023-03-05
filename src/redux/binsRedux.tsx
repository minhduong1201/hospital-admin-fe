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
      console.log(action.payload)
      state.isFetching = false;
      state.error = false;
      state.bins=action.payload;
    },
    getBinsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addBins:(state,action)=>{
       const newBin = {...action.payload, status: 0, organic: 0 ,inorganic: 0 , recyclable: 0}
        state.bins.push(newBin);
        state.isFetching=false;
    },
    addBinsFailure:(state)=>{
        state.isFetching=false;
        state.error=true;
    },
    deleteBinsSuccess:(state,action)=>{
      state.bins.splice(state.bins.findIndex((item:any)=>item._id===action.payload),1);
      state.isFetching=false;
      state.error=false;
    },
    updateBinsSuccess:(state,action)=>{
      state.bins[state.bins.findIndex((item:any)=>item._id===action.payload._id)]=action.payload;
      state.isFetching=false;
      state.error=false;
    },
  },
});

export const { getBinsStart, getBinsSuccess, getBinsFailure,addBins,addBinsFailure, deleteBinsSuccess, updateBinsSuccess } =
  binsSlice.actions;
export default binsSlice.reducer;
