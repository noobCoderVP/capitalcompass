"use client";
import React from "react";
import "../../styles/login.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Page() {
    const router = useRouter();
    const { login } = useAuth();

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            email: formData.get("email").toLowerCase(),
            password: formData.get("password"),
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASEPATH}/api/users/authorize`,
                data
            );
            toast.success("Logged in! Redirecting to home page", {
                position: "top-center",
                type: "success",
            });
            login(formData.get('email'));
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } catch (error) {
            toast.error("Invalid credentials!", {
                position: "top-center",
                type: "error",
            });
        }
    }

    return (
        <div className="loginContainer">
            <ToastContainer style={{ width: "400px" }} />
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <h1>Login</h1>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            minLength={8}
                        />
                        <a href="#">Forgot your password?</a>
                        <button>Login</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start journey
                                with us
                            </p>
                            <Link href={"/register"}>
                                <button className="ghost" id="signUp">
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
