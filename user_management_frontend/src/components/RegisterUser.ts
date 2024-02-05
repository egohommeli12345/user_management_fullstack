import { User, RegisterUser } from "../interfaces.ts";

// Check if the form is filled out correctly
export const checkForm = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    let formOk: boolean =
        username !== "" &&
        email !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword;

    return formOk;
};

// Register a new user
export const registerUserRequest = async (
    user: RegisterUser,
    formOk: boolean
) => {
    // If the form is filled out correctly, send a POST request to the server
    if (formOk) {
        try {
            const response = await fetch("http://localhost:8080/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error("${response.status}");
            }
            const message = await response.text();
            alert(message);
            return true;
        } catch (error) {
            alert("Error: " + error);
        }
    } else {
        return alert("Check the fields and try again");
    }
};
