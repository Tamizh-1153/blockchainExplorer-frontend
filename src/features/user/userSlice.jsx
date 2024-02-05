import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUser:(state,{payload}) => {
            state.user=payload
        },
        removeUser:(state)=> {
            state.user=null
        },
        addUserAddress:(state,{payload}) => {
            state.user.address=payload
        }
    }
})

export const {updateUser,removeUser,addUserAddress} = userSlice.actions

export default userSlice.reducer