// IMPORTS
import { type FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { BASE_URL } from "@/constants/urls";

export const withRouteGuard = (
    Component: FC,
    requiredParams: string[] = [],
) => {
    return () => {
        const { userInfo } = useAppSelector((state) => state.auth);
        const navigate = useNavigate();
        const [searchParams] = useSearchParams();

        // State to prevent rendering until checks are complete
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            if (!userInfo) {
                navigate(BASE_URL, { replace: true });
                return;
            }

            if (requiredParams.length > 0) {
                const missingParams = requiredParams.filter(
                    (param) => !searchParams.get(param),
                );

                if (missingParams.length > 0) {
                    navigate(`${BASE_URL}home`, { replace: true });
                    return;
                }
            }

            // Pass the guard checks
            setIsAuthorized(true);
        }, [userInfo, searchParams, navigate]);

        // Render only if authorized
        return isAuthorized ? <Component /> : null;
    };
};
