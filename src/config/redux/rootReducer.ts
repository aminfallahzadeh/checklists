// IMPORTS
import { combineReducers, type PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/api/apiSlice";
import configReducer from "@/features/app/configSlice";
import authSliceReducer from "@/features/auth/authSlice";

export const appReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    config: configReducer,
    auth: authSliceReducer,
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export const rootReducer = (state: any, action: PayloadAction) => {
    if (action.type === "RESET") {
        state = undefined;
    }
    return appReducer(state, action);
};
