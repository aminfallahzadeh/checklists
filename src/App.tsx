// App.tsx
import { useMemo } from "react";
import { AppRouter } from "./routers/AppRouter";
import { toastHelper } from "./helpers/toastHelper";

const App = () => {
    const ToastProvider = useMemo(() => toastHelper.toastProvider, []);

    return (
        <>
            <ToastProvider />
            <AppRouter />
        </>
    );
};

export default App;
