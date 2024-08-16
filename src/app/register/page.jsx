"use client";
import React from "react";
import "../../styles/login.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Page() {
    const router = useRouter();
    const { login } = useAuth();

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (formData.get("password") != formData.get("confirmpassword")) {
            toast.error("Passwords didn't match!", {
                type: "error",
                position: "top-center",
            });
            return;
        }

        formData.delete("confirmpassword");

        const data = {
            name: formData.get("name"),
            email: formData.get("email").toLowerCase(),
            password: formData.get("password"),
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASEPATH}/api/users`,
                data
            );
            toast.success("User registered! Redirecting to home page", {
                position: "top-center",
                type: "success",
            });
            login(formData.get('email'));
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } catch (error) {
            if (error.response.status == 409) {
                toast.error("Email already registered! Please login", {
                    position: "top-center",
                    type: "error",
                });
            } else {
                toast.error("Internal Server Error");
            }
            console.log(error.response.status);
        }
    }

    return (
        <div className="loginContainer">
            <ToastContainer style={{ width: "400px" }} />
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <h1>Register</h1>
                        <input
                            type="text"
                            placeholder="Full name"
                            required
                            minLength={5}
                            maxLength={100}
                            name="name"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            minLength={8}
                            name="password"
                        />
                        <input
                            type="password"
                            required
                            minLength={8}
                            placeholder="Confirm Password"
                            name="confirmpassword"
                        />
                        <a href="#">Forgot your password?</a>
                        <button type="submit">Register</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>Already have an account? Please login</p>
                            <Link href={"/login"}>
                                <button className="ghost" id="signUp">
                                    Login
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
