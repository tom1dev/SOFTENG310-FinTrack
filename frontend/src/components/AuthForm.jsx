import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// This component is a reusable form that can be used for both the login and signup pages. This was done to reduce code duplication.
export default function AuthForm({endpoint, title, buttonText, redirectTitleText, redirectLink, redirectText}) {
    const labelStyle = "text-2xl";
    const inputStyle = "border-2 w-64 h-8 p-2 rounded-lg mb-4 mt-2 border-black focus:border-blue-800 focus:outline-none";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(endpoint, {
            email: email,
            password: password
        }).then(response => {
            if (response.data.success) {
                // Store the returned auth token in local storage so that it can be easily accessed throughout the frontend
                localStorage.setItem("token", response.data.token);
                window.location.href = "/dashboard";
            } else {
                alert("Invalid email or password!");
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <form className="flex flex-col border-2 items-center border-blue-800 w-80 p-4 rounded-xl bg-blue-100">
            <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
            <div className="flex flex-col">
                <label className={labelStyle} htmlFor="email">Email</label>
                <input className={inputStyle} required type="email" onChange={(e) => {setEmail(e.target.value)}} value={email} />
            </div>
            <div className="flex flex-col">
                <label className={labelStyle} htmlFor="password">Password</label>
                <input className={inputStyle} required type="password" onChange={(e) => {setPassword(e.target.value)}} value={password} />
            </div>
            <button className="w-60 bg-blue-600 text-white text-2xl p-2 rounded-lg mt-4" onClick={(e) => handleSubmit(e)}>{buttonText}</button>
            <p className="text-xl mt-4">{redirectTitleText}</p>
            <Link to={redirectLink} className="text-blue-800 text-xl">{redirectText}</Link>
        </form>
    );
}