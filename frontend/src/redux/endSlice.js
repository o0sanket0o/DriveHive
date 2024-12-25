import { createSlice } from "@reduxjs/toolkit";

const endSlice = createSlice({
    name: 'end',
    initialState:{
        endValue: "",
    },
    reducers:{
        setEndSlice: (state, action) => {
            state.endValue = action.payload;
        }
    }
})

export const {setEndSlice} = endSlice.actions;
export default endSlice.reducer;