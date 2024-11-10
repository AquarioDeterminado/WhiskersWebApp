import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../views/pages/MainPage.page";

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
                {
                //<Route path={ROUTES.LANDING} element={<LandingPage />} />
                //<Route path={ROUTES.LOGIN} element={<LogIn />}/>
                //<Route path={ROUTES.SIGNUP} element={<SignUp/>} />
                }
                <Route path={ROUTES.MAINPAGE} element={<MainPage />} />
                {
                //<Route path={ROUTES.PASSWORDRECOVERY} element={<PasswordRecovery />} />
                }
            </Routes>
        </BrowserRouter>
    );
}

export {makeRoutes, ROUTES};