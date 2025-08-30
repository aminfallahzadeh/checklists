// IMPORTS
import { Outlet } from "react-router-dom";
import Header from "@/shared/components/Header/Header";

const AppLayout = () => {
    return (
        <main className="flex min-h-screen flex-col">
            <Header />
            <Outlet />
        </main>
    );
};

export default AppLayout;
