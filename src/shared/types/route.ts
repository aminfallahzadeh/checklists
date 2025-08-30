// IMPORTS
import { type JSX } from "react";

export type AppRoute = {
    id?: number;
    path?: string;
    element: JSX.Element;
    index?: boolean;
    children?: AppRoute[];
};
