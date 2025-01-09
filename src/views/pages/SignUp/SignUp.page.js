import {useNavigate} from "react-router-dom";
import styles from './SignUp.module.css'
import {ROUTES} from "../../../configs/Routes";
import {useState} from "react";
import {REGEX} from "../../../utils/Constants";
import {sendSingUpRequest} from "../../../controllers/Player.controller";
import LogInPage from "../LogIn/LogIn.page";
import CryptoJS from 'crypto-js';
import Assets from "../../../configs/AssetHandler";

function doesPlayerExist() {
    return false
}

function checkUsername (input) {
    let username = {value: input, valid: false, message: undefined};

    if (input !== undefined) {
        username.valid = false
        if (input === "")
            username.message = "Username must not be empty.";
        else if (REGEX.ALLOWDCHARACTERS.test(input))
            username.message = "Username is invalid."
        else if (doesPlayerExist({username: input}))
            username.message = "Username already taken."
        else
            username.valid = true
    } else {
        username = {message: "Invalid username."}
    }

    return username
}

function checkEmail(input) {
    let email = {value: input, valid: false, message: undefined};

    if (input !== undefined) {
        if (input === "")
            email.message = "Email must not be empty.";
        else if (REGEX.ALLOWDCHARACTERS.test(input))
            email.message = "Email is invalid."
        else if (doesPlayerExist({email: input}))
            email.message = "Email already taken."
        else
            email.valid = true
    } else {
        email = {message: "Invalid email."}
    }

    return email;
}

function checkPassword(input) {
    let password = {value: input, valid: false, message: undefined};

    if (input !== undefined) {
        if (input === "")
            password.message = "Password must not be empty.";
        else if (REGEX.ALLOWDCHARACTERS.test(input))
            password.message = "Password is invalid.";
        else if (input.length < 8)
            password.message = "Password must be at least 8 characters long.";
        else
            password.valid = true
    } else {
        password = {message: "Invalid password."}
    }
    return password;
}

function checkVerifPassword(verifPass, Pass) {
    let verifPassword = {value: verifPass, valid: false, message: undefined};
    console.log(verifPass, Pass)

    if (verifPass !== undefined) {
        if (verifPass !== Pass)
            verifPassword.message = "Passwords do not match.";
        else
            verifPassword.valid = true
    } else {
        verifPassword = {message: "Invalid password."}
    }
    return verifPassword;
}

function checkSignUpInfo(input) {
    let info = {
        username: checkUsername(input.username),
        email: checkEmail(input.email),
        password: checkPassword(input.password),
        verifPassword: checkVerifPassword(input.confirmPassword, input.password),
    };

    info.valid = info.username.valid && info.email.valid && info.password.valid && info.verifPassword.valid

    return info
}

function SignUpPage() {
    let navigate = useNavigate()

    const [inputInfo, setInputInfo] = useState({
        valid: false,
        username: undefined,
        email: undefined,
        password: undefined,
        verifPassword: undefined,
    });

    function goToLogIn(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const newUser = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        };

        let info = checkSignUpInfo(newUser)


        if (info.valid) {

            let ciphertext = CryptoJS.AES.encrypt(newUser.password,'93f5e5439e2d4a9c70e51c1a4b78c8a3d2e6a3f4b791c8f12b3e74d9a3f9e2b1');

            newUser.password = ciphertext.toString();

            sendSingUpRequest(newUser, (data, status) => {
                if (status !== 200)
                    alert(data.message)
                else
                    navigate(ROUTES.LOGIN)
            });
        }
        else
            setInputInfo(info)
    }

    return (
        <>
            <img src={Assets.backgrounds.SignUp} className={styles.backgroundImg}/>
            <div className={styles.LogInPage}>
                <div className={styles.login}>
                    <h4>Sign Up</h4>
                    <form onSubmit={goToLogIn}>
                        <div className={styles.text_area}>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className={styles.text_input}
                            />
                        </div>
                        {inputInfo.username !== undefined ? <p className={styles.ErrorMessage}>{inputInfo.username.message}</p> : null}
                        <div className={styles.text_area}>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="email"
                                className={styles.text_input}
                            />
                        </div>
                        {inputInfo.email !== undefined ? <p className={styles.ErrorMessage}>{inputInfo.email.message}</p> : null}
                        <div className={styles.text_area}>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className={styles.text_input}
                            />
                        </div>
                        {inputInfo.password !== undefined ? <p className={styles.ErrorMessage}>{inputInfo.password.message}</p> : null}
                        <div className={styles.text_area}>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="verify password"
                                className={styles.text_input}
                            />
                        </div>
                        {inputInfo.verifPassword !== undefined ? <p className={styles.ErrorMessage}>{inputInfo.verifPassword.message}</p> : null}
                        <input
                            type="submit"
                            value="SIGNUP"
                            className={styles.btn}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignUpPage