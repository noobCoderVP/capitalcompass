'use client'
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/query.css";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function QueryPage() {
    const router = useRouter();
    const submitQuery = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            email: localStorage.getItem('email').toLowerCase().trim(),
            title: formData.get("title"),
            description: formData.get("description")
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASEPATH}/api/queries`,
                data
            );
            toast.success("Query added successfully! Redirecting to home page", {
                position: "top-center",
                type: "success",
            });
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } catch (error) {
            console.log(error);
            toast.error("User not found!", {
                position: "top-center",
                type: "error",
            });
        }
    }

    return (
        <div className="query_page">
            <ToastContainer style={{width: '400px'}}/>
            <section>
                {/* Query Form */}
                <div className="portfolio_header">
                    <h1 style={{ fontWeight: 'bold' }}>Submit a Query</h1>
                </div>
                <form onSubmit={submitQuery} method="POST" className="query_form">
                    <div className="form_group">
                        <label htmlFor="queryTitle">Title</label>
                        <input
                            type="text"
                            id="queryTitle"
                            name="title"
                            placeholder="Enter the title of your query"
                            required
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="queryDescription">Description</label>
                        <textarea
                            id="queryDescription"
                            name="description"
                            placeholder="Describe your query in detail"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit_button">
                        <SearchIcon />
                        Submit Query
                    </button>
                </form>

                {/* Overlay Section */}
                <div className="overlay_section">
                    <h2>Need Help?</h2>
                    <p>If you have any questions, feel free to reach out to our support team.</p>
                    <a href="/faq">
                        <button className="faq_button">View FAQ</button>
                    </a>
                </div>
            </section>
        </div>
    );
}

export default QueryPage;