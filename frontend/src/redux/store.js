import {configureStore} from '@reduxjs/toolkit';
import locationSlice from './locationSlice';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        location: locationSlice,
        auth: authSlice
    }
});

export default store;