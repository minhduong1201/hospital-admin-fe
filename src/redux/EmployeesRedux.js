import {createSlice} from "@reduxjs/toolkit"

const EmployeesSlice=createSlice({
    name:"employees",
    initialState: [],
    reducers:{
        getEmployeesSuccess:(state, action)=>{
            return action.payload;
        },
    }
})

export const { getEmployeesSuccess} = EmployeesSlice.actions;
export default EmployeesSlice.reducer;