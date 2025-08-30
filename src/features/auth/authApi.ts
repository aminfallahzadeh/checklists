// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { AUTH_END } from "@/constants/domain/endpoints";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (data) => ({
                url: `${AUTH_END}/signin`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useSigninMutation } = authApi;
