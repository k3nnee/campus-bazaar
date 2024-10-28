import "../css/style.css"
import {useState} from "react";

const Signin = (prop) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            const res = await fetch("http://localhost:8080/login", {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: "include"
            });

            handleResponse(await res.json());
        }catch (error){
            console.log("Registration failed", error);
        }

        setEmail("");
        setPassword("");
    }

    const handleResponse = (data) => {
        if("message" in data){
            window.location.href = "http://localhost:8080/"
            alert("Logged in successfully")
        }else{
            return (
                alert(data.error)
            )
        }
    }

    return (
        <>
            <div className="log-in-form">
                <h1> {prop.message ? prop.message : "Sign in"} </h1>
                <form>
                    <input type="email" className="input-box" placeholder="Your Email" value = {email} onChange = {e => setEmail(e.target.value)}/>
                    <input type="password" className="input-box" placeholder="Your Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
                    <button type="button" className="signup-btn auth-button" onClick = {onSubmit}>Sign In</button>
                </form>
            </div>
        </>
    )
}

export default Signin;