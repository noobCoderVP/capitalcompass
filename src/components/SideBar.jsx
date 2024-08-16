"use client";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReorderIcon from "@mui/icons-material/Reorder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideBar() {
    const { isAuthenticated, logout, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("email")) {
            login(localStorage.getItem("email"));
        }
    }, []);

    const onLogOut = () => {
        logout();
        toast.info("Logged out!", {position: 'top-center'})
        router.push("/");
    };

    return (
        <nav className="sidebar">
            <h2 className="logo">CapitalCompass</h2>
            <ul className="navBar">
                <Link href={"/"} className="navLink">
                    <HomeIcon /> Home
                </Link>
                <Link href={"/market"} className="navLink">
                    <AccountBalanceIcon />
                    Market
                </Link>
                <Link href={"/portfolio"} className="navLink">
                    <FormatListBulletedIcon />
                    Portfolio
                </Link>
                <Link href={"/order"} className="navLink">
                    <ReorderIcon /> Order
                </Link>
                <Link href={"/tradebook"} className="navLink">
                    <MenuBookIcon />
                    TradeBook
                </Link>
                <Link href={"/dashboard"} className="navLink">
                    <DashboardIcon />
                    Dashboard
                </Link>
                <Link href={"/query"} className="navLink">
                    <QuestionMarkIcon />
                    Query
                </Link>
                <Link href={"/news"} className="navLink">
                    <NewspaperIcon />
                    News
                </Link>

                {isAuthenticated ? (
                    <Link
                        href={"#"}
                        onClick={onLogOut}
                        className="navLink loginLink"
                    >
                        <LogoutIcon />
                        Logout
                    </Link>
                ) : (
                    <Link href={"/login"} className="navLink loginLink">
                        <LoginIcon />
                        Login
                    </Link>
                )}
            </ul>
        </nav>
    );
}

export default SideBar;
