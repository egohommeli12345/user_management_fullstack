import { ChangeEvent, useState, useEffect } from "react";
import "./Login.css";
import hr_sauli_logo from "/hr_sauli_logoC.png";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { checkForm, registerUserRequest } from "../components/RegisterUser";
import { RegisterUser } from "../interfaces";

interface ResetPwProps {
    onResetPassword: () => void;
}

interface RegisterProps {
    onRegister: () => void;
}

function Login() {
    const [showResetPassword, setShowResetPassword] = useState(false);

    const handleResetPasswordClick = () => {
        if (showResetPassword) {
            setShowResetPassword(false);
            console.log("Reset password to false");
        } else {
            setShowResetPassword(true);
            console.log("Reset password to true");
        }
    };

    const [showRegisterUser, setShowRegisterUser] = useState(false);

    const handleRegisterUserClick = () => {
        if (showRegisterUser) {
            setShowRegisterUser(false);
            console.log("Register user to false");
        } else {
            setShowRegisterUser(true);
            console.log("Register user to true");
        }
    };

    return (
        <div>
            {showResetPassword && (
                <ResetPassword onResetPassword={handleResetPasswordClick} />
            )}
            {showRegisterUser && (
                <RegisterUserView onRegister={handleRegisterUserClick} />
            )}
            {!showResetPassword && !showRegisterUser && (
                <MainScreen
                    onResetPassword={handleResetPasswordClick}
                    onRegister={handleRegisterUserClick}
                />
            )}
        </div>
    );
}

function MainScreen({
    onResetPassword,
    onRegister,
}: ResetPwProps & RegisterProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authState, login } = useAuth();
    const navigate = useNavigate();

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleCheckLogin = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        await login(username, password);
        setUsername("");
        setPassword("");
    };

    useEffect(() => {
        if (authState.isAuthenticated) {
            navigate("/user-management");
        }
    }, [authState.isAuthenticated, navigate]);

    return (
        <div className="loginbg">
            <img className="logo" src={hr_sauli_logo}></img>
            <form onSubmit={handleCheckLogin}>
                <div className="inputs">
                    <input
                        className="input"
                        value={username}
                        onChange={handleUsernameChange}
                        type="text"
                        placeholder="Username"
                    ></input>
                    <input
                        className="input"
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                        placeholder="Password"
                    ></input>
                    <button className="loginbtn" type="submit">
                        Login
                    </button>
                    <div className="registerreset">
                        <button
                            className="resetpwLogin"
                            onClick={onResetPassword}
                        >
                            Reset password
                        </button>
                        <button
                            className="registerLogin"
                            type="button"
                            onClick={onRegister}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function ResetPassword({ onResetPassword }: ResetPwProps) {
    return (
        <div className="loginbg">
            <img className="logo" src={hr_sauli_logo}></img>
            <div className="inputs">
                <input
                    className="input"
                    type="text"
                    placeholder="Username"
                ></input>
                <input
                    className="input"
                    type="password"
                    placeholder="New Password"
                ></input>
                <button className="resetpwAction" onClick={onResetPassword}>
                    Reset password
                </button>
            </div>
        </div>
    );
}

function RegisterUserView({ onRegister }: RegisterProps) {
    // UseState for the input fields, default value is an empty string
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // These functions handle the input changes
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(event.target.value);
    };

    // When the form is submitted, the registerUser function is called
    const registerUser = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(checkForm(username, email, password, confirmPassword));

        const user: RegisterUser = {
            username: username,
            email: email,
            password: password,
        };
        if (
            await registerUserRequest(
                user,
                checkForm(username, email, password, confirmPassword)
            )
        ) {
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            onRegister();
        }
    };

    return (
        <div className="loginbg">
            <img className="logo" src={hr_sauli_logo}></img>
            <form onSubmit={registerUser}>
                <div className="inputs">
                    <input
                        className="input"
                        type="text"
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        value={username}
                    ></input>
                    <input
                        className="input"
                        type="text"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        value={email}
                    ></input>
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        value={password}
                    ></input>
                    <input
                        className="input"
                        type="password"
                        placeholder="Confirm password"
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                    ></input>
                    <button
                        className="registerAction"
                        type="submit"
                        //onClick={onRegister}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
