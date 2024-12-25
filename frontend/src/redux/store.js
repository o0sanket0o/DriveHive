import {configureStore} from '@reduxjs/toolkit';
import locationSlice from './locationSlice';
import authSlice from './authSlice';
import loadingSlice from './loadingSlice';
import startReducer from './startSlice';
import endReducer from './endSlice';

const store = configureStore({
    reducer: {
        location: locationSlice,
        auth: authSlice,
        loading: loadingSlice,
        start: startReducer,
        end: endReducer,
    }
});

export default store;