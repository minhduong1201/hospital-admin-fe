import {createSlice} from "@reduxjs/toolkit"

const EmployeesSlice=createSlice({
    name:"employees",
    initialState: [],
    reducers:{
        getEmployeesSuccess:(state, action)=>{
            return action.payload;
        },
        addEmployee:(state, action) => {
            state.push(action.payload);
        }
    }
})

export const { getEmployeesSuccess, addEmployee} = EmployeesSlice.actions;
export default EmployeesSlice.reducer;