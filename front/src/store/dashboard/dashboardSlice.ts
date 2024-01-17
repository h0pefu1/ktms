import { createSlice } from "@reduxjs/toolkit";
import { Dashboard, IPerson, IUser } from "types/types";
import type { PayloadAction } from '@reduxjs/toolkit'

const InitialState:Dashboard = {
    persons: []
}
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState:InitialState,
    reducers: {
        addOnlineUser:(state,action:PayloadAction<IPerson[]>)=>{
            state.persons = [...action.payload];
        },
        removeOnlineUser:(state,action:PayloadAction<IPerson>)=>{
            let per = state.persons.filter(i=>i.id == action.payload.id);
        state.persons = [...per] 
        }
        
    }
})
export const { addOnlineUser,removeOnlineUser} = dashboardSlice.actions
export default dashboardSlice.reducer
