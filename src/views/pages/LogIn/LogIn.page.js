import styles from './LogIn.module.css'
import {ROUTES} from "../../../configs/Routes";
import {useNavigate} from "react-router-dom";
import CryptoJS from "crypto-js";
import {sendLogInRequest, sendSingUpRequest} from "../../../controllers/Player.controller";
import Assets from "../../../configs/AssetHandler";

function Button({value}) {
    return (
        <button
            onClick={(e) => e.preventDefault()}
            className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
            {value}
        </button>
    )
}

function Input({type, id, name, label, placeholder, autofocus}) {
    return (
        <label className="text-gray-500 block mt-3">{label}
            <input
                autoFocus={autofocus}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
        </label>
    )
}

function LoginForm() {
    return (
        <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
            <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl">Log In</h1>
                <form>
                    <Input type="email" id="email" name="email" label="Email Address" placeholder="me@example.com" autofocus={true}/>
                    <Input type="password" id="password" name="password" label="Password" placeholder="••••••••••" />
                    <Button value="Submit" />

                </form>
            </div>
        </div>
    )
}

function Signin () {

    let navigate = useNavigate()

    function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const logInInfo = {
            username: formData.get("username"),
            password: formData.get("password")
        };

        let ciphertext = CryptoJS.AES.encrypt(logInInfo.password,'93f5e5439e2d4a9c70e51c1a4b78c8a3d2e6a3f4b791c8f12b3e74d9a3f9e2b1');

        logInInfo.password = ciphertext.toString();

        sendLogInRequest(logInInfo, (data, status) => {
            if (status !== 200)
                alert(data.Mensagem)
            else
                navigate(ROUTES.MAINPAGE)
        });
    }

    return (
        <div className={styles.login}>
           <h4>Login</h4>
           <form onSubmit={onSubmit}>
               <div className={styles.text_area}>
                   <input
                       type="text"
                       id="username"
                       name="username"
                       placeholder="Username"
                       className={styles.text_input}

                   />
               </div>
               <div className={styles.text_area}>
                   <input
                       type="password"
                       id="password"
                       name="password"
                       placeholder="Password"
                       className={styles.text_input}

                   />
               </div>
               <input
                   type="submit"
                   value="LOGIN"
                   className={styles.btn}

               />
           </form>
           <a className={styles.link} href="/signup">Sign Up</a>
        </div>
    )
}

function LogInPage() {
    return (
        <>
            <img src={Assets.backgrounds.LoIng} className={styles.backgroundImg}/>
            <div className={styles.LogInPage}>
                <Signin/>
            </div>
        </>
    )
/*
    return (
        <div className={styles.logInPage}>
            <h1>
                LogIn
            </h1>
            <form className={styles.logInForm} onSubmit={onSubmit}>
                <label className={styles.logInForm} id={styles["usernameInputBox"]}>
                    <input type="text" placeholder={"Email"} name="email" />
                </label>
                <label className={styles.logInForm} id={styles["passwordInputBox"]}>
                    <input type="password" placeholder={"Password"} name="password" />
                </label>
                <label className={styles.logInForm} id={styles["rememberMeCheckBox"]}>
                    Remember Me
                    <input type="checkbox" name="rememberMe" />
                </label>
                <button type="submit" >
                    LogIn
                </button>
                <label className={styles.logInForm} id={styles["signUpButton"]}>
                    <a href={ROUTES.SIGNUP} >Sign Up</a>
                </label>
                <label className={styles.logInForm} id={styles["passRecButton"]}>
                    <a href={ROUTES.PASSWORDRECOVERY} >Password Recovery</a>
                </label>
            </form>
        </div>
    )
 */
}

export default LogInPage