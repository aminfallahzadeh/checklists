// IMPORTS
import { storageHelper } from "@/helpers/storageHelper";
import { createSlice } from "@reduxjs/toolkit";
import { type UserInfo } from "@/shared/types/auth";

// CONSTS
const storage = storageHelper("session");

const initialState: {
    userInfo: UserInfo;
} = {
    userInfo: (() => {
        const userInfo = storage.get("userInfo");
        return userInfo ? JSON.parse(userInfo) : null;
    })(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            storage.set("userInfo", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            storage.remove("userInfo");
            storage.remove("attachments");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
