// IMPORTS
import { lazy, createElement } from "react";
import { createSuspense } from "@/utils/suspenseCreator";
import { type AppRoute } from "@/shared/types/route";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { BASE_URL, HOME } from "./urls";

const Auth = lazy(() => import("@/pages/Auth/Auth"));
const Home = lazy(() => import("@/pages/Home/Home"));

export const ROUTES: AppRoute[] = [
    {
        id: 1,
        element: createElement(AuthLayout),
        children: [
            {
                id: 10,
                path: BASE_URL,
                element: createSuspense(Auth, [], false),
                index: false,
            },
        ],
    },

    {
        id: 2,
        element: createElement(AppLayout),
        children: [
            {
                id: 20,
                path: HOME,
                element: createSuspense(Home, [], false),
                index: false,
            },
        ],
    },
];
