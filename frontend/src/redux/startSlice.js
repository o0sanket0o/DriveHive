import { createSlice } from "@reduxjs/toolkit";

const startSlice = createSlice({
    name: 'start',
    initialState:{
        startValue: "",
    },
    reducers:{
        setStartSlice: (state, action) => {
            state.startValue = action.payload;
        }
    }
})

export const {setStartSlice} = startSlice.actions;
export default startSlice.reducer;