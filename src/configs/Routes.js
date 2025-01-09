import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../views/pages/MainPage/MainPage.page";
import LandingPage from "../views/pages/Landing/Landing.page";
import LogInPage from "../views/pages/LogIn/LogIn.page";
import SignUpPage from "../views/pages/SignUp/SignUp.page";
import PassWordRecoveryPage from "../views/pages/PassWordRecovery/PassWordRecovery.page";

const ROUTES =  {
    LANDING: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    MAINPAGE: "/homepage",
    PASSWORDRECOVERY: "/forgotpass",
}

function makeRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LANDING} element={<LandingPage />} />
                <Route path={ROUTES.LOGIN} element={<LogInPage />} />
                <Route path={ROUTES.SIGNUP} element={<SignUpPage/>} />
                <Route path={ROUTES.MAINPAGE} element={<MainPage />} />
                <Route path={ROUTES.PASSWORDRECOVERY} element={<PassWordRecoveryPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export {makeRoutes, ROUTES};