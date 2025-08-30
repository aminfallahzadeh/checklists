// IMPORTS
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "./store";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { type RefreshDataType } from "@/shared/types/auth";
import { AUTH_END } from "@/constants/domain/endpoints";
import { toastHelper } from "@/helpers/toastHelper";
import { setCredentials } from "@/features/auth/authSlice";
import { logout } from "@/features/auth/authSlice";
import {
    CONNECTION_ERROR_MESSAGE,
    EXPIRED_AUTH_MESSAGE,
} from "@/constants/messages";

const mutex = new Mutex();
let isRefreshingToken = false;

const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const { getState } = api;
    const state = getState() as RootState;
    const baseUrl = state.config.apiBaseUrl;

    const dynamicBaseQuery = fetchBaseQuery({
        baseUrl,
        credentials: "same-origin",
        prepareHeaders: (headers, { getState, endpoint }) => {
            const state = getState() as RootState;
            const token = state.auth.userInfo?.token;
            if (token && !isRefreshingToken && endpoint !== "login") {
                headers.set("Authorization", `Bearer ${token}`);
                headers.set("Content-Type", "application/json");
            }
            return headers;
        },
    });

    return dynamicBaseQuery(args, api, extraOptions);
};

// HANDLE AUTO REFRESH TOKEN
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                console.log("sending refresh token");
                const state = api.getState() as RootState;
                const refreshToken = state.auth.userInfo?.refreshToken;
                isRefreshingToken = true;

                const refreshResult = (await baseQuery(
                    {
                        url: `${AUTH_END}/refreshToken`,
                        method: "POST",
                        body: {
                            refreshToken,
                        },
                    },
                    api,
                    extraOptions,
                )) as { data: RefreshDataType };
                isRefreshingToken = false;
                if (refreshResult.data) {
                    const state = api.getState() as RootState;
                    api.dispatch(
                        setCredentials({
                            ...state.auth.userInfo,
                            token: refreshResult.data.token,
                            refreshToken: refreshResult.data.refreshToken,
                        }),
                    );
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    if (result.error) {
        console.log(result.error);

        let errorMessage: string;
        if (
            typeof result.error.data === "object" &&
            result.error.data !== null &&
            "message" in result.error.data &&
            typeof result.error.data.message === "string"
        ) {
            errorMessage = (result.error.data as { message: string }).message;
        } else if (result.error.status === 401) {
            errorMessage = EXPIRED_AUTH_MESSAGE;
        } else if (typeof result.error.data === "string") {
            errorMessage = result.error.data;
        } else {
            errorMessage = CONNECTION_ERROR_MESSAGE;
        }

        toastHelper.error(`${errorMessage}`);
    }

    return result;
};
