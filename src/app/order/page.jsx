'use client';
import React from "react";
import "../../styles/login.css";
import Link from "next/link";
import "../../styles/order.css"
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
    const router = useRouter();

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            symbol: formData.get("symbol"),
            quantity: formData.get("quantity"),
            email: localStorage.getItem('email'),
            price: formData.get("price"),
            type: formData.get("type"),
            t_date: formData.get("date")
        };
        console.log(data);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASEPATH}/api/transactions`,
                data
            );
            toast.success("Order added! Redirecting to the trade book Page", {
                position: "top-center",
                type: "success",
            });
            setTimeout(() => {
                router.push("/tradebook");
            }, 3000);
        } catch (error) {
            console.log(error);
            toast.error("Cannot execute transaction!", {
                position: "top-center",
                type: "error",
            });
        }
    }

    return (
        <div className="loginContainer">
            <ToastContainer />
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={onSubmit} style={{color: 'black'}}>
                        <h1>Execute Transaction</h1>
                        <input
                            type="search"
                            placeholder="Symbol"
                            name="symbol"
                            required
                        />      
                        <input
                            type="number"
                            placeholder="Quantity"
                            name="quantity"
                            required
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            name="price"
                            required
                        />
                        <label htmlFor="type">Transaction Type:
                        <select id="transactionType" name="type" className="w-32" defaultValue={"buy"}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                        </label>
                        
                        <label htmlFor="date" id="datelabel">Transaction Date:</label>
                        <input
                            type="date"
                            placeholder="Date of Transaction"
                            defaultValue={Date.now()}
                            name="date"
                        />
                        <button className="mt-4">Submit</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="imageContainer">
                        <Image src={"/transaction.png"} alt="Transaction image" height={200} width={200}></Image>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
