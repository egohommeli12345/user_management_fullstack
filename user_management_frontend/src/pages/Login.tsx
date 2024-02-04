import { ChangeEvent, useState, useEffect } from "react";
import "./Login.css";
import hr_sauli_logo from "/hr_sauli_logoC.png";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

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
                <RegisterUser onRegister={handleRegisterUserClick} />
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

    /*   const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (isLoginSuccessful) {
        setLoading(true);
  
        fetch("http://localhost:8080/users")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            return response.json();
          })
          .then((data) => {
            setData(data);
            setLoading(false);
            console.log(data);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [isLoginSuccessful]); */

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

function RegisterUser({ onRegister }: RegisterProps) {
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
                    type="text"
                    placeholder="Email"
                ></input>
                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                ></input>
                <input
                    className="input"
                    type="password"
                    placeholder="Confirm password"
                ></input>
                <button
                    className="registerAction"
                    type="button"
                    onClick={onRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Login;
