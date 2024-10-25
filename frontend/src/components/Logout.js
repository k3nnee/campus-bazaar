import { response } from "express";
import "../css/style.css"
import {useState} from "react";

const Logout = () => {
    const[message, setMessage] = useState("");

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            if (response.ok){
                setMessage(data.message);
            } else{
                setMessage("Logout failed.");
            }
        } catch (error){
            console.log("Error logging out");
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Logout;