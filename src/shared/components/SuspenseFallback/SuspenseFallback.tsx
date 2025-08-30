// IMPORTS
import { Logo } from "../SVG/Logo";

export const SuspenseFallback = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen absolute w-full top-0 left-0 bottom-0">
            <div className="logo-loader">
                <Logo color={"var(--color-suspense-logo)"} />
            </div>
        </div>
    );
};
