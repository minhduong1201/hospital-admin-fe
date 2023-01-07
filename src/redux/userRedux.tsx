import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState: {
        currentUser:{
            name:"Nguyen Minh Duong",
            avatar:"https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/300365135_1826288337763476_5846204144204143790_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Fhlzji5f0NUAX_Yvy2Q&tn=YjNYucQoFnsS38IL&_nc_ht=scontent.fhan2-5.fna&oh=00_AfAa7NuMGTumEYf2w5fdo5e4efLEZbYLl4hZeHqdhapT4w&oe=638F048C",
            accessToken:'1'
        },
        isFetching: false,
        error:false,
    },
    reducers:{
        loginStart: (state)=>{
            state.isFetching=true
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.error=false;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        logoutSuccess:(state)=>{
            state.currentUser={name:'',avatar:'',accessToken:''};
        }
    }
})

export const { loginStart,loginSuccess,loginFailure,logoutSuccess} = userSlice.actions;
export default userSlice.reducer;